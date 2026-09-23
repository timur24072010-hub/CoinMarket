import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const PriceChart = ({ currency }) => {
    if (!currency?.quote?.USD) {
        return null;
    }

    const usd = currency.quote.USD;
    const currentPrice = Number(usd.price);

    const calculatePrice = (percent) => {
        return currentPrice / (1 + Number(percent) / 100);
    };

    const data = [
        {
            period: "30D",
            price: calculatePrice(usd.percent_change_30d)
        },
        {
            period: "7D",
            price: calculatePrice(usd.percent_change_7d)
        },
        {
            period: "24H",
            price: calculatePrice(usd.percent_change_24h)
        },
        {
            period: "1H",
            price: calculatePrice(usd.percent_change_1h)
        },
        {
            period: "Сейчас",
            price: currentPrice
        }
    ];

    return (
        <div className="w-75 mt-6">

            <div className="
                flex
                items-center
                justify-between
                mb-3
            ">
                <span className="
                    text-sm
                    text-gray-400
                ">
                    График цены
                </span>

                <span className="
                    text-xs
                    text-gray-500
                ">
                    USD
                </span>
            </div>

            <div className="w-full h-[260px]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 5,
                            left: 5,
                            bottom: 5
                        }}
                    >

                        <defs>
                            <linearGradient
                                id="priceGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopOpacity={0.25}
                                />

                                <stop
                                    offset="100%"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="period"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 11,
                                fill: "#6b7280"
                            }}
                        />

                        <YAxis
                            hide
                            domain={["dataMin", "dataMax"]}
                        />

                        <Tooltip
                            cursor={{
                                stroke: "#6b7280",
                                strokeDasharray: "4 4"
                            }}
                            contentStyle={{
                                background: "#111827",
                                border: "1px solid #374151",
                                borderRadius: "8px",
                                color: "#fff"
                            }}
                            formatter={(value) => [
                                `$${Number(value).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                )}`,
                                "Цена"
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                            dot={false}
                            activeDot={{
                                r: 6
                            }}
                            isAnimationActive={true}
                        />

                    </AreaChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default PriceChart;