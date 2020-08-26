import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./next-prevButton.styles.scss";

interface NextPrevButtonProps {
  type: "nextButton" | "previousButton";
  clickFunction(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const NextPrevButton: FunctionComponent<NextPrevButtonProps> = ({ type, clickFunction }) => {
  return (
    <Button className="nextPrevButton" id={type} variant="primary" onClick={clickFunction}>
      {type === "nextButton" && <FaChevronRight />}
      {type === "previousButton" && <FaChevronLeft />}
    </Button>
  );
};

export default NextPrevButton;
