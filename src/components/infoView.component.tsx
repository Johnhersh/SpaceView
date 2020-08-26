import React, { FunctionComponent } from "react";
import "./infoView.styles.scss";

import EarthSettings from "./infoView-Earth.component";
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
      <div id="infoViewHeader">
        <h2 style={{ textAlign: "center" }}>{title}</h2>
      </div>
      <div id="infoViewContent">
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
        <div id="mainSettingsSection">
          {title === "Earth" && (
            <EarthSettings
              earthNightDayAmount={earthNightDayAmount}
              setEarthNightDay={setEarthNightDay}
              earthCloudsAmount={earthCloudsAmount}
              setEarthClouds={setEarthClouds}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
