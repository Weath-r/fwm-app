import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect } from "react";

type SliderProps = {
    step: number;
    max?: number;
    marks: {
        [key:string]: any;
    },
    onChange: (value: number | number[]) => void;
    defaultValue: number;
    createTooltipLabel: (value: number) => string;
};
  
export default function CommonSlider(props: SliderProps) {
    const [sliderValue, setSliderValue] = useState<number>(props.defaultValue);

    const handleOnChange = (value:number[]) => {
        props.onChange(value[0]);
    };

    useEffect(() => {
        setSliderValue(props.defaultValue);
    },[props.defaultValue]);
    
    return (
        <form className="relative">
            <div className="text-center">
                <p className="text-sm font-bold text-primary">
                    {props.createTooltipLabel(sliderValue)}
                </p>
            </div>
            <Slider.Root
                className="relative flex h-5 touch-none select-none items-center"
                defaultValue={[props.defaultValue ?? 0]}
                max={props.max}
                step={props.step}
                value={[sliderValue]}
                onValueChange={value => setSliderValue(value[0])}
                onValueCommit={handleOnChange}
            >
                <Slider.Track className="relative h-[3px] grow rounded-full bg-primary/10">
                    <Slider.Range className="absolute h-full rounded-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb
                    className="block size-4 rounded-[10px] bg-primary hover:bg-primary focus:outline-none"
                    aria-label="Volume"
                />
            </Slider.Root>
            <div className="flex h-fit flex-row items-center justify-between text-primary">
                {Object.values(props.marks).map((elm, index) => {
                    const styling = elm && index > 0 ? "border-l border-primary/10 pl-2" : "";
                    return (
                        <span
                            key={`column-${index}`}
                            className={`${styling} py-2 text-xs font-light`}
                            role="presentation"
                        >
                            {elm}
                        </span>
                    );
                })}
            </div>
        </form>
    );
};