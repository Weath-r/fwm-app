import { PropsWithChildren } from "react";

type Props = {
    icon?: HTMLElement,
    className?: String,
    rounded?: boolean,
    color: String,
    handleClick: () => void
}
export default function Btn(props: PropsWithChildren<Props>) {
    let extraClass = "";
    if (props.rounded) {
        extraClass += "rounded";
    }
    return (
        <button className={`bg-white text-${props.color} ${extraClass} ${props.className}`} onClick={props.handleClick}>
            {props.children}
        </button>
    )
}