import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./navButton.styles.scss";

interface NavButtonProps {
  type: "nextButton" | "previousButton";
  clickFunction(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const NavButton: FunctionComponent<NavButtonProps> = ({ type, clickFunction }) => {
  return (
    <Button className="nextPrevButton" id={type} variant="primary" onClick={clickFunction}>
      {type === "nextButton" && <FaChevronRight />}
      {type === "previousButton" && <FaChevronLeft />}
    </Button>
  );
};

export default NavButton;
