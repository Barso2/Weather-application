import { DataProcessor } from "./service/DataProcessor.js";
import { weatherConfig } from "./config/weather-config.js";

const url = weatherConfig.url;
const citiesObj = weatherConfig.cities;
const dataProcessor = new DataProcessor(url, citiesObj);
dataProcessor.getTemperatureData("Rehovot");

// async function getTemperatureData() {
    
// }
// displayTemperatures();
// async function displayTemperatures() {
//     const data = await dataProcessor.getData(29.5577, 34.9519);//Eilat
//     // console.log(data);
//     console.log(data.hourly.temperature_2m)
// }
// displayTemperatures();