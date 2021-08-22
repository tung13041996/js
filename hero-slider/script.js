$(document).ready(function () {
    let $buttonNext = $(".twc-home-banner__arrow-next"),
        $buttonPrev = $(".twc-home-banner__arrow-prev");

    $buttonPrev.addClass("disable");

    function plugin(options) {
        let settings = $.extend({
                wrapper: '',
                speed: 700,
                defaultIndex: 0
            }, options),
            method = {};

        // if wrapper doesn't exist
        if (!settings.wrapper.length) return;

        let $sliderItems = settings.wrapper.find('.twc-home-banner__slider-item'),
            item_length = $sliderItems.length,
            $dots = settings.wrapper.find(".twc-home-banner__dots"),
            $ball = settings.wrapper.find(".ball");


        //add dots
        $("<ul></ul>").appendTo($dots);
        for (let i = 0; i < $sliderItems.length; i++) {
            $("<li></li>").appendTo($dots.find("ul"));
        }

        let $dots_li = settings.wrapper.find(".twc-home-banner__dots ul li"),
            spacing_dot = 26;

        gsap.to($dots_li.eq(settings.defaultIndex), {
            autoAlpha: 0,
            duration: 0,
        });

        function moveTo(isNext, index) {
            index = Math.max(0, Math.min(item_length - 1, index));

            //update status of button: disable or not
            if (index === 0) {
                $buttonPrev.addClass("disable");
                $buttonNext.removeClass("disable");
            } else if (index === item_length - 1) {
                $buttonPrev.removeClass("disable");
                $buttonNext.addClass("disable");
            } else {
                $buttonPrev.removeClass("disable");
                $buttonNext.removeClass("disable");
            }

            let last_index = isNext ? index - 1 : index + 1;

            // skip if move to duplicated slides
            if (settings.defaultIndex === index) return;


            //update current index
            settings.defaultIndex = index;

            // get slides
            let $lastSlide = $sliderItems.eq(last_index),
                $newSlide = $sliderItems.eq(index);

            // update position for the new slide
            gsap.fromTo($newSlide,
                {
                    x: isNext ? '-100%' : '100%',
                },
                {
                    x: 0,
                    duration: settings.speed / 1000,
                }
            );

            // update z index
            gsap.set($sliderItems, {zIndex: 1});
            gsap.set($lastSlide, {zIndex: 2});
            gsap.set($newSlide, {zIndex: 3});


            //dot animation
            // ball move
            gsap.to($ball, {
                x: index * spacing_dot + "px",
                rotate: `${index * 90}deg`,
                duration: settings.speed / 1000,
            });
            gsap.to($dots_li.eq(index), {
                x: isNext ? -1 * spacing_dot : spacing_dot + "px",
                duration: settings.speed / 1000,
            });
            setTimeout(function () {
                gsap.to($dots_li.eq(index), {
                    autoAlpha: 0,
                    duration: 0,
                });
                gsap.to($dots_li.eq(last_index), {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0,
                });
            }, settings.speed);
        }

        method.next = function () {
            moveTo(true, settings.defaultIndex + 1);
        }
        method.prev = function () {
            moveTo(false, settings.defaultIndex - 1);
        }

        return method;
    }

    let result = plugin({
        wrapper: $('.twc-home-banner'),
        speed: 1000,
        defaultIndex: 0,
    });

    $buttonNext.on("click", function () {
        result.next();
    });
    $buttonPrev.on("click", function () {
        result.prev();
    });
})