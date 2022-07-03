export type weatherObject = {
  [key: string]: weatherOptions[];
};
export type weatherOptions = {
  dt: number;
  main: weatherTemperature;
  weather: weatherDescription;
};
export type weatherTemperature = {
  temp: string;
};
export type weatherDescription = {
  description: string;
  icon: string;
  id: number;
};
export type weatherForecast = {
  city: string;
  country: string;
};

export type locationObject = {
  lat: number;
  lon: number;
}