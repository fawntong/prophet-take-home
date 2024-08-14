import React, {PropsWithChildren} from "react";
import {Heading} from "@radix-ui/themes";

interface Props {
    pageHeading: string;
}

export const PageWrapper: React.FC<PropsWithChildren<Props>> = ({pageHeading, children}) => {
    return (
        <div className="flex flex-col items-center w-full h-full mt-8">
            <div className="container">
                <Heading className="mb-4">{pageHeading}</Heading>
                {children}
            </div>
        </div>
    )
}