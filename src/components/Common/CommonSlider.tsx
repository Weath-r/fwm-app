import * as Slider from "@radix-ui/react-slider";

type SliderProps = {
    step: number;
    max?: number;
    marks: Record<string, any>;
    onChange: (value: number | number[]) => void;
    value: number;
    createTooltipLabel: (value: number) => string;
};

export default function CommonSlider(props: SliderProps) {
    return (
        <form className="relative">
            <div className="text-center">
                <p className="text-sm font-bold text-primary">
                    {props.createTooltipLabel(props.value)}
                </p>
            </div>

            <Slider.Root
                className="relative flex h-5 touch-none select-none items-center"
                value={[props.value]}
                max={props.max}
                step={props.step}
                onValueChange={(value) => props.onChange(value[0])}
            >
                <Slider.Track className="relative h-[3px] grow rounded-full bg-primary/10">
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>

                <Slider.Thumb
                    className="block size-4 rounded-[10px] bg-primary hover:bg-primary focus:outline-none"
                    aria-label="Slider"
                />
            </Slider.Root>

            <div className="flex mt-2 flex-row items-center justify-between text-primary pb-1">
                {Object.values(props.marks).map((elm, index) => {
                    const styling = elm && index > 0 ? "border-l-2 border-primary/70 pl-2" : "";
                    return (
                        <span
                            key={`column-${index}`}
                            className={`${styling} text-xs font-light`}
                            role="presentation"
                        >
                            {elm}
                        </span>
                    );
                })}
            </div>
        </form>
    );
}
