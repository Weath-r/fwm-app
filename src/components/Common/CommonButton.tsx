import { ReactElement } from "react";

type CommonButtonProps = {
    className?: string;
    rounded?: boolean;
    color?: string;
    handleClick?: () => void;
    children: ReactElement;
};

export default function CommonButton(props: Readonly<CommonButtonProps>) {
    let extraClass = "";
    if (props.rounded) {
        extraClass += "rounded";
    }
    let textColor = "";
    if (props.color === "primary") {
        textColor = "text-primary";
    } else if (props.color === "danger") {
        textColor = "text-danger";
    } else if (props.color === "secondary") {
        textColor = "text-secondary";
    }
    return (
        <button
            className={`${textColor} ${extraClass} ${props.className}`}
            onClick={props.handleClick}
        >
            {props.children}
        </button>
    );
}
