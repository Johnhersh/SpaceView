import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import InfoView from "./infoView.component";
import EarthSettings from "./infoView-Earth.component";
import WaterSettings from "./infoView-Water.component";

configure({ adapter: new Adapter() });

describe("<PlanetMesh/>", () => {
  let wrapper = shallow(
    <InfoView
      title="Mercury"
      globalNightDayAmount={1}
      setNightDay={() => {}}
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
});
