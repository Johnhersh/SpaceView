import React, { FunctionComponent } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import "./infoView.styles.scss";

import EarthSettings from "./infoView-Earth.component";
import WaterSettings from "./infoView-Water.component";
import planetData from "./infoView-planetData";

interface InfoViewProps {
  title: string;
  globalNightDayAmount: number;
  setNightDay: Function;
  earthCloudsAmount: number;
  setEarthClouds: Function;
  venusWaterAmount: number;
  setVenusWater: Function;
  marsWaterAmount: number;
  setMarsWater: Function;
}

const InfoView: FunctionComponent<InfoViewProps> = ({
  title,
  globalNightDayAmount,
  setNightDay,
  earthCloudsAmount,
  setEarthClouds,
  venusWaterAmount,
  setVenusWater,
  marsWaterAmount,
  setMarsWater,
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
            <WaterSettings venusWaterAmount={venusWaterAmount} setVenusWater={setVenusWater} />
          )}
          {title === "Mars" && (
            <WaterSettings venusWaterAmount={marsWaterAmount} setVenusWater={setMarsWater} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoView;
