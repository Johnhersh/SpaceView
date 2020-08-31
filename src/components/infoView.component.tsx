import React, { FunctionComponent } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "./infoView.styles.scss";

import EarthSettings from "./infoView-Earth.component";
import VenusSettings from "./infoView-Venus.component";
import planetData from "./infoView-planetData";

interface InfoViewProps {
  title: string;
  globalNightDayAmount: number;
  setNightDay: Function;
  earthCloudsAmount: number;
  setEarthClouds: Function;
  venusWaterAmount: number;
  setVenusWater: Function;
}

const InfoView: FunctionComponent<InfoViewProps> = ({
  title,
  globalNightDayAmount,
  setNightDay,
  earthCloudsAmount,
  setEarthClouds,
  venusWaterAmount,
  setVenusWater,
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
          <div className="sliderContainer">
            <h3>Night:</h3>
            <RangeSlider
              value={globalNightDayAmount}
              onChange={(changeEvent: any) => setNightDay(changeEvent.target.value)}
              variant="primary"
              tooltip="off"
            />
          </div>
          {title === "Earth" && (
            <EarthSettings earthCloudsAmount={earthCloudsAmount} setEarthClouds={setEarthClouds} />
          )}
          {title === "Venus" && (
            <VenusSettings venusWaterAmount={venusWaterAmount} setVenusWater={setVenusWater} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
