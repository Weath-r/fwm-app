import { PropsWithChildren } from "react";

type Props = {
    icon?: HTMLElement,
    className?: string,
    rounded?: boolean,
    color: string,
    handleClick: () => void
};
export default function Btn(props: PropsWithChildren<Props>) {
    let extraClass = "";
    if (props.rounded) {
        extraClass += "rounded";
    }
    let textColor = "";
    if (props.color === "primary") {
        textColor = "text-primary";
    } else if (props.color === "danger") {
        textColor = "text-danger";
    }
    return (
        <button className={`bg-white ${textColor} ${extraClass} ${props.className}`} onClick={props.handleClick}>
            {props.children}
        </button>
    );
}