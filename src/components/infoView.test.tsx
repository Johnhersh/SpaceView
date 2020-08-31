import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import InfoView from "./infoView.component";
import EarthSettings from "./infoView-Earth.component";
import VenusSettings from "./infoView-Water.component";

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
  it("should render an VenusSettings component", () => {
    wrapper.setProps({ title: "Venus" });
    expect(wrapper.find(VenusSettings)).toHaveLength(1);
  });
});
