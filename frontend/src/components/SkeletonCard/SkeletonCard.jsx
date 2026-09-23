
const SkeletonCard = () => {
    return (
        <div
            className="
                w-[380px]
                rounded-xl
                border
                border-gray-200
                dark:border-gray-800
                bg-white
                dark:bg-gray-900
                shadow-md
                p-6
                animate-pulse
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                    {/* Иконка */}
                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gray-200
                            dark:bg-gray-700
                        "
                    />

                    <div>
                        {/* Название */}
                        <div
                            className="
                                w-28
                                h-5
                                rounded
                                bg-gray-200
                                dark:bg-gray-700
                                mb-2
                            "
                        />

                        {/* Symbol */}
                        <div
                            className="
                                w-12
                                h-3
                                rounded
                                bg-gray-200
                                dark:bg-gray-700
                            "
                        />
                    </div>

                </div>

                {/* Звёздочка */}
                <div
                    className="
                        w-9
                        h-9
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700
                    "
                />

            </div>


            {/* Цена */}
            <div className="flex items-center gap-3 mb-6">

                <div
                    className="
                        w-36
                        h-9
                        rounded
                        bg-gray-200
                        dark:bg-gray-700
                    "
                />

                <div
                    className="
                        w-16
                        h-5
                        rounded
                        bg-gray-200
                        dark:bg-gray-700
                    "
                />

            </div>


            {/* Статистика */}
            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                    pt-4
                    border-t
                    border-gray-100
                    dark:border-gray-700
                "
            >

                <div>

                    <div
                        className="
                            w-24
                            h-3
                            rounded
                            bg-gray-200
                            dark:bg-gray-700
                            mb-2
                        "
                    />

                    <div
                        className="
                            w-20
                            h-5
                            rounded
                            bg-gray-200
                            dark:bg-gray-700
                        "
                    />

                </div>


                <div>

                    <div
                        className="
                            w-20
                            h-3
                            rounded
                            bg-gray-200
                            dark:bg-gray-700
                            mb-2
                        "
                    />

                    <div
                        className="
                            w-20
                            h-5
                            rounded
                            bg-gray-200
                            dark:bg-gray-700
                        "
                    />

                </div>

            </div>

        </div>
    );
};

export default SkeletonCard;

