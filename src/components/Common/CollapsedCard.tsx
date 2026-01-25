import { ReactElement, useState, CSSProperties } from "react";
import SvgInline from "./SvgInline";

type CollapsedCardProps = {
    children: ReactElement<any>;
    title: ReactElement<any>;
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
            className={`flex flex-col rounded-lg text-left ${props.class}`}
            style={props.style}
        >
            <button 
                className="flex w-full items-center justify-between px-2 py-1"
                onClick={toggleCollapse} 
            >
                {props.title}
                { isCollapsed 
                    ? <SvgInline path="icons/caret-down.svg" className={`mr-1 w-2 ${svgClass}`}></SvgInline> 
                    : <SvgInline path="icons/caret-up.svg" className={`mr-1 w-2 ${svgClass}`}></SvgInline>}
            </button>
            {!isCollapsed && 
            <div className="w-full rounded-b-lg">
                {props.children}
            </div>}
        </div>
    );
}
