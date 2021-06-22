$(document).ready(function() {
    let animationMenuDot = function () {
        let $section1 = $("#menu-1"),
            $listItem1 = $section1.find("ul"),
            $items1 = $section1.find("li");

        //find spacing between items
        let total_spacing_items1 = 0,
            arrWidthItem1 = []
        $items1.each(function() {
            total_spacing_items1 += $(this).width();
            arrWidthItem1.push($(this).width());
        })
        let spacing_items = (($listItem1.width() - total_spacing_items1)/ ($items1.length - 1));

        //add dots to menu
        $listItem1.append("<span class='dots'></span>");
        let $dot = $section1.find(".dots");

        //set current page
        $items1.first().addClass("current");

        //function to find total spacing from first item to current item
        let totalSpacing = function(ind) {
            let result = 0;
            for (let i=0; i<ind; i++) {
                result += arrWidthItem1[i] + spacing_items;
            }
            return result;
        }

        //set position of dot in current page
        let defaultDots = function() {
            $items1.each(function (index) {
                let $this = $(this), width_item;
                if ($this.hasClass("current")) {
                    width_item = $this.width()/2 + totalSpacing(index);
                    $dot.css("left", width_item + "px");
                }
            })
        }
        defaultDots();

        /*hover items*/
        $items1.each(function(index) {
            let $this = $(this);
            $this.hover(function() {
                $dot.css("left", ($this.width()/2 + totalSpacing(index)) + "px");
            }, function() {
                defaultDots();
            })
        })
    }

    let animationMenuLine = function () {
        let $section2 = $("#menu-2"),
            $listItem2 = $section2.find("ul"),
            $items2 = $section2.find("li");

        //find spacing between items
        let total_spacing_items2 = 0,
            arrWidthItem2 = []
        $items2.each(function() {
            total_spacing_items2 += $(this).width();
            arrWidthItem2.push($(this).width());
        })
        let spacing_items = (($listItem2.width() - total_spacing_items2)/ ($items2.length - 1));

        //add dots to menu
        $listItem2.append("<span class='line'></span>");
        let $line = $section2.find(".line");

        //function to find total spacing from first item to current item
        let totalSpacing = function(ind) {
            let result = 0;
            for (let i=0; i<ind; i++) {
                result += arrWidthItem2[i] + spacing_items;
            }
            return result;
        }

        /*hover items*/
        $items2.each(function(index) {
            let $this = $(this);
            $this.hover(function() {
                $line.css({
                    "width":arrWidthItem2[index] + "px",
                    "opacity":"1",
                    "left": totalSpacing(index) + "px"
                });
            }, function() {
                $line.css({
                    "opacity":"0"
                });
            })
        })
    }

    let animationMenuBox = function () {
        let $section3 = $("#menu-3"),
            $listItem3 = $section3.find("ul"),
            $items3 = $section3.find("li");

        //find spacing between items
        let total_spacing_items3 = 0,
            arrWidthItem3 = []
        $items3.each(function() {
            total_spacing_items3 += $(this).outerWidth();
            arrWidthItem3.push($(this).outerWidth());
        })
        let spacing_items = (($listItem3.width() - total_spacing_items3)/ ($items3.length - 1));

        //add dots to menu
        $listItem3.append("<span class='box'></span>");
        let $box = $section3.find(".box");

        //set current page
        $items3.first().addClass("current");

        //function to find total spacing from first item to current item
        let totalSpacing = function(ind) {
            let result = 0;
            for (let i=0; i<ind; i++) {
                result += arrWidthItem3[i] + spacing_items;
            }
            return result;
        }

        //set position of dot in current page
        let defaultBox = function() {
            $items3.each(function (index) {
                let $this = $(this), width_item;
                if ($this.hasClass("current")) {
                    width_item = totalSpacing(index);
                    $box.css({
                        "left": width_item + "px",
                        "width":arrWidthItem3[index] + "px"
                    });
                }
            })
        }
        defaultBox();

        /*hover items*/
        $items3.each(function(index) {
            let $this = $(this);
            $this.hover(function() {
                $box.css({
                    "left": totalSpacing(index) + "px",
                    "width":arrWidthItem3[index] + "px"
                });
            }, function() {
                defaultBox();
            })
        })
    }

    animationMenuDot();
    animationMenuLine();
    animationMenuBox();
})