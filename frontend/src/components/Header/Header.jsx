import { useEffect, useState } from "react";

const Header = ({
                    search,
                    setSearch,
                    currencies,
                    onSelect,
                    showFavorites,
                    onFavoritesClick,
                    user,
                    onAuthClick,
                    onLogout
                }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Тема
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Применяем тему
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    }, [isDark]);

    // Переключение темы
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // Результаты поиска
    const filteredCurrencies = currencies.filter((currency) =>
        currency.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Сбрасываем выбранный результат
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    // Клавиатура
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setSearch("");
            return;
        }

        if (!search || filteredCurrencies.length === 0) {
            return;
        }

        // Вниз
        if (e.key === "ArrowDown") {
            e.preventDefault();

            setSelectedIndex((prev) =>
                prev < filteredCurrencies.length - 1
                    ? prev + 1
                    : 0
            );
        }

        // Вверх
        if (e.key === "ArrowUp") {
            e.preventDefault();

            setSelectedIndex((prev) =>
                prev > 0
                    ? prev - 1
                    : filteredCurrencies.length - 1
            );
        }

        // Enter
        if (e.key === "Enter") {
            e.preventDefault();

            const currency = filteredCurrencies[selectedIndex];

            if (currency) {
                onSelect(currency.id);
                setSearch("");
            }
        }
    };

    return (
        <header
            className="
                fixed
                top-0
                left-[260px]
                right-0
                z-50
                h-16
                bg-white
                dark:bg-gray-900
                border-b
                border-gray-200
                dark:border-gray-800
                transition-colors
            "
        >
            <div
                className="
                    h-full
                    flex
                    items-center
                    px-6
                "
            >

                {/* LOGO */}
                <div className="w-60 shrink-0">
                    <h1
                        className="
                            text-xl
                            font-semibold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        CoinMarket
                    </h1>
                </div>


                {/* SEARCH */}
                <div
                    className="
                        flex-1
                        flex
                        justify-center
                    "
                >
                    <div className="relative w-[420px]">

                        {/* Иконка поиска */}
                        <svg
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-4
                                h-4
                                text-gray-400
                            "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                            />
                        </svg>


                        {/* Поле поиска */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Поиск криптовалюты..."
                            className="
                                w-full
                                h-10
                                pl-10
                                pr-4
                                rounded-lg
                                border
                                border-gray-200
                                dark:border-gray-700
                                bg-gray-50
                                dark:bg-gray-800
                                text-gray-900
                                dark:text-white
                                text-sm
                                outline-none
                                transition
                                placeholder:text-gray-400
                                focus:bg-white
                                dark:focus:bg-gray-700
                                focus:border-gray-300
                                dark:focus:border-gray-600
                            "
                        />


                        {/* РЕЗУЛЬТАТЫ ПОИСКА */}
                        {search && (
                            <div
                                className="
                                    absolute
                                    top-12
                                    left-0
                                    w-full
                                    bg-white
                                    dark:bg-gray-900
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                    rounded-lg
                                    shadow-lg
                                    overflow-hidden
                                    py-1
                                "
                            >

                                {filteredCurrencies.length > 0 ? (

                                    filteredCurrencies.map(
                                        (currency, index) => (

                                            <button
                                                key={currency.id}
                                                onClick={() => {
                                                    onSelect(currency.id);
                                                    setSearch("");
                                                }}
                                                className={`
                                                    w-full
                                                    flex
                                                    items-center
                                                    gap-3
                                                    text-left
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    transition
                                                    ${
                                                    selectedIndex === index
                                                        ? "bg-gray-100 dark:bg-gray-800"
                                                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                                }
                                                `}
                                            >

                                                {/* Иконка монеты */}
                                                <img
                                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                                                    alt={currency.name}
                                                    className="
                                                        w-7
                                                        h-7
                                                        rounded-full
                                                    "
                                                />

                                                {/* Название */}
                                                <div className="flex-1">

                                                    <div
                                                        className="
                                                            font-medium
                                                            text-gray-900
                                                            dark:text-white
                                                        "
                                                    >
                                                        {currency.name}
                                                    </div>

                                                    <div
                                                        className="
                                                            text-xs
                                                            text-gray-400
                                                        "
                                                    >
                                                        {currency.symbol}
                                                    </div>

                                                </div>


                                                {/* Enter */}
                                                {selectedIndex === index && (
                                                    <span
                                                        className="
                                                            text-xs
                                                            text-gray-400
                                                        "
                                                    >
                                                        Enter
                                                    </span>
                                                )}

                                            </button>

                                        )
                                    )

                                ) : (

                                    <div
                                        className="
                                            px-4
                                            py-4
                                            text-sm
                                            text-gray-500
                                            dark:text-gray-400
                                            text-center
                                        "
                                    >
                                        Ничего не найдено
                                    </div>

                                )}

                            </div>
                        )}

                    </div>
                </div>


                {/* ACTIONS */}



                <div className="
    w-60
    shrink-0
    flex
    items-center
    justify-end
    gap-2
">

                    {/* AUTH */}

                    {user ? (

                        <div className="relative group">

                            <button className="
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-lg
                text-sm
                text-gray-700
                dark:text-gray-300
                hover:bg-gray-100
                dark:hover:bg-gray-800
            ">

                                <div className="
                    w-7
                    h-7
                    rounded-full
                    bg-gray-900
                    dark:bg-white
                    text-white
                    dark:text-gray-900
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-semibold
                ">
                                    {user.username
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                {user.username}

                            </button>


                            <div className="
                                    absolute
                                    right-0
                                    top-11
                                    hidden
                                    group-hover:block
                                    w-40
                                    bg-white
                                    dark:bg-gray-900
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                    rounded-lg
                                    shadow-lg
                                    p-1
                                "
                            >

                                <button
                                    onClick={onLogout}
                                    className="
                        w-full
                        text-left
                        px-3
                        py-2
                        rounded-md
                        text-sm
                        text-red-500
                        hover:bg-gray-100
                        dark:hover:bg-gray-800
                    "
                                >
                                    Выйти
                                </button>

                            </div>

                        </div>

                    ) : (

                        <button
                            onClick={onAuthClick}
                            className="
                px-3
                py-2
                rounded-lg
                text-sm
                text-gray-700
                dark:text-gray-300
                hover:bg-gray-100
                dark:hover:bg-gray-800
            "
                        >
                            Войти
                        </button>

                    )}


                    {/* FAVORITES */}

                    <button
                        onClick={onFavoritesClick}
                        className="
                            px-3
                            py-2
                            rounded-lg
                            text-sm
                            text-gray-700
                            dark:text-gray-300
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                        "
                    >
                        Избранное
                    </button>


                    {/* THEME */}

                    <button
                        onClick={toggleTheme}
                        className="
                            w-10
                            h-10
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-gray-600
                            dark:text-gray-300
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                        "
                    >
                        {isDark ? "☀" : "☾"}
                    </button>

                </div>

            </div>
        </header>
    );
};

export default Header;