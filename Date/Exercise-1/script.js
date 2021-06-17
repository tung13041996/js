$(document).ready(function () {
    //Check year is leap year?
    let checkLeapYear = function(y) {
        return y % 4 === 0;
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
                if (d<19) {n=0;} else {n=1};
                break;
            case 3:
                if (d<21) {n=1;} else {n=2};
                break;
            case 4:
                if (d<20) {n=2;} else {n=3};
                break;
            case 5:
                if (d<21) {n=3;} else {n=4};
                break;
            case 6:
                if (d<22) {n=4;} else {n=5};
                break;
            case 7:
                if (d<23) {n=5;} else {n=6};
                break;
            case 8:
                if (d<23) {n=6;} else {n=7};
                break;
            case 9:
                if (d<23) {n=7;} else {n=8};
                break;
            case 10:
                if (d<23) {n=8;} else {n=9};
                break;
            case 11:
                if (d<23) {n=9;} else {n=10};
                break;
            case 12:
                if (d<22) {n=10;} else {n=11};
                break;

            default:
                if (d < 20) {n=11;} else {n=0;}
        }

        return zodiac_vn[n] + "(" + zodiac_en[n] + ")";
    }

    //find date of month
    let dateOfMonth = function(d,m,y) {
        let n;
        if (checkLeapYear(y)) {n=29;} else {n=28};
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
    let $button_check_value = $('.input-value--type button'),
        $screen_check_value = $('.input-value #result'),
        $exercise = $('.exercise'),
        day, month, year;

    //hide Exercises, only hide when input correct value
    $exercise.addClass("hide");

    //click button "check input value" to check input value is right or wrong
    $button_check_value.on("click", function() {
        let value_input = $('.input-value label input').val(),
            length = value_input.length,
            fYear = "";
            day = parseInt(value_input[0] + value_input[1]); //get day
            month = parseInt(value_input[3] + value_input[4]); //get month
        for (let i=length-1; i>= length - 4; i--) {fYear = value_input[i] + fYear;}
        year = parseInt(fYear); //get year

        if (length===0) {$screen_check_value.html("Please input value");}
        else {
            //if input value is correct
            if (checkInputValue(day,month,year)) {
                $screen_check_value.addClass('green');
                $screen_check_value.removeClass('red');
                $screen_check_value.html("Correct value");
                $exercise.removeClass("hide");
                $exercise.addClass("show");
            } else {
                $screen_check_value.removeClass('green');
                $screen_check_value.addClass('red');
                $screen_check_value.html("!!Wrong value, please input again");
                $exercise.addClass("hide");
                $exercise.removeClass("show");
            }
        }

        //do exercise 1 - Find day of week
        let $show_result_ex_1 = $(".exercise #result-1 "),
            $button_ex1 = $(".exercise.one button");
        $button_ex1.on("click", function() {
            let $result = day + "/" + month + "/" + year + " is: " + dayOfWeek(day,month,year);
            $show_result_ex_1.html($result);
        })

        //do exercise 1 - Find Lunar calendar
        let $show_result_ex_2 = $(".exercise #result-2 "),
            $button_ex2 = $(".exercise.two button");
        $button_ex2.on("click", function() {
            let $result = "Year " + year + " in Lunar Calendar in ASIA is: " + lunarCalendar(year);
            $show_result_ex_2.html($result);
        });

        //do exercise 3 - Find Zodiac
        let $show_result_ex_3 = $(".exercise #result-3 "),
            $button_ex3 = $(".exercise.three button");
        $button_ex3.on("click", function() {
            let $result = "People who born in " + day + "/" + month + " were: " + findZodiac(day,month);
            $show_result_ex_3.html($result);
        });

        //do exercise 4 - is leap year
        let $show_result_ex_4 = $(".exercise #result-4 "),
            $button_ex4 = $(".exercise.four button");
        $button_ex4.on("click", function() {
            let $result = "";
            if (checkLeapYear(year)) {
                $result = "Because " + year + "%4 === 0, so year " + year + " is a leap year";
            } else {
                $result = "Because " + year + "%4 != 0, so year " + year + " is not a leap year";
            }
            $show_result_ex_4.html($result);
        });

        //do exercise 5 - Find total day in year
        let $show_result_ex_5 = $(".exercise #result-5 "),
            $button_ex5 = $(".exercise.five button");
        $button_ex5.on("click", function() {
            let $result = "From 1/1/" + year + " to " + day + "/" + month + "/" + year + ", it has total:"
                + dateOfYear(day,month,year) + " days";
            $show_result_ex_5.html($result);
        });

        //do exercise 6 - Find total day in year
        let $show_result_ex_6 = $(".exercise #result-6 "),
            $button_ex6 = $(".exercise.six button");
        $button_ex6.on("click", function() {
            let $result = "Month " + month + "/" + year + " has: " + dateOfMonth(day,month,year) + " days";
            $show_result_ex_6.html($result);
        });
    })
})