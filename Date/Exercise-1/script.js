$(document).ready(function () {
    //Check year is leap year?
    let checkLeapYear = function(y) {
        return (y % 4 === 0 && y % 100 !==0) || y % 400 === 0;
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

    //find day of the year
    let dayOfWeek = function(d,m,y) {
        let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            n;
        if (m<3) {m += 12; y--;}
        n = (d + 2*m + Math.floor((3*(m+1))/5) + y + Math.floor(y/4)) % 7;
        return day[n];
    }

    //find "can" "chi"
    let lunarCalendar = function(y) {
        let can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"],
            chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"],
            index_can = y % 10,
            index_chi = y % 12;
        return can[index_can] + " " + chi[index_chi];
    }

    //find zodiac
    let findZodiac = function(d,m) {
        let zodiac_vn = ["Bảo Bình", "Song Ngư", "Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải", "Sư Tử", "Xử Nữ", "Thiên Bình", "Thiên Yết", "Nhân Mã", "Ma Kết"],
            zodiac_en = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"],
            n;
        switch (m) {
            case 2:
                if (d<19) {n=0;} else {n=1}
                break;
            case 3:
                if (d<21) {n=1;} else {n=2}
                break;
            case 4:
                if (d<20) {n=2;} else {n=3}
                break;
            case 5:
                if (d<21) {n=3;} else {n=4}
                break;
            case 6:
                if (d<22) {n=4;} else {n=5}
                break;
            case 7:
                if (d<23) {n=5;} else {n=6}
                break;
            case 8:
                if (d<23) {n=6;} else {n=7}
                break;
            case 9:
                if (d<23) {n=7;} else {n=8}
                break;
            case 10:
                if (d<23) {n=8;} else {n=9}
                break;
            case 11:
                if (d<23) {n=9;} else {n=10}
                break;
            case 12:
                if (d<22) {n=10;} else {n=11}
                break;

            default:
                if (d < 20) {n=11;} else {n=0;}
        }

        return zodiac_vn[n] + "(" + zodiac_en[n] + ")";
    }

    //find date of month
    let dateOfMonth = function(d,m,y) {
        let n;
        if (checkLeapYear(y)) {n=29;} else {n=28}
        let day_of_month = [31,n,31,30,31,30,31,31,30,31,30,31];
        return day_of_month[m-1];
    }

    //find date of year
    let dateOfYear = function(d,m,y) {
        let result = 0;
        for (let i=1; i<m; i++) {
            console.log("Tháng " + i + " có: " + dateOfMonth(d,i, y) + " ngày.");
            result += dateOfMonth(d,i, y);
        }
        console.log("Tháng " + m + " có: " + d + " ngày.");
        result += d;
        console.log("==> Có tổng cộng: " + result + " ngày.")
        return result;
    }


    //Doing exercise
    let $screen_check_value = $('.input-value #result'),
        $exercise = $('.exercise'),
        $input_box = $(".input-value input"),
        day, month, year;

    //hide Exercises, only hide when input correct value
    $exercise.addClass("hide");

    //input value and check it immediately
    $input_box.on("change keyup", function() {
        let value_input = $('.input-value label input').val(),
            length = value_input.length,
            fYear = "";

        //get day value
        day = parseInt(value_input[0] + value_input[1]);

        //get month value
        month = parseInt(value_input[3] + value_input[4]);

        //get year value
        for (let i=length-1; i>= length - 4; i--) {fYear = value_input[i] + fYear;}
        year = parseInt(fYear);

        //function to show result if input value is correct
        let showPropertyForCorrectValue = function() {
            $screen_check_value.addClass('green correct');
            $screen_check_value.removeClass('red');
            $screen_check_value.html("Correct value");
            $exercise.removeClass("hide");
            $exercise.addClass("show");
        }

        //function to show result if input value is wrong
        let showPropertyForWrongValue = function() {
            $screen_check_value.removeClass('green');
            $screen_check_value.removeClass('correct');
            $screen_check_value.addClass('red');
            $exercise.addClass("hide");
            $exercise.removeClass("show");
        }

        // check input value
        if (length===0) {$screen_check_value.html("Please input value");}
        else if (length<10) {
            $screen_check_value.html("Please input value fully");
            showPropertyForWrongValue();
        } else if (length>10) {
            $screen_check_value.html("Input value is not correct format");
            showPropertyForWrongValue();
        } else {
            //if input value is correct
            if (checkInputValue(day,month,year)) {
                showPropertyForCorrectValue();
            } else {
                $screen_check_value.html("!!Wrong value, please input again");
                showPropertyForWrongValue();
            }
        }

        let objectResult = [
            {
                locate : $(".exercise #result-1"),
                result: day + "/" + month + "/" + year + " is: " + dayOfWeek(day,month,year)
            },
            {
                locate : $(".exercise #result-2"),
                result: "Year " + year + " in Lunar Calendar in ASIA is: " + lunarCalendar(year)
            },
            {
                locate : $(".exercise #result-3"),
                result: "People who born in " + day + "/" + month + " were: " + findZodiac(day,month)
            },
            {
                locate : $(".exercise #result-4"),
                result: checkLeapYear(year)
                    ? "Because " + year + "%4 === 0 and " + year + "% 100 !==0, so year " + year + " is a leap year"
                    : "Because " + year + "%4 != 0, so year " + year + " is not a leap year"
            },
            {
                locate : $(".exercise #result-5"),
                result: "From 1/1/" + year + " to " + day + "/" + month + "/" + year + ", it has total:"
                    + dateOfYear(day,month,year) + " days"
            },
            {
                locate : $(".exercise #result-6"),
                result: "Month " + month + "/" + year + " has: " + dateOfMonth(day,month,year) + " days"
            },

        ]

        if ($screen_check_value.hasClass('correct')) {
            for (let i=0; i<objectResult.length; i++) {
                objectResult[i].locate.html(objectResult[i].result);
            }
        }
        else {$exercise.removeClass("show"); $exercise.addClass("hide");}
    });
})