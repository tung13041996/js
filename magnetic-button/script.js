$(document).ready(function () {
    let $area = $(".area-wrap"),
        $button = $area.find("a.btn"),
        limit_x_negative = ($button.width() - $area.width())/2,
        limit_x_positive = -1 * limit_x_negative,
        limit_y_negative = ($button.height() - $area.height())/2,
        limit_y_positive = -1 * limit_y_negative;


    $area.on("mousemove", function(e) {
        let x = e.pageX - $(this).position().left + limit_x_negative - $button.width()/2,
            y = e.pageY - $(this).position().top + limit_y_negative- $button.height()/2;

        console.log("X:" + x + "px");
        console.log("Y:" + y + "px");

        $button.css({
            "transform":"translate(" + x + "px," + y + "px)",
        })
    })

    $area.on("mouseout", function(e) {
        $button.css({
            "transform":"translate(0px,0px)",
        })
    })
})