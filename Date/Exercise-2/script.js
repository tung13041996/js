$(document).ready(function () {
    //Check year is leap year?
    let checkLeapYear = function(y) {
        return y % 4 === 0;
    }

    //find date of month
    let dayOfMonth = function(d,m,y) {
        let t;
        if (checkLeapYear(y)) {t=29;} else {t=28};
        //array all days of a month
        let day_of_month = [31,t,31,30,31,30,31,31,30,31,30,31];
        return day_of_month[m-1];
    }

    //find date of year
    let dayOfYear = function(d,m,y) {
        let result = 0;
        for (let i=1; i<m; i++) {
            result += dayOfMonth(d,i, y);
        }
        result += d;
        return result;
    }

    //change input date to total day from 1/1/0
    let changeToDay = function(d,m,y) {
        let total = 0;
        for (let i=1; i<y; i++) {
            if (checkLeapYear(m)) {total += 366;} else {total += 365;}
        }

        total += dayOfYear(d,m,y);
        return total;
    }

    //Compare date by operator
    let isDate = function(d1,m1,y1,operator,d2,m2,y2) {
        let total_day_1 = changeToDay(d1,m1,y1),
            total_day_2 = changeToDay(d2,m2,y2),
            result = "";

        switch (operator) {
            case "!=":
                if (total_day_1 !== total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
                break;
            case ">":
                if (total_day_1 > total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
                break;
            case "<":
                if (total_day_1 < total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
                break;
            case ">=":
                if (total_day_1 >= total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
                break;
            case "<=":
                if (total_day_1 <= total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
                break;
            default:
                if (total_day_1 === total_day_2) {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> true.";
                } else {
                    result = "'" + d1 + "/" + m1 + "/" + y1 + "', " + "'" + operator +
                        "', " + "'" + d2 + "/" + m2 + "/" + y2 + "'  ==> false.";
                }
        }

        return result;
    }

    let getDateDistance = function (d1,m1,y1,d2,m2,y2) {
        let total_day_1 = changeToDay(d1,m1,y1),
            total_day_2 = changeToDay(d2,m2,y2);

        return (total_day_2 - total_day_1);
    }

    //check input value is correct
    let checkInputValue = function(d,m,y) {
        if ((d > 31) || (m > 12)) {return false;}
        else if (d === 31) {
            return (m === 1) || (m === 3) || (m === 5) || (m === 7) || (m === 8) || (m === 10) || (m === 12);
        } else if (d===30) {
            return (m === 4) || (m === 6) || (m === 9) || (m === 11);
        } else if (d===29) {
            return (m===2) && checkLeapYear(y);
        } else {return true;}
    }


    //Doing exercise
    let $button_check_value = $('.button_check'),
        $screen_check_value_1 = $('#result-date-1'),
        $screen_check_value_2 = $('#result-date-2'),
        $exercise = $('.exercise'),
        day_1, month_1, year_1,
        day_2, month_2, year_2;

    //hide Exercises, only hide when input correct value
    $exercise.addClass("hide");

    //click button "check input value" to check input value is right or wrong
    $button_check_value.on("click", function() {
        let value_input_1 = $('.input-value.first label input').val(),
            value_input_2 = $('.input-value.second label input').val(),
            length = value_input_1.length,
            fYear_1 = "", fYear_2 = "";
        day_1 = parseInt(value_input_1[0] + value_input_1[1]); //get day
        month_1 = parseInt(value_input_1[3] + value_input_1[4]); //get month
        day_2 = parseInt(value_input_2[0] + value_input_2[1]); //get day
        month_2 = parseInt(value_input_2[3] + value_input_2[4]); //get month
        for (let i = length - 1; i >= length - 4; i--) {
            fYear_1 = value_input_1[i] + fYear_1;
            fYear_2 = value_input_2[i] + fYear_2;
        }
        year_1 = parseInt(fYear_1); //get year
        year_2 = parseInt(fYear_2); //get year

        if (length===0) {$screen_check_value_1.html("Please input value");}
        else {
            //if input value is correct
            if (checkInputValue(day_1,month_1,year_1) && (checkInputValue(day_2,month_2,year_2))) {
                $screen_check_value_1.addClass('green');
                $screen_check_value_1.removeClass('red');
                $screen_check_value_1.html("Correct value");
                $screen_check_value_2.addClass('green');
                $screen_check_value_2.removeClass('red');
                $screen_check_value_2.html("Correct value");
                $exercise.removeClass("hide");
                $exercise.addClass("show");
            } else if (checkInputValue(day_1,month_1,year_1) && !checkInputValue(day_2,month_2,year_2)) {
                $screen_check_value_1.addClass('green');
                $screen_check_value_1.removeClass('red');
                $screen_check_value_1.html("Correct value");
                $screen_check_value_2.addClass('red');
                $screen_check_value_2.removeClass('blue');
                $screen_check_value_2.html("!!Wrong value, please input again");
                $exercise.addClass("hide");
                $exercise.removeClass("show");
            } else if (checkInputValue(day_2,month_2,year_2) && !checkInputValue(day_1,month_1,year_1)) {
                $screen_check_value_2.addClass('green');
                $screen_check_value_2.removeClass('red');
                $screen_check_value_2.html("Correct value");
                $screen_check_value_1.addClass('red');
                $screen_check_value_1.removeClass('blue');
                $screen_check_value_1.html("!!Wrong value, please input again");
                $exercise.addClass("hide");
                $exercise.removeClass("show");
            } else {
                $screen_check_value_1.removeClass('green');
                $screen_check_value_1.addClass('red');
                $screen_check_value_1.html("!!Wrong value, please input again");
                $screen_check_value_2.removeClass('green');
                $screen_check_value_2.addClass('red');
                $screen_check_value_2.html("!!Wrong value, please input again");
                $exercise.addClass("hide");
                $exercise.removeClass("show");
            }
        }

        //do exercise 1 - Find day of week
        let $show_result_ex_1 = $(".exercise #result-1 "),
            $button_ex1 = $(".exercise.one button");
        $button_ex1.on("click", function() {
            let result = "",
                operator_object = ["==", "!=", ">=", "<=", ">", "<"]
            for (let i=0; i<operator_object.length; i++) {
                result += isDate(day_1, month_1,year_1,operator_object[i],day_2,month_2,year_2) + "</br>";
            }
            $show_result_ex_1.html(result);
        })

        //do exercise 2 - Get distance between date 1 and date 2
        let $show_result_ex_2 = $(".exercise #result-2 "),
            $button_ex2 = $(".exercise.two button");
        $button_ex2.on("click", function() {
            let result = "getDateDistance('" + day_1 + "/" + month_1 + "/" + year_1 + "', " +
                "'" + day_2 + "/" + month_2 + "/" + year_2 + "') = " + getDateDistance(day_1,month_1,year_1,day_2,month_2,year_2);
            $show_result_ex_2.html(result);
        })

        //do exercise 3 - Case of date
        let $show_result_ex_3 = $(".exercise #result-3 "),
            $button_ex3 = $(".exercise.three button");
        $button_ex3.on("click", function() {
            let result = "";
            $show_result_ex_2.html(result);
        })
    })
})


