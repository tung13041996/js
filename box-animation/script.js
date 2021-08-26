$(document).ready(function () {
    function boxAnimation(options) {
        // variables
        let settings = $.extend({
            ul: '',
            backgroundColor: 'red', // color of box
            currentItems: 0, //position of box in first screen
            css: {
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '0',
                width: '100%',
                transition: 'all .5s ease',
            }
        }, options);

        // update position each $li hover
        function updatePosition($li, $movingBox) {
            if (!$li.length) return;
            $movingBox.css({
                'transform': `translateY(${$li.position().top}px)`,
                'height': $li.outerHeight() + "px",
            });
        }

        // if parent of ul has class: "has-animation" => do animation
        if (settings.ul.parent().hasClass("has-animation")) {

            // loop each ul
            settings.ul.each(function () {
                let $this_ul = $(this),
                    $li = $this_ul.children('li'),
                    $movingBox;

                // add box move to ul
                $this_ul.append('<span class="box-move"></span>');
                $movingBox = $this_ul.find(".box-move");

                // set css for this box at position default (current item)
                settings.css.height = $li.outerHeight() + 'px';
                settings.css.backgroundColor = settings.backgroundColor;
                settings.css.transformY = $li.eq(settings.currentItem).position().top + "px";
                $movingBox.css(settings.css);

                // hover on li
                $li.hover(function () {
                    // in => adjust position
                    updatePosition($(this), $movingBox);
                }, function () {
                    // out => set default position
                    updatePosition($li.eq(settings.currentItem), $movingBox);
                });

                // on load
                updatePosition($li.eq(settings.currentItem), $movingBox);
            });
        }
    }

    // init animation
    boxAnimation({
        ul: $(".box-animation ul"),
        backgroundColor: 'skyblue',
        currentItem: 0,
    });
});