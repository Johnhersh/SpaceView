import React, { FunctionComponent } from "react";
import "./infoView.styles.scss";
import RangeSlider from "react-bootstrap-range-slider";

import planetData from "./infoView-planetData";

interface InfoViewProps {
  title: string;
  earthNightDayAmount: number;
  setEarthNightDay: Function;
  earthCloudsAmount: number;
  setEarthClouds: Function;
}

const InfoView: FunctionComponent<InfoViewProps> = ({
  title,
  earthNightDayAmount,
  setEarthNightDay,
  earthCloudsAmount,
  setEarthClouds,
}) => {
  return (
    <div id="settingsContainer">
      <div id="mainSettingsSection">
        <h1>{title}</h1>
        {title === "Earth" && (
          <div id="sliderContainer">
            <RangeSlider
              value={earthNightDayAmount}
              onChange={(changeEvent: any) => setEarthNightDay(changeEvent.target.value)}
              variant="primary"
            />
            <RangeSlider
              value={earthCloudsAmount}
              onChange={(changeEvent: any) => setEarthClouds(changeEvent.target.value)}
              variant="primary"
            />
          </div>
        )}
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
