import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode, useState } from "react";
import { Bars2Icon } from "@heroicons/react/20/solid";

type OptionsProp = {
    id: number;
    element: ReactNode
};
type DropdownListMenuComponentProps = {
    items?: OptionsProp[];
    portalElement?: string;
    triggerElement?: ReactNode
    side?: "top" | "right" | "bottom" | "left"
};
export default function DropdownListMenu({
    items,
    portalElement = "#portal",
    triggerElement = <Bars2Icon className="size-5 text-primary" aria-hidden="true"/>,
    side = "bottom",
}: Readonly<DropdownListMenuComponentProps>) {
    const [open, setOpen] = useState(false);
    return (
        <DropdownMenu.Root 
            open={open} 
            modal={true}
            onOpenChange={(status) =>setOpen(status)}
        >
            <DropdownMenu.Trigger 
                asChild
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => setOpen(!open)}
            >
                <button
                    className="relative inline-flex size-[35px] items-center justify-center rounded-lg bg-white text-primary outline-none"
                    aria-label="Trigger dropdown"
                >
                    {triggerElement}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal
                container={document.querySelector(portalElement)}
            >
                <DropdownMenu.Content
                    className="mr-1 max-w-[380px] rounded-md bg-white shadow-md"
                    sideOffset={3}
                    align="center"
                    side={side}
                >
                    {items?.map(item => (
                        <DropdownMenu.Item
                            key={item.id}
                            className="flex min-h-[25px] select-none items-center text-sm leading-none outline-none data-[disabled]:pointer-events-none"
                            onSelect={(e) => e.preventDefault()}
                        >
                            {item.element}
                        </DropdownMenu.Item> 
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
