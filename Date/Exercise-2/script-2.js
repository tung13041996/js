let DATE = {
    checkLeapYear: (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0,

    /** get total days of a year **/
    getDaysOfYear(y) {
        return this.checkLeapYear(y) ? 366 : 365
    },

    /** get total days in a month **/
    getDaysOfMonth(m, y) {
        let day_of_month = [31, this.checkLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (m < 1 || m > 12) {
            console.warn(`Invalid month [${m}]`);
            return false;
        }
        return day_of_month[m - 1];
    },

    /** get date object "dd/mm/yyyy" => {d, m, y} **/
    getDate(dateString) {
        // length = 10
        if (dateString.length !== 10) return false;

        // get day
        let d = parseInt(dateString.substr(0, 2)),
            m = parseInt(dateString.substr(3, 2)),
            y = parseInt(dateString.substr(6, 4));

        // check year
        if (y < 1 || y > 9999) {
            console.warn(`Invalid year [${y}]. Valid month should from 1 to ${9999}.`);
            return false;
        }

        // check month
        if (m < 1 || m > 12) {
            console.warn(`Invalid month [${m}]. Valid month should from 1 to 12.`);
            return false;
        }

        // check day
        if (d < 1 || d > this.getDaysOfMonth(m, y)) {
            console.warn(`Invalid month [${d}]. Valid month should from 1 to ${this.getDaysOfMonth(m, y)}.`);
            return false;
        }

        return {d: d, m: m, y: y};
    },

    /** date object to number **/
    dateToNumber(dateObject) {
        let days = 0;

        // days from 01/01/0001 to dateObject

        // loop years
        for (let i = 1; i < dateObject.y; i++) {
            days += this.getDaysOfYear(i);
        }

        // loop month
        for (let i = 1; i < dateObject.m; i++) {
            days += this.getDaysOfMonth(i, dateObject.y);
        }

        // get day
        days += dateObject.d;

        return days;
    },

    /** from total days to date object **/
    numberToDate(number) {
        let date = {d: 1, m: 1, y: 1};

        // year
        let nextYearDays = this.getDaysOfYear(date.y + 1),
            thisYearDays = this.getDaysOfYear(date.y);
        while (number > nextYearDays && number > thisYearDays) {
            date.y++;
            number -= thisYearDays;

            // update
            nextYearDays = this.getDaysOfYear(date.y + 1);
            thisYearDays = this.getDaysOfYear(date.y);
        }

        // month
        let nextMonthDays = this.getDaysOfMonth(date.m + 1, date.y),
            thisMonthDays = this.getDaysOfMonth(date.m, date.y);
        while (number > nextMonthDays && number > thisMonthDays) {
            date.m++;
            number -= thisMonthDays;

            // update
            nextMonthDays = this.getDaysOfMonth(Math.min(date.m + 1, 12), date.y);
            thisMonthDays = this.getDaysOfMonth(date.m, date.y);
        }

        date.d = number;

        return date;
    },

    /** format date **/
    format(dateObject) {
        let d = String(dateObject.d).padStart(2, '0'),
            m = String(dateObject.m).padStart(2, '0'),
            y = String(dateObject.y).padStart(4, '0');
        return `${d}/${m}/${y}`;
    }
};

// date object
let date = "01/01/0001",
    dateNumber = DATE.dateToNumber(DATE.getDate(date));

console.log(`${date} => [${dateNumber}]`);
console.log(`[${dateNumber}] => ${DATE.format(DATE.numberToDate(dateNumber))}`);