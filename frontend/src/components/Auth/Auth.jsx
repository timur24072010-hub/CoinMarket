import { useState } from "react";

const Auth = ({
                       onClose,
                       onLogin,
                       onRegister,
                   }) => {
    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegister) {
                await onRegister({
                    username,
                    email,
                    password,
                });
            } else {
                await onLogin({
                    email,
                    password,
                });
            }
        } catch (error) {
            console.error("Ошибка авторизации:", error);
        }
    };

    const switchMode = () => {
        setIsRegister((prev) => !prev);

        // Очищаем поля
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/60
                backdrop-blur-sm
            "
        >
            <div
                className="
                    relative
                    w-[400px]
                    rounded-2xl
                    border
                    border-gray-700
                    bg-gray-900
                    p-6
                    shadow-2xl
                "
            >
                {/* Закрытие */}
                <button
                    type="button"
                    onClick={onClose}
                    className="
                        absolute
                        right-5
                        top-5
                        text-xl
                        text-gray-400
                        hover:text-white
                    "
                >
                    ×
                </button>

                {/* Заголовок */}
                <h2
                    className="
                        mb-7
                        text-xl
                        font-semibold
                        text-white
                    "
                >
                    {isRegister
                        ? "Создание аккаунта"
                        : "Вход в аккаунт"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Имя пользователя */}
                    {isRegister && (
                        <div className="mb-4">
                            <label
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    text-gray-300
                                "
                            >
                                Имя пользователя
                            </label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-700
                                    bg-gray-800
                                    px-3
                                    text-white
                                    outline-none
                                    focus:border-gray-500
                                "
                                required
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                text-gray-300
                            "
                        >
                            Электронная почта
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                h-11
                                w-full
                                rounded-lg
                                border
                                border-gray-700
                                bg-gray-800
                                px-3
                                text-white
                                outline-none
                                focus:border-gray-500
                            "
                            required
                        />
                    </div>

                    {/* Пароль */}
                    <div className="mb-4">
                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                text-gray-300
                            "
                        >
                            Пароль
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="
                                h-11
                                w-full
                                rounded-lg
                                border
                                border-gray-700
                                bg-gray-800
                                px-3
                                text-white
                                outline-none
                                focus:border-gray-500
                            "
                            required
                        />
                    </div>

                    {/* Основная кнопка */}
                    <button
                        type="submit"
                        className="
                            mt-2
                            h-11
                            w-full
                            rounded-lg
                            bg-white
                            font-medium
                            text-gray-900
                            transition
                            hover:bg-gray-200
                        "
                    >
                        {isRegister
                            ? "Зарегистрироваться"
                            : "Вход"}
                    </button>
                </form>

                {/* Нижний переключатель */}
                <div
                    className="
                        mt-5
                        text-center
                        text-sm
                        text-gray-400
                    "
                >
                    {isRegister
                        ? "Уже есть аккаунт?"
                        : "Нет аккаунта?"}

                    <button
                        type="button"
                        onClick={switchMode}
                        className="
                            ml-1
                            font-semibold
                            text-white
                            hover:underline
                        "
                    >
                        {isRegister
                            ? "Войти"
                            : "Зарегистрироваться"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;