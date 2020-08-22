const planetData: { [key: string]: { [key: string]: string } } = {
  Mercury: {
    distance: "55 million km",
    dayLength: "176 Earth days",
    yearLength: "88 Earth days",
    planetType: "Terrestrial",
  },
  Venus: {
    distance: "108 million km",
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    planetType: "Terrestrial",
  },
  Earth: {
    distance: "150 million km",
    dayLength: "23.9 hours",
    yearLength: "365.25 days",
    planetType: "Terrestrial",
  },
  Mars: {
    distance: "228 million km",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    planetType: "Terrestrial",
  },
  Jupiter: {
    distance: "778 million km",
    dayLength: "9.93 hours",
    yearLength: "11.86 Earth days",
    planetType: "Gas Giant",
  },
  Saturn: {
    distance: "1.4 billion km",
    dayLength: "10.7 hours",
    yearLength: "29 Earth days",
    planetType: "Gas Giant",
  },
  Uranus: {
    distance: "2.8 billion km",
    dayLength: "17 hours",
    yearLength: "84 Earth days",
    planetType: "Ice Giant",
  },
  Neptune: {
    distance: "4.5 billion km",
    dayLength: "16 hours",
    yearLength: "165 Earth years",
    planetType: "Ice Giant",
  },
};

export default planetData;