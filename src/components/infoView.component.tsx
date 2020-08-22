import React, { FunctionComponent } from "react";
import "./infoView.styles.scss";
import RangeSlider from "react-bootstrap-range-slider";

import planetData from "./infoView-planetData";

interface InfoViewProps {
  title: string;
  dissolve: number;
  setDissolve: Function;
}

const InfoView: FunctionComponent<InfoViewProps> = ({ title, dissolve, setDissolve }) => {
  return (
    <div id="settingsContainer">
      <div id="mainSettingsSection">
        <h1>{title}</h1>
        <div id="sliderContainer">
          <RangeSlider
            value={dissolve}
            onChange={(changeEvent: any) => setDissolve(changeEvent.target.value)}
            variant="primary"
          />
        </div>
      </div>
      <div id="infoContainer">
        <p>
          Distance from sun: {planetData[title].distance}
          <br />
          Day length: {planetData[title].dayLength}
          <br />
          Length of year: {planetData[title].yearLength}
          <br />
          Planet type: {planetData[title].planetType}
          <br />
        </p>
      </div>
    </div>
  );
};

export default InfoView;
