require(['config'], function () {
    require(['jquery'], function () {
        (function () {
            let $liA = $('.BannerRight-tab  a');
            console.log($liA)
            let $tabP = $('.tab-font p');

            $liA.on('mouseover', function () {
                let $this = $(this);
                setTimeout(function () {
                    $($this).addClass('coloractive').siblings($liA).removeClass('coloractive');
                    $tabP.eq($($this).index('.BannerRight-tab  a')).addClass('tab-Pshow').siblings($tabP).removeClass('tab-Pshow');
                }, 1000)

            })
        })()

    })
})



