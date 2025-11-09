import SvgInline from "@/components/Common/SvgInline";

type StationPageProps = {
    warningLevel: number;
};

const WarningLevels: Record<number, { label: string; color: string }> = {
    1: {
        label: "Minimum frost expected",
        color: "stroke-[#62bf77]",
    },
    2: {
        label: "Some frost expected",
        color: "stroke-[#FFDB00]",
    },
    3: {
        label: "Medium frost expected",
        color: "stroke-[#FF8F00]",
    },
    4: {
        label: "Extreme frost expected",
        color: "stroke-[#ED2B2A]",
    },
};

export function FrostWarning ({ warningLevel }: StationPageProps) {
    const fillClass = WarningLevels[warningLevel].color;
    return (
        <div className="flex items-center rounded-full">
            <div className="size-5">
                <SvgInline
                    path="/weather_icons/v2/snowflake.svg"
                    title="Frost warning level"
                    className={fillClass}
                />
            </div>
        </div>
    );
}