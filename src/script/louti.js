require(['config'], function () {
    require(['jquery'], function () {

        class louti {
            constructor() {
                this.loutinav = $('.asideWrap');
                this.loutili = $('.louti')
                // console.log(this.loutili);
                this.Louceng = $('.Louceng')
                this.last = $('.last');
                // console.log(this.last)
                // console.log(this.Louceng)
            }
            init() {
                let _this = this;

                let $top = $(window).scrollTop(); //获取当前的scrollTop值
                if ($top >= 500) {
                    this.loutinav.show();
                }
                else {
                    this.loutinav.hide();
                }
                $(window).on('scroll', function () {
                    let $top = $(this).scrollTop();
                    if ($top >= 500) {
                        _this.loutinav.show();
                    }
                    else {
                        _this.loutinav.hide();
                    }
                    _this.Louceng.each(function (index, element) {
                        let $Loucengtop = _this.Louceng.eq(index).offset().top;
                        if ($Loucengtop > $top) {
                            _this.loutili.removeClass('active');
                            _this.loutili.eq(index).addClass('active');
                            return false;
                        }
                    });

                });

                this.loutili.on('click', function () {
                    // console.log(this);
                    $(this).addClass('active').siblings('li').removeClass('active');
                    let $Loucengtop = _this.Louceng.eq($(this).index('.louti')).offset().top;

                    $('html,body').animate({
                        scrollTop: $Loucengtop
                    });
                });

                this.last.on('click', function () {
                    $('html,body').animate({
                        scrollTop: 0
                    });
                });
            }
        }

        new louti().init();


    })
})








