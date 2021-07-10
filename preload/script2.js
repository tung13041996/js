function loadingAnimation(options) {
    let settings = $.extend({
            wrapper: '', // jQuery element
            total: 10, // int, number of lines
            oddBg: 'red', // color code of odd line
            evenBg: 'blue', // color code of even line
            lineStagger: .03, // delay between each line
            lineDuration: .5,
            loadingIcon: '.loading-icon'
        }, options),
        timeline = gsap.timeline(),
        $oddLines, $evenLines,
        methods = {};

    // exit
    if (!settings.wrapper.length) return;

    // generate lines
    for (let i = 0; i < settings.total; i++) {
        let style = `height:${settings.wrapper.outerHeight() / settings.total}px;`;
        style += `background-color:${i % 2 === 0 ? settings.oddBg : settings.evenBg}`;
        settings.wrapper.append(`<div class="line" style="${style}"></div>`);
    }
    $oddLines = settings.wrapper.find('.line:nth-child(odd)');
    $evenLines = settings.wrapper.find('.line:nth-child(even)');

    // odd show
    // timeline.to( target, {animation}, position );
    timeline.addLabel('oddShow', 0);

    // hide loading icon
    timeline.to(settings.wrapper.find(settings.loadingIcon), {autoAlpha: 0}, 0);

    //timeline.to($oddLines, {x: 0}, 0);
    // staggerFromTo (targets, duration, {}, {}, position)
    timeline.staggerFromTo($oddLines.get().reverse(), settings.lineDuration,
        {x: '-100%'},
        {x: 0},
        {each: settings.lineStagger},// https://greensock.com/docs/v3/Staggers
        0
    );


    // even show
    //timeline.to($evenLines, {x: 0}, .2);
    timeline.staggerFromTo($evenLines.get().reverse(), settings.lineDuration,
        {x: '-100%'},
        {x: 0},
        {each: settings.lineStagger},
        .2
    );

    // odd close
    timeline.to(settings.wrapper, {backgroundColor: settings.oddBg, duration: 0});
    //timeline.to($oddLines, {x: '100%'});
    timeline.staggerTo($oddLines.get().reverse(), settings.lineDuration,
        {x: '100%'},
        {each: settings.lineStagger}
    );

    // hide wrapper
    timeline.to(settings.wrapper, {autoAlpha: 0, duration: .3});


    // pause timeline
    timeline.pause('oddShow');


    // tween
    /* gsap.to(settings.wrapper.find('.line:nth-child(odd)'), {x: 0}); //// tween 1 => 0
     gsap.to(settings.wrapper.find('.line:nth-child(even)'), {x: 0});// tween 2 => 0*/

    // dev tools
    //GSDevTools.create();

    methods.hide = function () {
        timeline.play();
    };
    methods.show = function () {
        timeline.pause('oddShow');
    };

    return methods;
}

/**
 * Usage
 */
let animation = loadingAnimation({
    wrapper: $('#blinds-loading-animation'),
    total: 20,
    lineStagger: .05,
    lineDuration: .4
}), isHide = false;

// #1 hide animation on window load
animation.hide();
isHide = true;

// #2
$('#trigger').click(function () {
    if (isHide) {
        animation.show();
        isHide = false;
    } else {
        animation.hide();
        isHide = true;
    }
});
