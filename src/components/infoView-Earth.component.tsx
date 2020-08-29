import React, { FunctionComponent } from "react";
import RangeSlider from "react-bootstrap-range-slider";

import "./infoView-Earth.styles.scss";

interface EarthSettingsProps {
  earthCloudsAmount: number;
  setEarthClouds: Function;
}

const EarthSettings: FunctionComponent<EarthSettingsProps> = ({
  earthCloudsAmount,
  setEarthClouds,
}) => {
  return (
    <div className="sliderContainer">
      <h3>Clouds:</h3>
      <RangeSlider
        value={earthCloudsAmount}
        onChange={(changeEvent: any) => setEarthClouds(changeEvent.target.value)}
        variant="primary"
        tooltip="off"
      />
    </div>
  );
};

export default EarthSettings;
