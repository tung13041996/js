$(document).ready(function () {
    function animationMenuHover(options) {
        // vars
        let settings = $.extend({
            ul: '', // jQuery element
            effect: 'dot', // string => dot, line
            css: {
                width: '5px',
                height: '5px',
                backgroundColor: 'red',
                bottom: '0px',
            },
        }, options);

        // update position
        function updatePosition($li, $movingEl) {
            if (!$li.length) return;
            let transformX, offset = $li.position().left + $li.width() / 2;

            if (settings.effect === 'dot') {
                transformX = offset - $movingEl.width() / 2;
                $movingEl.css('transform', `translateX(${transformX}px)`);
            }
            if (settings.effect === 'line') {
                transformX = offset - $li.width() / 2;
                $movingEl.css({
                    'transform': `translateX(${transformX}px)`,
                    'width': $li.width(),
                });
            }
            if (settings.effect === 'box') {
                transformX = offset - $li.width() / 2;
                $movingEl.css({
                    'transform': `translateX(${transformX}px)`,
                    'width': $li.width(),
                    'height': $li.find("a").outerHeight(),
                });
            }
        }

        // loop each ul
        settings.ul.each(function () {
            let $this_ul = $(this),
                $li = $this_ul.children('li'),
                $movingEl, isStillInUl = false;

            // add dot to ul
            $this_ul.append('<span class="dots"></span>');
            $movingEl = $this_ul.find(".dots");

            // set css
            settings.css.transition = 'all 1s ease';
            settings.css.position = 'absolute';
            settings.css.left = '0';
            if (settings.effect === 'box') {settings.css.zIndex = '-1';}
            $movingEl.css(settings.css);

            // hover on li
            $li.hover(function () {
                // in => adjust position
                updatePosition($(this), $movingEl);
            }, function () {
                // out => set default position
                if (!isStillInUl) {
                    updatePosition($li.eq(0), $movingEl);
                }
            });

            // hover on ul
            $this_ul.hover(function () {
                isStillInUl = true;
            }, function () {
                isStillInUl = false;
                // out => set default position
                updatePosition($li.eq(0), $movingEl);
            });

            // on load
            updatePosition($li.eq(0), $movingEl);
        });
    }


    // init dot hover
    animationMenuHover({
        ul: $("#menu-1 ul"),
        effect: 'dot',
        css: {
            width: '5px',
            height: '5px',
            backgroundColor: 'green',
            bottom: '-3px',
        }
    });

    // init line hover
    animationMenuHover({
        ul: $("#menu-2 ul"),
        effect: 'line',
        css: {
            width: '0px',
            height: '3px',
            backgroundColor: 'yellow',
            bottom: '-2px',
        }
    });

    // init box hover
    animationMenuHover({
        ul: $("#menu-3 ul"),
        effect: 'box',
        css: {
            width: '0px',
            height: '100%',
            backgroundColor: 'red',
            bottom: '-10px',
        }
    });


    // let animationMenuDot = function () {
    //     let $section1 = $("#menu-1"),
    //         $listItem1 = $section1.find("ul"),
    //         $items1 = $section1.find("li"); // li list item
    //
    //     //find spacing between items
    //     let total_spacing_items1 = 0,
    //         arrWidthItem1 = []
    //     $items1.each(function () {
    //         total_spacing_items1 += $(this).width();
    //         arrWidthItem1.push($(this).width());
    //     })
    //     let spacing_items = (($listItem1.width() - total_spacing_items1) / ($items1.length - 1));
    //
    //     //add dots to menu
    //     $listItem1.append("<span class='dots'></span>");
    //     let $dot = $section1.find(".dots");
    //
    //     //set current page
    //     $items1.first().addClass("current");
    //
    //     //function to find total spacing from first item to current item
    //     let totalSpacing = function (ind) {
    //         let result = 0;
    //         for (let i = 0; i < ind; i++) {
    //             result += arrWidthItem1[i] + spacing_items;
    //         }
    //         return result;
    //     }
    //
    //     //set position of dot in current page
    //     let defaultDots = function () {
    //         $items1.each(function (index) {
    //             let $this = $(this), width_item;
    //             if ($this.hasClass("current")) {
    //                 width_item = $this.width() / 2 + totalSpacing(index);
    //                 $dot.css("left", width_item + "px");
    //             }
    //         })
    //     }
    //     defaultDots();
    //
    //     /*hover items*/
    //     $items1.each(function (index) {
    //         let $this = $(this);
    //         $this.hover(function () {
    //             $dot.css("left", ($this.width() / 2 + totalSpacing(index)) + "px");
    //         }, function () {
    //             defaultDots();
    //         })
    //     })
    // }
    //
    // let animationMenuLine = function () {
    //     let $section2 = $("#menu-2"),
    //         $listItem2 = $section2.find("ul"),
    //         $items2 = $section2.find("li");
    //
    //     //find spacing between items
    //     let total_spacing_items2 = 0,
    //         arrWidthItem2 = []
    //     $items2.each(function () {
    //         total_spacing_items2 += $(this).width();
    //         arrWidthItem2.push($(this).width());
    //     })
    //     let spacing_items = (($listItem2.width() - total_spacing_items2) / ($items2.length - 1));
    //
    //     //add dots to menu
    //     $listItem2.append("<span class='line'></span>");
    //     let $line = $section2.find(".line");
    //
    //     //function to find total spacing from first item to current item
    //     let totalSpacing = function (ind) {
    //         let result = 0;
    //         for (let i = 0; i < ind; i++) {
    //             result += arrWidthItem2[i] + spacing_items;
    //         }
    //         return result;
    //     }
    //
    //     /*hover items*/
    //     $items2.each(function (index) {
    //         let $this = $(this);
    //         $this.hover(function () {
    //             $line.css({
    //                 "width": arrWidthItem2[index] + "px",
    //                 "opacity": "1",
    //                 "left": totalSpacing(index) + "px"
    //             });
    //         }, function () {
    //             $line.css({
    //                 "opacity": "0"
    //             });
    //         })
    //     })
    // }
    //
    // let animationMenuBox = function () {
    //     let $section3 = $("#menu-3"),
    //         $listItem3 = $section3.find("ul"),
    //         $items3 = $section3.find("li");
    //
    //     //find spacing between items
    //     let total_spacing_items3 = 0,
    //         arrWidthItem3 = []
    //     $items3.each(function () {
    //         total_spacing_items3 += $(this).outerWidth();
    //         arrWidthItem3.push($(this).outerWidth());
    //     })
    //     let spacing_items = (($listItem3.width() - total_spacing_items3) / ($items3.length - 1));
    //
    //     //add dots to menu
    //     $listItem3.append("<span class='box'></span>");
    //     let $box = $section3.find(".box");
    //
    //     //set current page
    //     $items3.first().addClass("current");
    //
    //     //function to find total spacing from first item to current item
    //     let totalSpacing = function (ind) {
    //         let result = 0;
    //         for (let i = 0; i < ind; i++) {
    //             result += arrWidthItem3[i] + spacing_items;
    //         }
    //         return result;
    //     }
    //
    //     //set position of dot in current page
    //     let defaultBox = function () {
    //         $items3.each(function (index) {
    //             let $this = $(this), width_item;
    //             if ($this.hasClass("current")) {
    //                 width_item = totalSpacing(index);
    //                 $box.css({
    //                     "left": width_item + "px",
    //                     "width": arrWidthItem3[index] + "px"
    //                 });
    //             }
    //         })
    //     }
    //     defaultBox();
    //
    //     /*hover items*/
    //     $items3.each(function (index) {
    //         let $this = $(this);
    //         $this.hover(function () {
    //             $box.css({
    //                 "left": totalSpacing(index) + "px",
    //                 "width": arrWidthItem3[index] + "px"
    //             });
    //         }, function () {
    //             defaultBox();
    //         })
    //     })
    // }

    //animationMenuDot();
    // animationMenuLine();
    // animationMenuBox();
})