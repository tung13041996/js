$(document).ready(function () {
    let exerciseOne = function () {
        let $area = $(".area-wrap"), //area around button
            $button = $area.find("a.btn"), //button which move to mouse when hover area
            limit_x = ($button.width() - $area.width()) / 2, // spacing from button to area in axis-x
            limit_y = ($button.height() - $area.height()) / 2; // spacing from button to area in axis-y

        //hover to the area => button move to mouse
        $area.on("mousemove", function (e) {
            let x = e.pageX - $(this).position().left + limit_x - $button.width() / 2, //spacing between button and mouse in axis-x
                y = e.pageY - $(this).position().top + limit_y - $button.height() / 2; //spacing between button and mouse in axis-y
            gsap.to($button, {
                x: x,
                y: y,
                duration: 1
            });
        });

        //hover out to the area => button move to middle of box
        $area.on("mouseout", function (e) {
            gsap.to($button, {
                x: 0,
                y: 0,
                duration: .8
            });
        });
    }

    let exerciseTwo = function () {
        let $button = $(".exercise-two .btn-2");
        const r = 100, //max spacing between middle of button and mouse to button move to mouse
            button_x = $button.offset().left + $button.width() / 2, //position of middle of button in axis-x
            button_y = $button.offset().top + $button.height() / 2; //position of middle of button in axis-y

        $(window).on("mousemove", function (e) {
            let mouse_x = e.pageX,
                mouse_y = e.pageY,
                //spacing from middle of button and mouse
                distance = Math.sqrt(Math.pow((button_x - mouse_x), 2) + Math.pow((button_y - mouse_y), 2)),
                transformX = 0, transformY = 0;

            if (distance <= r) {
                transformX = (mouse_x - button_x) * .4; //spacing to move button to mouse in axis-x
                transformY = (mouse_y - button_y) * .6 * $button.height() / $button.width(); //spacing to move button to mouse in axis-y
            }

            gsap.to($button, {
                x: transformX,
                y: transformY,
                duration: .5
            });
        });
    }

    let exerciseThree = function () {
        let $button = $(".exercise-three .btn-3");
        const r = 80,
            button_x = $button.offset().left + $button.width() / 2,
            button_y = $button.offset().top + $button.height() / 2;

        $(window).on("mousemove", function (e) {
            let mouse_x = e.pageX,
                mouse_y = e.pageY,
                distance = Math.sqrt(Math.pow((button_x - mouse_x), 2) + Math.pow((button_y - mouse_y), 2)),
                transformX = 0, transformY = 0, scale = 1;

            if (distance <= r) {
                transformX = (mouse_x - button_x) * .4;
                transformY = (mouse_y - button_y) * .6 * $button.height() / $button.width();
                scale = 1.3;
            }

            gsap.to($button, {
                x: transformX,
                y: transformY,
                scale: scale,
                duration: .5
            });
        });
    }

    let exerciseFour = function () {
        let $mouse = $(".round-mouse"), //round shape move to mouse
            $point = $(".point"), //point move to mouse
            $li = $(".exercise-four ul li a"); //menu item

        //the mouse move in window => round shape move to mouse
        $(window).on("mousemove", function (e) {
            let x_round = e.pageX - $mouse.outerWidth() / 2, //position of round when mouse move in window in axis-x
                y_round = e.pageY - $mouse.outerHeight() / 2, //position of round when mouse move in window in axis-y
                x_point = e.pageX - $point.width() / 2, //position of point when mouse move in window in axis-x
                y_point = e.pageY - $point.height() / 2, //position of point when mouse move in window in axis-y
                scale = 1; //size of round shape

            $li.each(function () {
                let $this_li = $(this),
                    li_x_small = $this_li.offset().left, //position left of button in axis-x
                    li_x_big = $this_li.offset().left + $this_li.outerWidth(), //position right of button in axis-x
                    li_y_small = $this_li.offset().top, //position top of button in axis-y
                    li_y_big = $this_li.offset().top + $this_li.outerHeight(); //position bottom of button in axis-y

                //check mouse inside the button
                if (x_round >= li_x_small && x_round <= li_x_big && y_round >= li_y_small && y_round <= li_y_big) {
                    scale = 3;
                }
            });
            gsap.to($mouse, {
                x: x_round,
                y: y_round,
                scale: scale,
                duration: 1
            });
            gsap.to($point, {
                x: x_point,
                y: y_point,
                duration: .4
            });
        });
    }


    //init function
    exerciseOne();
    exerciseTwo();
    exerciseThree();
    exerciseFour();
})