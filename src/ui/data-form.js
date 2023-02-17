const FORM_ID = "data-form-id";
const DATE_FROM_ID = "date-from-id";
const DATE_TO_ID = "date-to-id"
const HOUR_FROM_ID = "hour-from-id"
const HOUR_TO_ID = "hour-to-id"
export class DataForm {
    #formElement;
    #dateFromElement;
    #dateToElement;
    #hoursFromId
    #hoursToId;
    //       "form-section"  16
    constructor(parentId, maxDays) {
        const parentElement = document.getElementById(parentId);
        this.#fillForm(parentElement);
        this.#formElement = document.getElementById(FORM_ID);
        this.#dateToElement = document.getElementById(DATE_TO_ID);
        this.#dateFromElement = document.getElementById(DATE_FROM_ID);
        this.#setMinMaxDates(maxDays);
    }
    #fillForm(parentElement) {
        parentElement.innerHTML = `<form id="${FORM_ID}">
            <input type="date" id="${DATE_FROM_ID} required">
            <input type="date" id="${DATE_TO_ID}" required>
            <select id="${HOUR_FROM_ID}">
                <option value="kkk">kkk</option>
            </select>
            <select id="${HOUR_TO_ID}">
                <option value="kkk">kkk</option>
            </select>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>`
        this.#hoursFromId = document.getElementById(HOUR_FROM_ID)
        this.#hoursToId = document.getElementById(HOUR_TO_ID)
        this.setHourOptions(this.#hoursFromId, "Hours from");
        this.setHourOptions(this.#hoursToId, "Hours to");
    }

    setHourOptions(hours, str) {
        let res = `<select id="${HOUR_TO_ID}">
                        <option value="" disabled selected>${str}</option>
                   </select>`;
        for (let i = 0; i < 24; i++) {
            res += (`<option value="${i}">${i + ":00"}</option>`)
            console.log(res)
        }
        return hours.innerHTML = res;
    }
    #setMinMaxDates(maxDays) {
        const current = new Date();//Wed Feb 15 2023 23:08:46 GMT+0200 (Israel Standard Time)
        const maxDayOfMonth = current.getDate() + maxDays;// 31
        // console.log(maxDayOfMonth)
        const maxDate = new Date();

        const minDateStr = current.toISOString().split("T")[0];
        const maxDateStr = maxDate.toISOString().split("T")[0];
        this.#dateFromElement.min = minDateStr;
        this.#dateToElement.min = minDateStr;
        this.#dateFromElement.max = maxDateStr;
        this.#dateToElement.max = maxDateStr;

    }

}