import { useEffect } from "react";
import { animate, AnimationParams, JSAnimation } from "animejs";

type useAnimeIconParams = {
    target: React.RefObject<HTMLElement | null>;
    parameters: {
        extraTarget?: string[];
        animationConfig: AnimationParams;
    };
    timeline?: boolean;
};

export function useAnimeIcon({ target, parameters }: useAnimeIconParams) {
    useEffect(() => {
        if (!target.current) return;
        let animation: JSAnimation | undefined;
        let observer: MutationObserver | undefined;

        const runAnimation = () => {
            if (parameters.extraTarget) {
                const elements: Element[][] = [];
                if (target.current) {
                    parameters.extraTarget.forEach((elem) => {
                        elements.push(Array.from(target.current!.querySelectorAll(elem)));
                    });
                }
                if (elements.length > 0) {
                    animation = animate(elements, parameters.animationConfig);
                }
            } else if (target.current) {
                animation = animate(target.current, parameters.animationConfig);
            }
        };

        runAnimation();

        if (parameters.extraTarget && target.current) {
            observer = new MutationObserver(() => {
                const elements: Element[][] = [];
                if (target.current) {
                    parameters.extraTarget?.forEach((elem) => {
                        elements.push(Array.from(target.current!.querySelectorAll(elem)));
                    });
                }
                if (elements.length > 0) {
                    runAnimation();
                    if (observer) observer.disconnect();
                }
            });
            observer.observe(target.current, { childList: true, subtree: true });
        }

        return () => {
            if (animation) animation.pause();
            if (observer) observer.disconnect();
        };
    }, [target, parameters]);
}
