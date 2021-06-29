$(document).ready(function () {
    let exerciseOne = function() {
        let $area = $(".area-wrap"),
            $button = $area.find("a.btn"),
            limit_x_negative = ($button.width() - $area.width())/2,
            limit_y_negative = ($button.height() - $area.height())/2;


        $area.on("mousemove", function(e) {
            let x = e.pageX - $(this).position().left + limit_x_negative - $button.width()/2,
                y = e.pageY - $(this).position().top + limit_y_negative- $button.height()/2;

            $button.css({
                "transform":"translate(" + x + "px," + y + "px)",
            })
        })

        $area.on("mouseout", function(e) {
            $button.css({
                "transform":"translate(0px,0px)",
            })
        })
    }

    let exerciseTwo = function() {
        let $button = $(".exercise-two .btn-2");
        console.log($button);
        $button.on("mousemove", function(e) {
            let x = e.pageX - $(this).position().left - $(this).width()/2,
                y = e.pageY - $(this).position().top - $(this).height()/2;

            $(this).css("transform","translate(" + x * .5+ "px," + y * .8 + "px)");
        });
        $button.on("mouseout", function(e) {
            $(this).css("transform","translate(0,0)");
        });
    }

    let exerciseThree = function() {
        let $button = $(".exercise-three .btn-3");
        $button.on("mousemove", function(e) {
            let x = e.pageX - $(this).position().left - $(this).width()/2,
                y = e.pageY - $(this).position().top - $(this).height()/2;
            $(this).css("transform","translate(" + x * .5+ "px," + y * .8 + "px) scale(1.5)");
        });
        $button.on("mouseout", function(e) {
            $(this).css("transform","translate(0,0) scale(1)");
        });
    }
    let exerciseFour = function() {
        let $mouse = $(".round-mouse");
        // let $li = $(".exercise-four ul li");
        //
        // $li.each(function() {
        //     let $this_li = $(this);
        //     $this_li.on("mousemove", function(e) {
        //         let x = e.pageX - $mouse.width()/2,
        //             y = e.pageY - $mouse.height()/2;
        //
        //         console.log(e.pageX);
        //         console.log(e.pageY);
        //     })
        // })


        $(window).on("mousemove", function(e) {
            let x = e.pageX - $mouse.width()/2,
                y = e.pageY - $mouse.height()/2,
                isHoverLi = false;

            let $li = $(".exercise-four ul li");
            $li.each(function() {
                let $this_li = $(this),
                    li_x_small = $this_li.offset().left,
                    li_x_big = $this_li.offset().left + $this_li.outerWidth(),
                    li_y_small = $this_li.offset().top,
                    li_y_big = $this_li.offset().top + $this_li.outerHeight();

                console.log(li_x_small);
                console.log(li_x_big);
                console.log(li_y_small);
                console.log(li_y_big);

                if(x>=li_x_small && x<=li_x_big && y>=li_y_small && y<=li_y_big) {
                    isHoverLi = true;
                }
            });
            console.log(isHoverLi);
            if (isHoverLi) {$mouse.css("transform","translate(" + x + "px," + y + "px) scale(3)");}
            else {$mouse.css("transform","translate(" + x + "px," + y + "px) scale(1)");}

        });

    }


    //init function
    exerciseOne();
    exerciseTwo();
    exerciseThree();
    exerciseFour();
})