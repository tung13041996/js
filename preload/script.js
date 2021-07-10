$(document).ready(function () {

    //function show animation of the line
    function loadingAnimation(options) {
        //vars
        let setting = $.extend({
                speed: 3,
                oddLineColor: "#000",
                evenLineColor: "#f00",
            }, options),

            $wrapper = $(".loading"),
            $wrapper_ul = $(".animation-screen ul"),
            $line_odd = $(".animation-screen ul li:nth-child(odd)"),
            $line_even = $(".animation-screen ul li:nth-child(even)"),
            time_delay = 500,
            time_each_stage = (setting.speed * 1000 - time_delay - 1000) / 2; //total time for each stage line move

        //hide shape round loading
        $(".preloader-screen").css({
            "opacity": "0",
            "pointer-events": "none"
        })

        //add background color for line
        $line_odd.css("background", setting.oddLineColor);
        $line_even.css("background", setting.evenLineColor);

        //move line:
        //"in": move to screen
        //"out": mouse out from screen
        let moveLineTo = function (position, $el, time) {
            let time_wait_each_line = (2 * time - 1000) / ($el.length * ($el.length - 1));
            for (let i = ($el.length - 1); i >= 0; i--) {
                setTimeout(function () {
                    //line move to screen
                    if (position === "in") {
                        $el.eq(i).css("transform", "translateX(0)");
                    }
                    //line move out screen
                    else {
                        $el.eq(i).css("transform", "translateX(100%)");
                    }
                }, time_wait_each_line * ($el.length - 1 - i));
            }
        }

        //move odd line from left to main screen
        moveLineTo("in", $line_odd, time_each_stage);

        //after 500ms(time delay), line even move to main
        setTimeout(function () {
            moveLineTo("in", $line_even, time_each_stage);
        }, time_delay)

        //do 2 action in the same time
        //background from blue to black after odd line move to main screen and even line move to main screen
        //move even line from main screen to right
        //total waiting time:  time_each_stage + time_delay
        setTimeout(function () {
            $wrapper_ul.css("background", setting.oddLineColor);
            moveLineTo("out", $line_even, time_each_stage);
        }, (time_each_stage + time_delay));

        //show main content page
        //total waiting time: 2*time_each_stage + 500
        setTimeout(function () {
            $wrapper.css({
                "opacity": "0",
                "pointer-events": "none"
            });
        }, (2 * time_each_stage + 500));
    }


    function runAnimation() {
        //hide first screen has button
        $(".button-area").css({
            "opacity": "0",
            "pointer-events": "none"
        });
    }

    function hideAnimation() {
        //choose option for line to show animation
        loadingAnimation({
            speed: 5,
            oddLineColor: "#000",
            evenLineColor: "#f00",
            pause: true,
        });
    }

    //function to control animation by button
    let controlAnimationByButton = function () {
        let $button_run = $("button.run"),
            $button_hide = $("button.hide");
        $button_run.on("click", function () {
            runAnimation();
        });

        $button_hide.on("click", function () {
            hideAnimation();
        });
    }

    //function to control animation by loading
    let controlAnimationByLoading = function () {
        runAnimation();
        $(window).on("load", function () {
            hideAnimation();
        });
    }

    //init function
    // controlAnimationByButton();
    controlAnimationByLoading();
})