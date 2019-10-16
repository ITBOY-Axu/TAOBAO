require(['config'], function () {
    require(['jquery'], function () {
        $(window).on('scroll', function () {
            let $top = $(window).scrollTop();
            // console.log($top);
            if ($top >= 300) {
                $('.hidden-fix').stop(true).animate({
                    top: 0
                });
            }
            else {
                $('.hidden-fix').stop(true).animate({
                    top: -150
                })
            }
        })

    })
})







