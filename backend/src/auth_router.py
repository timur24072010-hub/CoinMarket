from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from src.database import get_connection
from src.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    security
)


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
async def register(data: RegisterRequest):

    if len(data.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Пароль должен содержать минимум 6 символов"
        )

    connection = get_connection()

    existing_user = connection.execute(
        """
        SELECT id
        FROM users
        WHERE username = ? OR email = ?
        """,
        (data.username, data.email)
    ).fetchone()

    if existing_user:
        connection.close()

        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким username или email уже существует"
        )

    password = hash_password(data.password)

    cursor = connection.execute(
        """
        INSERT INTO users
        (username, email, password_hash)
        VALUES (?, ?, ?)
        """,
        (
            data.username,
            data.email,
            password
        )
    )

    connection.commit()

    user_id = cursor.lastrowid

    connection.close()

    token = create_access_token(user_id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/login")
async def login(data: LoginRequest):

    connection = get_connection()

    user = connection.execute(
        """
        SELECT *
        FROM users
        WHERE email = ?
        """,
        (data.email,)
    ).fetchone()

    connection.close()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль"
        )

    if not verify_password(
        data.password,
        user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль"
        )

    token = create_access_token(
        user["id"]
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
async def get_me(
    user=Depends(
        lambda credentials=Depends(security):
        get_current_user(credentials)
    )
):
    return user