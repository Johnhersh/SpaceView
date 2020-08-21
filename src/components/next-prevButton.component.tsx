import React from "react";
import Button from "react-bootstrap/Button";
import "./next-prevButton.styles.scss";

interface NextPrevButtonProps {
  type: "nextButton" | "previousButton";
  clickFunction(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export default function NextPrevButton({ type, clickFunction }: NextPrevButtonProps) {
  return (
    <Button id={type} variant="primary" onClick={clickFunction}>
      Next
    </Button>
  );
}
