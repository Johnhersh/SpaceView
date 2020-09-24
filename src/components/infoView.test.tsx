import React from "react";

import { shallow } from "enzyme";

import InfoView from "./infoView.component";
import EarthSettings from "./infoView-Earth.component";
import WaterSettings from "./infoView-Water.component";

describe("InfoView component", () => {
  const mockDayNightSlider = jest.fn();
  const wrapper = shallow(
    <InfoView
      title="Mercury"
      globalNightDayAmount={1}
      setNightDay={mockDayNightSlider}
      earthCloudsAmount={1}
      setEarthClouds={() => {}}
      venusWaterAmount={1}
      setVenusWater={() => {}}
      marsWaterAmount={1}
      setMarsWater={() => {}}
    />
  );

  it("should render an EarthSettings component", () => {
    wrapper.setProps({ title: "Earth" });
    expect(wrapper.find(EarthSettings)).toHaveLength(1);
  });
  it("should render a WaterSettings component", () => {
    wrapper.setProps({ title: "Venus" });
    expect(wrapper.find(WaterSettings)).toHaveLength(1);
  });
  it("should render a WaterSettings component", () => {
    wrapper.setProps({ title: "Mars" });
    expect(wrapper.find(WaterSettings)).toHaveLength(1);
  });
  it("should not have a WaterSettings component", () => {
    wrapper.setProps({ title: "Jupiter" });
    expect(wrapper.find(WaterSettings)).toHaveLength(0);
  });

  describe("when the user slides the day/night slider", () => {
    beforeEach(() => {
      wrapper.find(".dayNightSlider").simulate("change", { target: { value: 50 } });
    });

    it("dispatches the setDayNight function with the value from the day/night slider", () => {
      expect(mockDayNightSlider).toHaveBeenCalledWith(50);
    });
  });
});
