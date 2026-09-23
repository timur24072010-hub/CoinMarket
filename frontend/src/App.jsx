import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import axios from "axios";

import CryptocurrencyCard from "./components/CryptocurrencyCard/CryptocurrencyCard.jsx";
import Header from "./components/Header/Header.jsx";
import Auth from "./components/Auth/Auth.jsx";



import { getMe, logout, login, register} from "./api";


function getItem(
    label,
    key,
    icon,
    children,
    type
) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}


const App = () => {

    // =========================
    // CRYPTOCURRENCIES
    // =========================

    const [currencies, setCurrencies] =
        useState([]);

    const [currenciesData, setCurrenciesData] =
        useState([]);


    // =========================
    // SELECTED CURRENCY
    // =========================

    const [currenciId, setCurrenciId] =
        useState(1);

    const [currenciData, setCurrenciData] =
        useState(null);


    // =========================
    // SEARCH
    // =========================

    const [search, setSearch] =
        useState("");


    // =========================
    // FAVORITES
    // =========================

    const [showFavorites, setShowFavorites] =
        useState(false);

    const [favorites, setFavorites] =
        useState(() => {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "favorites"
                    )
                ) || [];

            } catch {

                return [];

            }

        });


    // =========================
    // AUTH
    // =========================

    const [user, setUser] =
        useState(null);

    const [showAuth, setShowAuth] =
        useState(false);


    // =========================
    // GET CRYPTOCURRENCIES
    // =========================

    const fetchCurrencies = () => {

        axios
            .get(
                "http://127.0.0.1:8000/cryptocurrencies"
            )
            .then((response) => {

                const data = response.data;

                setCurrenciesData(data);

                const menuItems = [
                    getItem(
                        "Список криптовалют",
                        "g1",
                        null,

                        data.map((currency) => ({
                            label: currency.name,
                            key: String(
                                currency.id
                            )
                        })),

                        "group"
                    )
                ];

                setCurrencies(
                    menuItems
                );

            })
            .catch((error) => {

                console.error(
                    "Ошибка загрузки криптовалют:",
                    error
                );

            });
    };


    // =========================
    // GET SELECTED CURRENCY
    // =========================

    const fetchCurrenci = () => {

        axios
            .get(
                `http://127.0.0.1:8000/cryptocurrencies/${currenciId}`
            )
            .then((response) => {

                setCurrenciData(
                    response.data
                );

            })
            .catch((error) => {

                console.error(
                    "Ошибка загрузки криптовалюты:",
                    error
                );

                setCurrenciData(null);

            });
    };


    // =========================
    // INITIAL CRYPTO LOAD
    // =========================

    useEffect(() => {

        fetchCurrencies();

    }, []);


    // =========================
    // SELECTED CRYPTO LOAD
    // =========================

    useEffect(() => {

        setCurrenciData(null);

        fetchCurrenci();

    }, [currenciId]);


    // =========================
    // CHECK JWT
    // =========================

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            return;
        }

        getMe()
            .then((userData) => {

                setUser(userData);

            })
            .catch(() => {

                setUser(null);

            });

    }, []);


    // =========================
    // FAVORITES UPDATE
    // =========================

    useEffect(() => {

        const updateFavorites = () => {

            try {

                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "favorites"
                        )
                    ) || [];

                setFavorites(saved);

            } catch {

                setFavorites([]);

            }

        };


        window.addEventListener(
            "favoritesUpdated",
            updateFavorites
        );


        return () => {

            window.removeEventListener(
                "favoritesUpdated",
                updateFavorites
            );

        };

    }, []);


    // =========================
    // SIDEBAR CLICK
    // =========================

    const onClick = (e) => {

        setCurrenciId(
            Number(e.key)
        );

        setShowFavorites(false);

    };


    // =========================
    // FAVORITES
    // =========================

    const toggleFavorites = () => {

        setShowFavorites(
            (prev) => !prev
        );

    };


    const favoriteCurrencies =
        currenciesData.filter(
            (currency) =>
                favorites.includes(
                    Number(currency.id)
                )
        );


    // =========================
    // SEARCH SELECT
    // =========================

    const handleSelectCurrency = (id) => {

        setCurrenciId(
            Number(id)
        );

        setShowFavorites(false);

    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        logout();

        setUser(null);

    };


    // =========================
    // LOGIN SUCCESS
    // =========================

    const handleLogin = async ({ email, password }) => {
        try {
            const data = await login(email, password);

            localStorage.setItem("access_token", data.access_token);

            const userData = await getMe();

            setUser(userData);

            setShowAuth(false);

        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        try {
            await register(username, email, password);

            // После регистрации сразу авторизуем пользователя
            await handleLogin({
                email,
                password,
            });

        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };


    return (
        <div className="
            flex
            h-screen
            bg-gray-50
            dark:bg-gray-950
            transition-colors
        ">

            {/* HEADER */}

            <Header
                search={search}
                setSearch={setSearch}

                currencies={currenciesData}

                onSelect={
                    handleSelectCurrency
                }

                showFavorites={
                    showFavorites
                }

                onFavoritesClick={
                    toggleFavorites
                }

                user={user}

                onAuthClick={() =>
                    setShowAuth(true)
                }

                onLogout={
                    handleLogout
                }
            />


            {/* SIDEBAR */}

            <Menu
                className="
                    h-screen
                    overflow-y-auto
                    border-r
                    border-gray-200
                    dark:border-gray-800
                "

                onClick={onClick}

                style={{
                    width: 260
                }}

                selectedKeys={[
                    String(currenciId)
                ]}

                mode="inline"

                items={currencies}
            />


            {/* MAIN */}

            <main className="
                flex-1
                p-8
                pt-24
                overflow-y-auto
                bg-gray-50
                dark:bg-gray-950
                transition-colors
            ">

                {showFavorites ? (

                    <div>

                        <h2 className="
                            text-2xl
                            font-semibold
                            mb-6
                            text-gray-900
                            dark:text-white
                        ">
                            Избранное
                        </h2>


                        {favoriteCurrencies.length === 0 ? (

                            <div className="
                                flex
                                items-center
                                justify-center
                                h-[70vh]
                            ">

                                <div className="
                                    text-center
                                ">

                                    <div className="
                                        text-5xl
                                        mb-4
                                        text-gray-300
                                        dark:text-gray-600
                                    ">
                                        ☆
                                    </div>

                                    <div className="
                                        text-lg
                                        font-medium
                                        text-gray-700
                                        dark:text-gray-300
                                    ">
                                        Избранных криптовалют пока нет
                                    </div>

                                    <div className="
                                        text-sm
                                        text-gray-400
                                        dark:text-gray-500
                                        mt-2
                                    ">
                                        Добавьте криптовалюту
                                        в избранное
                                    </div>

                                </div>

                            </div>

                        ) : (

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-3
                                gap-6
                            ">

                                {favoriteCurrencies.map(
                                    (currency) => (

                                        <CryptocurrencyCard
                                            key={
                                                currency.id
                                            }
                                            currency={
                                                currency
                                            }
                                        />

                                    )
                                )}

                            </div>

                        )}

                    </div>

                ) : (

                    <div className="
                        flex
                        items-center
                        justify-center
                        min-h-full
                    ">

                        {currenciData ? (

                            <CryptocurrencyCard
                                currency={
                                    currenciData
                                }
                            />

                        ) : (

                            <div className="
                                text-gray-400
                                dark:text-gray-500
                            ">
                                Загрузка...
                            </div>

                        )}

                    </div>

                )}

            </main>


            {/* AUTH MODAL */}

            {showAuth && (

                <Auth
                    onClose={() => setShowAuth(false)}

                    onLogin={handleLogin}
                    onRegister={handleRegister}
                />

            )}

        </div>
    );
};


export default App;