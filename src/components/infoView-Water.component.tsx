import React, { FunctionComponent } from "react";
import RangeSlider from "react-bootstrap-range-slider";

interface VenusSettingsProps {
  venusWaterAmount: number;
  setVenusWater: Function;
}

const VenusSettings: FunctionComponent<VenusSettingsProps> = ({
  venusWaterAmount,
  setVenusWater,
}) => {
  return (
    <div className="sliderContainer">
      <h3>Water:</h3>
      <RangeSlider
        value={venusWaterAmount}
        onChange={(changeEvent: any) => setVenusWater(changeEvent.target.value)}
        variant="primary"
        tooltip="off"
      />
    </div>
  );
};

export default VenusSettings;
