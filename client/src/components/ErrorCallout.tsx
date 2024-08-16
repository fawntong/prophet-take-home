import { Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
  errorMessage?: string | null;
  closeable?: boolean;
}

/**
 * Styled wrapper around the RadixUI Callout for rendering error messages.
 * @param errorMessage - The message to render. ErrorCallout will not render anything if a message is not given.
 * @param closeable - Renders a button to close the Callout if true.
 */
export const ErrorCallout: React.FC<Props> = ({ errorMessage, closeable }) => {
  const [open, setOpen] = useState<boolean>(true);

  if (!errorMessage || !open) return null;

  return (
    <Callout.Root color="red" role="alert">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{errorMessage}</Callout.Text>
      {closeable && (
        <Button size="1" onClick={() => setOpen(false)}>
          Close
        </Button>
      )}
    </Callout.Root>
  );
};
