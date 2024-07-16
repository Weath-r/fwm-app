import { WarningLevel } from "@/types";

type WarningLevelsLegendType = {
    levels: WarningLevel[];
};

export default function WarningLevelsLegend(props: Readonly<WarningLevelsLegendType>) {
    const { levels } = props;
    return (
        <div className="flex flex-col rounded bg-white p-4">
            <h2 className="text-lg font-bold text-primary">
                Warning levels
            </h2>
            <div className="mt-2">
                {levels.map(level => {
                    return (
                        <div 
                            className="border-b-1 my-2 flex items-center justify-between border-light_white text-primary"
                            key={level.label}
                        >
                            <p>
                                {level.label}
                            </p>
                            <div className="size-4 rounded-lg"
                                style={{
                                    backgroundColor: level.color,
                                }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}