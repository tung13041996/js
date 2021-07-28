$(document).ready(function() {
    let timeline = gsap.timeline(),
        object = {
            position: [0,25,70,100],
            dark_layout: $(".loading .layout-dark"),
            light_layout: $(".loading .loading-wrapper"),
            total_time: 3, //(s)
            delay_time: 0.2, //(s)
        },
        time_each_state = (object.total_time - (object.position.length - 1)*object.delay_time)/object.position.length,
        start = object.position[0];


    //add percent to loading
    $("<span class=percent>" + start + "</span><span><sup>%</sup></span>").appendTo($(".text-black"));


    for (let i=1; i<=object.position.length - 1; i++) {
        timeline.fromTo(object.dark_layout,
            {
                x: start + "%",
            },
            {
                x:object.position[i] + "%",
                duration: time_each_state,
            },
            object.delay_time,
        );
        // for (let j=start; j<=object.position[i]; j++) {$(".loading .percent").html(j);}
        start = object.position[i];
    }

    // dev tools
    // GSDevTools.create();

    //timeline 4:
    // timeline.fromTo(object.light_layout,
    //     {
    //         x:object.position[0] + "%",
    //     },
    //     {
    //         x:object.position[object.position.length - 1] + "%",
    //         duration: time_each_state,
    //         ease: "linear",
    //     }
    // );

    //4 time lines:
    //timeline 1: 0 -->20% : 0.6s (time/5) || delay: 0.2s (time/10)            => total 4*time/15 (0.8s)
    //timeline 2: 20% --> 75%: 0.6s (time/5) || delay: 0.2s (time/10)          => total 4*time/15 (0.8s)
    //timeline 3: 75% --> 100%: 0.6s (time/5) || delay: 0.2s (time/10)         => total 4*time/15 (0.8s)
    //timeline 4: light laout move left to right: 0.6s (times/5)

})