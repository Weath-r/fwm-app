import InlineSVG from "react-inlinesvg";

type SvgInlineProps = {
    title?: string;
    path: string;
    className?: string;
    style?: React.CSSProperties;
};

export default function SvgInline(props: Readonly<SvgInlineProps>) {
    const { title, path, className, style } = props;
    return (
        <InlineSVG 
            className={className} 
            src={path} 
            width="100%" 
            height="100%" 
            title={title}
            style={style}
        />
    );
}
