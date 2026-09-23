import { useEffect, useState } from 'react';
import { Card } from 'antd';
import PriceChart from "../PriceChart/PriceChart.jsx";

function CryptocurrencyCard({ currency }) {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!currency) return;

        const favorites =
            JSON.parse(localStorage.getItem('favorites')) || [];

        setIsFavorite(
            favorites.includes(Number(currency.id))
        );
    }, [currency?.id]);


    if (!currency) {
        return (
            <div className="text-gray-400 dark:text-gray-500">
                Выберите криптовалюту
            </div>
        );
    }


    const price = currency.quote.USD.price;
    const percentChange24 = currency.quote.USD.percent_change_24h;
    const marketCap = currency.quote.USD.market_cap;
    const volume24 = currency.quote.USD.volume_24h;

    const isPositive = percentChange24 >= 0;


    const toggleFavorite = () => {

        const favorites =
            JSON.parse(localStorage.getItem('favorites')) || [];

        const id = Number(currency.id);

        let updatedFavorites;

        if (favorites.includes(id)) {

            updatedFavorites = favorites.filter(
                favoriteId => favoriteId !== id
            );

            setIsFavorite(false);

        } else {

            updatedFavorites = [
                ...favorites,
                id
            ];

            setIsFavorite(true);
        }


        localStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavorites)
        );


        window.dispatchEvent(
            new Event("favoritesUpdated")
        );
    };


    return (
        <Card
            title={
                <div className="width: 600 flex items-center justify-between py-2">

                    <div className="flex items-center gap-3">

                        <img
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                            alt={currency.name}
                            className="w-10 h-10"
                        />

                        <div>

                            <div className="
                                text-lg
                                font-semibold
                                text-gray-900
                                dark:text-white
                            ">
                                {currency.name}
                            </div>

                            <div className="
                                text-xs
                                text-gray-400
                            ">
                                {currency.symbol}
                            </div>

                        </div>

                    </div>


                    {/* Избранное */}
                    <button
                        onClick={toggleFavorite}
                        className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            rounded-lg
                            text-xl
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                            transition
                        "
                    >
                        <span
                            className={
                                isFavorite
                                    ? "text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                            }
                        >
                            {isFavorite ? "★" : "☆"}
                        </span>
                    </button>

                </div>
            }

            className="
                shadow-md
                rounded-xl
                dark:border-gray-800
            "

            style={{
                width: 380
            }}
        >

            {/* Цена */}
            <div className="flex items-baseline gap-3 mb-4">

                <span className="
                    text-3xl
                    font-bold
                    text-gray-900
                    dark:text-white
                ">
                    ${price.toFixed(2)}
                </span>

                <span
                    className={`
                        text-sm
                        font-medium
                        ${
                        isPositive
                            ? 'text-green-500'
                            : 'text-red-500'
                    }
                    `}
                >
                    {isPositive ? '▲' : '▼'}{' '}
                    {Math.abs(percentChange24).toFixed(2)}%
                </span>

            </div>


            {/* Статистика */}
            <div className="
                grid
                grid-cols-2
                gap-4
                pt-4
                border-t
                border-gray-100
                dark:border-gray-700
            ">

                <div>

                    <div className="
                        text-xs
                        text-gray-400
                    ">
                        Капитализация
                    </div>

                    <div className="
                        font-medium
                        text-gray-900
                        dark:text-white
                    ">
                        ${(marketCap / 1_000_000_000).toFixed(2)}B
                    </div>

                </div>




                <div>

                    <div className="
                        text-xs
                        text-gray-400
                    ">
                        Объём 24ч
                    </div>

                    <div className="
                        font-medium
                        text-gray-900
                        dark:text-white
                    ">
                        ${(volume24 / 1_000_000_000).toFixed(2)}B
                    </div>

                </div>

                <PriceChart currency={currency} />

            </div>

        </Card>
    );
}

export default CryptocurrencyCard;