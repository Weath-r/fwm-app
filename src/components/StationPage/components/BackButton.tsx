import { useRouter } from "next/navigation";

type GoBackButtonProps = {
    children: React.ReactNode;
};

export const BackButton = (props: GoBackButtonProps) => {
    const router = useRouter();
    return (
        <button onClick={() => router.back()}>
            {props.children}
        </button>
    );
};