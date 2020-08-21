import React from "react";
import Button from "react-bootstrap/Button";
import "./next-prevButton.styles.scss";

interface NextPrevButtonProps {
  type: "nextButton" | "previousButton";
}

export default function NextPrevButton({ type }: NextPrevButtonProps) {
  return (
    <Button id={type} variant="primary">
      Next
    </Button>
  );
}
