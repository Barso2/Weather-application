import { DataProcessor } from "./service/DataProcessor.js";
import { weatherConfig } from "./config/weather-config.js";

const dataProcessor = new DataProcessor(weatherConfig.url, weatherConfig.cities);
dataProcessor.getTemperatureData("Rehovot","2023-02-15","2023-02-16","00:00","03:00");

// async function getTemperatureData() {
    
// }
// displayTemperatures();
// async function displayTemperatures() {
//     const data = await dataProcessor.getData(29.5577, 34.9519);//Eilat
//     // console.log(data);
//     console.log(data.hourly.temperature_2m)
// }
// displayTemperatures();