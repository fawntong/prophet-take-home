import { Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
  errorMessage?: string | null;
  closeable?: boolean;
}

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
