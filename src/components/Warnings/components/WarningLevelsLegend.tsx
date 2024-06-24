import { WarningLevel } from "@/types";

type WarningLevelsLegendType = {
    levels: WarningLevel[];
};

export default function WarningLevelsLegend(props: Readonly<WarningLevelsLegendType>) {
    const { levels } = props;
    return (
        <div className="bg-white rounded flex flex-col p-4">
            <h2 className="text-primary text-lg font-bold">Warning levels</h2>
            <div className="mt-2">
                {levels.map(level => {
                    return (
                        <div 
                            className="flex items-center justify-between text-primary my-2 border-b-1 border-light_white"
                            key={level.label}
                        >
                            <p>
                                {level.label}
                            </p>
                            <div className="w-4 h-4 rounded-lg"
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