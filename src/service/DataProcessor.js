export class DataProcessor {
    #url
    #cities
    constructor(url, cities) {
        this.#cities = cities;
        this.#url = url;
    }
    async getData(latitude, longitude) {
        const responseFromServer =
            await fetch(`${this.#url}&latitude=${latitude}&longitude=${longitude}`);
        return responseFromServer.json();


    }
    // async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
    //     if (!(city in this.#cities)) return;

    //     const [latitude, longitude] = this.getCoordinatesByCity(city);
    //     const weatherData = await this.getData(latitude, longitude);
    //     const dateAndTime = weatherData.hourly.time;
    //     const temperatures = weatherData.hourly.temperature_2m;

    //     const filteredData = dateAndTime
    //         .filter((datetime, index) => {
    //             const [date, time] = datetime.split("T");
    //             return date >= startDate && date <= endDate && time >= hourFrom && time <= hourTo;
    //         })
    //         .map(datetime => temperatures[dateAndTime.indexOf(datetime)]);

    //     console.log(filteredData);

    //     const filteredTemperatureData = filteredData.map((datetime, index) => {
    //         return {
    //           date: datesArr[getDateAndTimeArr.indexOf(datetime)],
    //           hour: timesArr[getDateAndTimeArr.indexOf(datetime)],
    //           temperature: temperatures[index]
    //         }
    //       });

    //       console.log(filteredTemperatureData);
    // }
    async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
        if (city in this.#cities) {
            let res = this.getCoordinatesByCity(city)
            const getDataByCoordinate = await this.getData(res[0], res[1]);
            const getDateAndTimeArr = getDataByCoordinate.hourly.time;
            const temperatureArr = getDataByCoordinate.hourly.temperature_2m;
            const timesArr = []
            const datesArr = []
            for (let dateTimeString of getDateAndTimeArr) {
                const time = dateTimeString.split("T")[1];
                const date = dateTimeString.split("T")[0];
                timesArr.push(time);
                datesArr.push(date);
            }

            const filteredData = getDateAndTimeArr.filter((datetime, index) => {
                const currentDate = datesArr[index];
                const currentTime = timesArr[index];
                return (currentDate >= startDate && currentDate <= endDate) && (currentTime >= hourFrom && currentTime <= hourTo);
            });

            const filteredTemperature = filteredData.map((datetime, index) => temperatureArr[getDateAndTimeArr.indexOf(datetime)]);
            console.log(filteredTemperature)
            const filteredTemperatureData = filteredData.map((datetime, index) => {
                return {
                    date: datesArr[getDateAndTimeArr.indexOf(datetime)],
                    hour: timesArr[getDateAndTimeArr.indexOf(datetime)],
                    temperature: temperatureArr[index]
                }
            });

            console.log(filteredTemperatureData);
        }
    }
    // async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
    //     if (city in this.#cities) {
    //         let res = this.getCoordinatesByCity(city)
    //         const getDataByCoordinate = await this.getData(res[0], res[1]);
    //         const getDateAndTimeArr = getDataByCoordinate.hourly.time;
    //         const temperatureArr = getDataByCoordinate.hourly.temperature_2m;
    //         console.log(temperatureArr);
    //         const timesArr = [];
    //         const datesArr = [];
    //         for (let dateTimeString of getDateAndTimeArr) {
    //             const time = dateTimeString.split("T")[1];
    //             const date = dateTimeString.split("T")[0];
    //             timesArr.push(time);
    //             datesArr.push(date);
    //         }


    //         return getDateAndTimeArr;
    //     }
    // }
    getCoordinatesByCity(city) {
        const coords = this.#cities[city];
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        return [latitude, longitude];
    }

}