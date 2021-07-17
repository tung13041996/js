$(document).ready(function() {
    let $sliderItems = $(".twc-home-banner .twc-home-banner__slider-item"),
        item_length = $sliderItems.length,
        $dots = $(".twc-home-banner__dots"),
        $buttonNext = $(".twc-home-banner__arrow-next"),
        $buttonPrev = $(".twc-home-banner__arrow-prev"),
        $ball_li = $(".twc-home-banner__dots .ball"),
        time_move = 1,
        spacing_dot = 26, //(size dot + 2*margin)
        currentIndex = 0;

    //set default position for slide (left screen)
    function positionDefaultSlide($ele) {
        gsap.to($ele, {
            x: -1 * $(window).width(),
            duration:0,
        });
    }

    //set status of button
    function statusOfBtn() {
        if (currentIndex===0) {
            $buttonPrev.addClass("disable");
            $buttonNext.removeClass("disable");
        } else if (currentIndex === item_length - 1) {
            $buttonPrev.removeClass("disable");
            $buttonNext.addClass("disable");
        } else {
            $buttonPrev.removeClass("disable");
            $buttonNext.removeClass("disable");
        }
    }

    //add dots
    $("<ul></ul>").appendTo($dots);
    for (let i = 0; i < $sliderItems.length; i++) {
        $("<li></li>").appendTo($dots.find("ul"));
    }

    let $dots_li = $(".twc-home-banner__dots ul li");

    function defaultDot() {
        gsap.to($ball_li, {
            x: currentIndex * spacing_dot,
            duration: 0,
        });
        gsap.to($dots_li.eq(currentIndex), {
            autoAlpha:0,
            duration:0,
        });
    }


    //default screen
    $sliderItems.eq(currentIndex).addClass("current");
    statusOfBtn();
    $sliderItems.each(function() {
        let $this = $(this);
        if (!$this.hasClass("current")) {
            positionDefaultSlide($this);
        }
    });
    defaultDot();




    //function to move to previous slide
    function slideToPrev() {
        let $slideCurrent = $sliderItems.eq(currentIndex),
            $slidePrev = $sliderItems.eq(currentIndex - 1);


        if (currentIndex > 0) {

            /*SLIDER*/
            //slide previous move to right screen
            gsap.to($slidePrev,{
                x: $(window).width(),
                duration:0
            });

            //set previous slider is current slider (z-index bigger)
            $slideCurrent.removeClass("current-slide");
            $slidePrev.addClass("current-slide");

            //move slide previous to main screen
            gsap.to($slidePrev,{
                x: 0,
                duration:time_move,
            });

            //set current slide to default position after slide previous to main screen (1s)
            setTimeout(function() {
                positionDefaultSlide($slideCurrent);
            }, time_move*1000);

            /*DOTS*/
            defaultDot();
            gsap.to($ball_li, {
                x: spacing_dot * (currentIndex - 1),
                duration:time_move,
            });
            gsap.to($dots_li.eq(currentIndex+1), {
                x: spacing_dot,
                duration: time_move,
            });
            setTimeout(function() {
                gsap.to($dots_li.eq(currentIndex), {
                    autoAlpha: 1,
                    duration:0,
                });
                gsap.to($dots_li.eq(currentIndex+1), {
                    autoAlpha:0,
                    x: 0,
                    duration: 0,
                });
            }, time_move*1000)

            //update current slide
            currentIndex -= 1;


        }
        statusOfBtn();
    }

    //function to move to next slide
    function slideToNext() {
        let $slideCurrent = $sliderItems.eq(currentIndex),
            $slideNext = $sliderItems.eq(currentIndex + 1);

        if (currentIndex < item_length - 1) {

            /*SLIDER*/
            //set next slider is current slider (z-index bigger)
            $slideCurrent.removeClass("current-slide");
            $slideNext.addClass("current-slide");

            //move next slide to main screen
            gsap.to($slideNext,{
                x: 0,
                duration:1
            })

            //move current slide to default position after next slide move to main screen (1s)
            setTimeout(function() {
                positionDefaultSlide($slideCurrent);
            }, time_move*1000);

            /*DOTS*/
            defaultDot();
            gsap.to($ball_li, {
                x: spacing_dot * (currentIndex + 1),
                duration:time_move,
            })
            gsap.to($dots_li.eq(currentIndex+1), {
                x: -1 * spacing_dot,
                duration: time_move,
            })

            setTimeout(function() {
                gsap.to($dots_li.eq(currentIndex), {
                    autoAlpha: 1,
                    duration:0,
                });
                gsap.to($dots_li.eq(currentIndex+1), {
                    autoAlpha:0,
                    x: 0,
                    duration: 0,
                });
            }, time_move*1000)


            //update current slide
            currentIndex += 1;
        }
        statusOfBtn();
    }






    //slide when click next button
    $buttonNext.on("click", function() {
        slideToNext();
    })

    $buttonPrev.on("click", function() {
        slideToPrev();
    })



})