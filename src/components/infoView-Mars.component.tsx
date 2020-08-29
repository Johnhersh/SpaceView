import React, { FunctionComponent } from "react";
import RangeSlider from "react-bootstrap-range-slider";

import "./infoView-Earth.styles.scss";

interface EarthSettingsProps {
  earthNightDayAmount: number;
  setEarthNightDay: Function;
  earthCloudsAmount: number;
  setEarthClouds: Function;
}

const EarthSettings: FunctionComponent<EarthSettingsProps> = ({
  earthNightDayAmount,
  setEarthNightDay,
  earthCloudsAmount,
  setEarthClouds,
}) => {
  return (
    <div id="earthSlidersContainer">
      <div className="sliderContainer">
        <h3>Night:</h3>
        <RangeSlider
          value={earthNightDayAmount}
          onChange={(changeEvent: any) => setEarthNightDay(changeEvent.target.value)}
          variant="primary"
          tooltip="off"
        />
      </div>
      <div className="sliderContainer">
        <h3>Clouds:</h3>
        <RangeSlider
          value={earthCloudsAmount}
          onChange={(changeEvent: any) => setEarthClouds(changeEvent.target.value)}
          variant="primary"
          tooltip="off"
        />
      </div>
    </div>
  );
};

export default EarthSettings;
