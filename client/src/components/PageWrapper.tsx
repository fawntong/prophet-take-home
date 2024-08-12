import React, {PropsWithChildren} from "react";
import {Heading, Tooltip} from "@radix-ui/themes";
import {UserAvatar} from "./UserAvatar";

interface Props {
    pageHeading: string;
}

export const PageWrapper: React.FC<PropsWithChildren<Props>> = ({pageHeading, children}) => {
    return (
        <div className="flex flex-col items-center w-full h-full mt-4">
            <div className="container">
                <Heading className="mb-4">{pageHeading}</Heading>
                {children}
            </div>
        </div>
    )
}