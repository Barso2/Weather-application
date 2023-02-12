export class DataProcessor {
    #url
    #cities
    constructor(url, cities) {
        this.#cities = cities;
        this.#url = url;
    }
    async getData(latitude, longitude) {
        const responseFromServer =
            await fetch(`${this.#url} & latitude=${latitude} & longitude=${longitude}`);
        return responseFromServer.json();


    }

    async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
        if (city in this.#cities) {
            let res = this.getCoordinatesByCity(city)
            const getDataByCoordinate = await this.getData(res[0], res[1]);
            return console.log(JSON.stringify(getDataByCoordinate));
        }
    }
    getCoordinatesByCity(city) {
        const coords = this.#cities[city];
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        return [latitude, longitude];
    }

}