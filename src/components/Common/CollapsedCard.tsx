import { ReactElement, useState, CSSProperties } from "react";
import SvgInline from "./SvgInline";

type CollapsedCardProps = {
    children: ReactElement;
    title: ReactElement;
    theme: string;
    style?: CSSProperties;
    class?: string;
};

export default function CollapsedCard(props: Readonly<CollapsedCardProps>) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    let svgClass = "fill-primary";
    if (props.theme === "dark") {
        svgClass = "fill-white";
    }
    return (
        <div 
            className={`text-left rounded flex flex-col rounded-lg ${props.class}`}
            style={props.style}
        >
            <button 
                className="flex justify-between items-center w-full py-1 px-2"
                onClick={toggleCollapse} 
            >
                {props.title}
                { isCollapsed 
                    ? <SvgInline path="icons/caret-down.svg" className={`w-2 mr-1 ${svgClass}`}></SvgInline> 
                    : <SvgInline path="icons/caret-up.svg" className={`w-2 mr-1 ${svgClass}`}></SvgInline>}
            </button>
            {!isCollapsed && 
            <div className="w-full rounded-b-lg">
                {props.children}
            </div>}
        </div>
    );
}
