import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import "./next-prevButton.styles.scss";

interface NextPrevButtonProps {
  type: "nextButton" | "previousButton";
  clickFunction(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const NextPrevButton: FunctionComponent<NextPrevButtonProps> = ({
  type,
  clickFunction,
  children,
}) => {
  return (
    <Button id={type} variant="primary" onClick={clickFunction}>
      {children}
    </Button>
  );
};

export default NextPrevButton;
