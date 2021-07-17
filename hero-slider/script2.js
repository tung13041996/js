function moveTo(isNext, index) {
    // restrict index in range [0;length-1]
    index = Math.max(0, Math.min($sliderItems.length - 1, index));

    // find the last index
    let lastIndex = isNext ? index - 1 : index + 1;

    //console.log('index', index, 'lastIndex', lastIndex, 'globalIndex', globalIndex);

    // skip if move to duplicated slides
    if (globalIndex === index) return;

    // update current index
    globalIndex = index;

    // get slides
    let $lastSlide = $sliderItems.eq(lastIndex),
        $newSlide = $sliderItems.eq(index);

    // update position for the new slide
    gsap.fromTo($newSlide,
        {
            x: isNext ? '-100%' : '100%',
        },
        {
            x: 0,
            duration: time_move,
        }
    );

    // update z index
    gsap.set($sliderItems, {zIndex: 1});
    gsap.set($lastSlide, {zIndex: 2});
    gsap.set($newSlide, {zIndex: 3});
    // need more processing
}


//slide when click next button
let globalIndex = 0;
$buttonNext.on("click", function () {
    //slideToNext();
    moveTo(true, globalIndex + 1);
})

$buttonPrev.on("click", function () {
    //slideToPrev();
    moveTo(false, globalIndex - 1);
})


function plugin(options) {
    let /**
         * Private
         */
        index = 0,
        private_methods = {},
        /**
         * Public
         */
        settings = $.extend({
            wrapper: $(''),
            speed: 700, //ms
            dots: false,
            arrows: false,
            infinite: false,
        }, options),
        methods = {
            moveTo: function (index) {
                private_methods.moveTo(index);
            },
            next: function () {
                private_methods.moveTo(index + 1);
            },
            prev: function () {
                private_methods.moveTo(index - 1);
            },
            getCurrentIndex: function () {
                return index;
            }
        };


    private_methods.moveTo = function (index) {
        // animation move slide to this index
    }


    return methods;
}


/**
 *
 */
plugin.moveTo(0);
plugin.next();
plugin.prev();