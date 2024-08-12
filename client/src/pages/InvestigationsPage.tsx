import {Button, Flex, Text} from "@radix-ui/themes";
import React from "react";
import {fetchInvestigations} from "../lib/fetch-utils";

export const InvestigationsPage: React.FC = () => {
    void fetchInvestigations();
    return (
        <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
        </Flex>
    )
}