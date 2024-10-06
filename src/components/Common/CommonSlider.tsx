import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Popover } from "@headlessui/react";
import { useState } from "react";

type SliderProps = {
    step: number;
    min?: number;
    max?: number;
    marks: {
        [key:string]: any;
    },
    onChange: (value: number | number[]) => void;
    defaultValue?: number;
    createTooltipLabel: (value: number) => string;
};

export default function CommonSlider(props: SliderProps) {
    const handleOnChange = (value:number | number[]) => {
        props.onChange(value);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openPopover, setOpenPopover] = useState(true);

    const handleRender = (node: any, handleProps: any): React.ReactElement => {
        return (
            <>
                {openPopover && (
                    <Popover>
                        {() => (
                            <>      
                                <div className="animation pointer-events-none absolute top-[-34px] w-fit rounded bg-primary px-2 py-1"
                                    style={{
                                        left: node.props.style.left,
                                        boxShadow: "0 0 4px 0 #000",
                                        transform: "translateX(-16px)",
                                    }}
                                >
                                    <Popover.Panel static>
                                        <div className="text-sm font-medium text-white"> 
                                            {props.createTooltipLabel(handleProps.value)}
                                            <div className="tooltip-arrow absolute bottom-[-5px] left-2 size-0 border-x-8 border-t-8 border-x-transparent border-t-primary"></div>
                                        </div>
                                    </Popover.Panel>
                                </div>
                            </>
                        )}
                    </Popover>
                )}
            </>
        );
    };

    const dotStyle = {
        backgroundColor: "#3D5361",
        borderColor: "#3D5361",
        bottom: 0,
        width: "0px",
        height: "0px",
    };

    const trackStyle = {
        backgroundColor: "#3D5361",
    };

    const handleStyle = [{
        borderColor: "#3D5361",
    }];
    
    return (
        <Slider
            marks={props.marks} 
            step={props.step}
            max={props.max}
            onChangeComplete={(nextValue) => {
                handleOnChange(nextValue);
            }}
            defaultValue={props.defaultValue ?? 0}
            dotStyle={dotStyle}
            trackStyle={trackStyle}
            activeDotStyle={dotStyle}
            handleStyle={handleStyle}
            handleRender={handleRender}
        />
    );
};