$(document).ready(function () {
    function loadingAnimation(options) {
        let settings = $.extend({
                wrapper: '', // element wrap lines
                total: 10, // number of lines
                oddBg: 'red', // color code of odd line
                evenBg: 'blue', // color code of even line
                lineStagger: .03, // delay between each line
                lineDuration: .5
            }, options),
            $screenLoading = $(".loading-animation-screen"),
            timeline = gsap.timeline(),
            $oddLines, $evenLines,
            methods = {};

        // if wrapper doesn't exist
        if (!settings.wrapper.length) return;

        // create lines
        for (let i = 0; i < settings.total; i++) {
            let style = `height:${settings.wrapper.height() / settings.total}px;`;
            style += `background-color:${i % 2 === 0 ? settings.oddBg : settings.evenBg}`;
            $(`<div class="line" style="${style}"></div>`).appendTo(settings.wrapper);
        }

        $oddLines = settings.wrapper.find('.line:nth-child(odd)');
        $evenLines = settings.wrapper.find('.line:nth-child(even)');

        // odd show
        // timeline.to( target, {animation}, position );
        timeline.addLabel('oddShow', 0);

        // hide screen loading animation screen
        timeline.to($screenLoading, {autoAlpha: 0}, 0);

        //move odd line to main screen
        // staggerFromTo (oddLine reverse, 0s, {x=-100%}, {x=0})
        timeline.staggerFromTo($oddLines.get().reverse(), settings.lineDuration,
            {x: '-100%'},
            {
                x: 0,
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
            0
        );


        //move even line to main screen
        // staggerFromTo (evenLine reverse, 0.2s, {x=-100%}, {x=0})
        timeline.staggerFromTo($evenLines.get().reverse(), settings.lineDuration,
            {x: '-100%'},
            {
                x: 0,
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
            .2
        );

        // set background for wrapper like background color of even line
        timeline.to(settings.wrapper, {backgroundColor: settings.evenBg, duration: 0});


        //move even line to main screen
        // staggerFromTo (evenLine reverse, after even before run, {x=-100%}, {x=100%})

        timeline.staggerTo($oddLines.get().reverse(), settings.lineDuration,
            {
                x: '100%',
                stagger: function (index) {
                    return (2 * index + 1) * settings.lineStagger;
                }
            },
        );

        // hide wrapper
        timeline.to(settings.wrapper, {autoAlpha: 0, duration: .3});
        // pause timeline
        timeline.pause('oddShow');

        methods.hide = function () {
            timeline.play();
            $(".loading-animation-screen").css({
                "opacity": "0",
                "visibility": "hidden"
            });
            $(".line-animation").css({
                "opacity": "1",
                "visibility": "visible"
            });
        };
        methods.show = function () {
            timeline.pause('oddShow');
            $(".loading-animation-screen").css({
                "opacity": "1",
                "visibility": "visible"
            });
            $(".line-animation").css({
                "opacity": "0",
                "visibility": "hidden"
            });
        };

        return methods;
    }

    /**
     * Usage
     */
    let animation = loadingAnimation({
        wrapper: $('.line-animation-wrapper'),
        total: 20,
        oddBg: 'green',
        evenBg: 'skyblue',
        lineStagger: .04,
        lineDuration: .4
    }), isHide = false;


// #1 hide animation on window load
    animation.hide();
    isHide = true;

// #2

    $("button.run").on("click", function () {
        animation.show();
        isHide = false;
    });

    $("button.hide").on("click", function () {
        animation.hide();
        isHide = true;
    });

})