import React, { FunctionComponent } from "react";
import "./infoView.styles.scss";
import RangeSlider from "react-bootstrap-range-slider";

interface InfoViewProps {
  title: string;
  dissolve: number;
  setDissolve: Function;
}

const InfoView: FunctionComponent<InfoViewProps> = ({ title, dissolve, setDissolve }) => {
  return (
    <div id="settingsContainer">
      <h1>{title}</h1>
      <div id="sliderContainer">
        <RangeSlider
          value={dissolve}
          onChange={(changeEvent: any) => setDissolve(changeEvent.target.value)}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default InfoView;
