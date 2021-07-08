$(document).ready(function() {
    function preloaderAnimation(options) {
        //vars
        let setting = $.extend({
            speed: 3,
            oddLineColor: "#000",
            evenLineColor: "#ff0000",
            pause: true,
        }, options),

            $wrapper = $(".preloader"),
            $wrapper_ul = $(".preloader ul"),
            $line_odd = $(".preloader ul li:nth-child(odd)"),
            $line_even = $(".preloader ul li:nth-child(even)"),
            total_line = $(".preloader ul li").length,
            time_delay = 500,
            totalTime = setting.speed * 1000 + time_delay, //total time + speed of transition to move
            time_each_stage = totalTime / 3, //total time for each stage line move
            time_each_odd_line = (2*time_each_stage - 1)/($line_odd.length*($line_odd.length - 1)), //time waiting for each odd line move
            time_each_even_line = (2*time_each_stage - 1)/($line_even.length*($line_even.length - 1)); //time waiting for each even line move


        $line_odd.css("background",setting.oddLineColor);
        $line_even.css("background",setting.evenLineColor);

        let moveToMain = function($el,time) {
            for (let i=$el.length; i>=0; i--) {
                setTimeout(function() {
                    $el.eq(i).css("transform", "translateX(0)");
                }, time*($el.length - i));
            }
        }

        let moveToRight = function($el,time) {
            for (let i=$el.length; i>=0; i--) {
                setTimeout(function() {
                    $el.eq(i).css("transform", "translateX(100%)");
                }, time*($el.length - i));
            }
        }

        if (setting.pause) {
            //move odd line from left to main screen
            moveToMain($line_odd,time_each_odd_line);

            //after 500ms(time delay), line even move to main
            setTimeout(function() {
                moveToMain($line_even, time_each_even_line);
            }, time_delay);

            //do 2 action in the same time
            //background from blue to black after odd line move to main screen and even line move to main screen
            //move even line from main screen to right
            //total time is: 2*time_each_stage - 2*time_delay
            setTimeout(function() {
                $wrapper_ul.css("background", setting.oddLineColor);
                moveToRight($line_even, time_each_even_line);
            }, 2*time_each_stage - 2*time_delay);


            //show main content page
            //total time: speed - transition - time delay
            setTimeout(function() {
                $wrapper.css("opacity","0");
            }, totalTime - 1000 - time_delay);
        } else {
            $wrapper.css("opacity","0");
        }
    }

    let $btn_wrap = $(".button-area"),
        $button_run = $(".button-wrap button.run"),
        $button_hide = $(".button-wrap button.hide");

    $button_run.on("click", function() {
        $btn_wrap.css({
            "opacity":"0",
            "pointer-even":"none",
        })

        setTimeout(function() {
            preloaderAnimation({
                speed: 3,
                oddLineColor: "#000",
                evenLineColor: "#ff0000"
            });
        },1000)
    });

    $button_hide.on("click", function() {
        $btn_wrap.css({
            "opacity":"0",
            "pointer-even":"none",
        })

        setTimeout(function() {
            preloaderAnimation({
                pause:false
            });
        },1000)
    })

})