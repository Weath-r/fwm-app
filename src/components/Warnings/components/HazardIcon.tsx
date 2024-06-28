import { assetUrl } from "@/helpers/assetsHandling";
import SvgInline from "@/components/Common/SvgInline";

type HazardIconProps = {
    asset: string;
    label: string;
    className: string;
};

export default function HazardIcon(props: Readonly<HazardIconProps>) {
    const { asset, label, className } = props;
    const imagePath = assetUrl(asset);
    return (
        <SvgInline 
            path={imagePath} 
            title={label} 
            className={className}
        ></SvgInline>
    );
}