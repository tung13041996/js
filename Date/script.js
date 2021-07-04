$(document).ready(function () {
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

        /** get total date from the begin of current year to current day **/
        getTotalDayOfYear(d, m, y) {
            let result = 0;
            console.log("Từ ngày 1/1/" + y + " đến ngày " + `${d}/${m}/${y}:`);
            for (let i = 1; i < m; i++) {
                result += this.getDaysOfMonth(i, y);
                console.log("Tháng " + i + " có: " + this.getDaysOfMonth(i, y) + " ngày.");
            }
            console.log("Tháng " + m + " có: " + d + " ngày.");
            result += d;
            console.log("==> Có tổng cộng: " + result + " ngày.")
            return result;
        },

        /** get date of a week **/
        getDayOfWeek(d, m, y) {
            let day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                n = 0;
            if (m < 3) {
                m += 12;
                y--;
            }
            n = (d + 2 * m + Math.floor((3 * (m + 1)) / 5) + y + Math.floor(y / 4)) % 7;
            return day_of_week[n];
        },

        /** get lunar calendar **/
        getLunarCalendar(y) {
            let can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"],
                chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
            return can[y % 10] + " " + chi[y % 12];
        },

        /** get zodiac **/
        getZodiac(d, m) {
            let zodiac_vn = ["Bảo Bình", "Song Ngư", "Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", "Sư Tử", "Xử Nữ", "Thiên Bình", "Thiên Yết", "Nhân Mã", "Ma Kết"],
                zodiac_en = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"],
                n = 0;
            switch (m) {
                case 2:
                    if (d < 19) {
                        n = 0;
                    } else {
                        n = 1
                    }
                    break;
                case 3:
                    if (d < 21) {
                        n = 1;
                    } else {
                        n = 2
                    }
                    break;
                case 4:
                    if (d < 20) {
                        n = 2;
                    } else {
                        n = 3
                    }
                    break;
                case 5:
                    if (d < 21) {
                        n = 3;
                    } else {
                        n = 4
                    }
                    break;
                case 6:
                    if (d < 22) {
                        n = 4;
                    } else {
                        n = 5
                    }
                    break;
                case 7:
                    if (d < 23) {
                        n = 5;
                    } else {
                        n = 6
                    }
                    break;
                case 8:
                    if (d < 23) {
                        n = 6;
                    } else {
                        n = 7
                    }
                    break;
                case 9:
                    if (d < 23) {
                        n = 7;
                    } else {
                        n = 8
                    }
                    break;
                case 10:
                    if (d < 23) {
                        n = 8;
                    } else {
                        n = 9
                    }
                    break;
                case 11:
                    if (d < 23) {
                        n = 9;
                    } else {
                        n = 10
                    }
                    break;
                case 12:
                    if (d < 22) {
                        n = 10;
                    } else {
                        n = 11
                    }
                    break;

                default:
                    if (d < 20) {
                        n = 11;
                    } else {
                        n = 0;
                    }
            }

            return zodiac_vn[n] + "(" + zodiac_en[n] + ")";
        },

        /** get date object "dd/mm/yyyy" => {d, m, y} **/
        getDate(dateInString) {
            // (01/01/2000) => correct value has 10 letters

            // length of input value != 10 => not input value
            if (dateInString.length !== 10) return false;

            // get value: day, month, year if correct value
            let d = parseInt(dateInString.substr(0, 2)),
                m = parseInt(dateInString.substr(3, 2)),
                y = parseInt(dateInString.substr(6, 4));

            // check year is correct?
            if (y < 1 || y > 9999) {
                console.warn(`Invalid year [${y}]. Valid month should from 1 to ${9999}.`);
                return false;
            }

            // check month is correct?
            if (m < 1 || m > 12) {
                console.warn(`Invalid month [${m}]. Valid month should from 1 to 12.`);
                return false;
            }

            // check day is correct?
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

            // loop years to get total day from  1 to year-1
            for (let i = 1; i < dateObject.y; i++) {
                days += this.getDaysOfYear(i);
            }

            // loop month: get day in current year
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

            // get year from number
            let nextYearDays = this.getDaysOfYear(date.y + 1),
                thisYearDays = this.getDaysOfYear(date.y);
            while (number > nextYearDays && number > thisYearDays) {
                date.y++;
                number -= thisYearDays;

                // update
                nextYearDays = this.getDaysOfYear(date.y + 1);
                thisYearDays = this.getDaysOfYear(date.y);
            }

            // get month from remain day
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

    let resultProperty = {
        /** function to show result if input value is correct **/
        showPropertyForCorrectValue() {
            $screen_check_value.addClass('green correct');
            $screen_check_value.removeClass('red');
            $screen_check_value.html("Correct value");
            $exercise.removeClass("hide");
            $exercise.addClass("show");
        },

        /** function to show result if input value is wrong **/
        showPropertyForWrongValue() {
            $screen_check_value.removeClass('green');
            $screen_check_value.removeClass('correct');
            $screen_check_value.addClass('red');
            $exercise.addClass("hide");
            $exercise.removeClass("show");
        }
    }

    //Doing exercise
    let $screen_check_value = $('#result'), //text show input value is correct or wrong
        $exercise = $('.exercise'),
        $input_box = $(".input-value input");

    //hide Exercises, only hide when input correct value
    $exercise.addClass("hide");

    //input value and check it immediately
    $input_box.on("change keyup", function () {
        let value_input = $('.input-value label input').val(),
            length = value_input.length,
            day, month, year;


        // when not input value
        if (length === 0) {
            $screen_check_value.html("Please input value");
        }

        // when input value enough 10 letters
        else if (length < 10) {
            $screen_check_value.html("Please input value fully");
            resultProperty.showPropertyForWrongValue();
        }

        //when input value more than 10 letters
        else if (length > 10) {
            $screen_check_value.html("Input value is not correct format");
            resultProperty.showPropertyForWrongValue();
        }

        //when input value is correct
        else {
            //if input value is correct
            resultProperty.showPropertyForCorrectValue();
            day = DATE.getDate(value_input).d;
            month = DATE.getDate(value_input).m;
            year = DATE.getDate(value_input).y;
        }

        //object to hold value day, month, year
        let objectDay = {d: day, m: month, y: year};

        //object to hold result
        let objectResult = [
            {
                locate: $(".exercise #result-1"),
                result: day + "/" + month + "/" + year + " is: " + DATE.getDayOfWeek(day, month, year)
            },
            {
                locate: $(".exercise #result-2"),
                result: "Year " + year + " in Lunar Calendar in ASIA is: " + DATE.getLunarCalendar(year)
            },
            {
                locate: $(".exercise #result-3"),
                result: "People who born in " + day + "/" + month + " were: " + DATE.getZodiac(day, month)
            },
            {
                locate: $(".exercise #result-4"),
                result: DATE.checkLeapYear(year)
                    ? "Because " + year + "%4 === 0 and " + year + "% 100 !==0, so year " + year + " is a leap year"
                    : "Because " + year + "%4 != 0, so year " + year + " is not a leap year"
            },
            {
                locate: $(".exercise #result-5"),
                result: "From 1/1/" + year + " to " + day + "/" + month + "/" + year + ", it has total: "
                    + DATE.getTotalDayOfYear(day, month, year) + " days"
            },
            {
                locate: $(".exercise #result-6"),
                result: "Month " + month + "/" + year + " has: " + DATE.getDaysOfMonth(month, year) + " days"
            },
            {
                locate: $(".exercise #result-7"),
                result: "The next day of " + `${DATE.format(objectDay)}` + " is: "
                    + DATE.format(DATE.numberToDate(DATE.dateToNumber(objectDay) + 1))
            },

            {
                locate: $(".exercise #result-8"),
                result: "The day before  of " + `${DATE.format(objectDay)}` + " is: "
                    + DATE.format(DATE.numberToDate(DATE.dateToNumber(objectDay) - 1))
            },

        ]

        //loop: to show result
        if ($screen_check_value.hasClass('correct')) {
            for (let i = 0; i < objectResult.length; i++) {
                objectResult[i].locate.html(objectResult[i].result);
            }
        } else {
            $exercise.removeClass("show");
            $exercise.addClass("hide");
        }
    });
})