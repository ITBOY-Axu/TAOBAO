require(['config'], function () {
    require(['jquery', 'haohuo'], function () {




        $.ajax({
            type: 'get',
            url: 'http://10.31.155.20/secondStudy/taobao/new-taobao/taobao/php/item.php',
            async: true,
            dataType: 'json',
        }).done(function (data) {
            console.log(data)
            let bannerimg = '';//轮播图的渲染
            for (let d = 0; d < 5; d++) {
                bannerimg += `<img src=" ${data[d].banner} " alt="" >`
            }
            let banner = $('.bannerimgAll'); //移动的大盒子
            banner.append(bannerimg);

            let imgs = $('.bannerimgAll img');  //轮播图下面所有的图片
            let button = $('.bannerimg-tab li ');//  轮播的小按钮
            let tableft = $('.tableft') //左箭头切换图片
            let tabright = $('.tabright') //右箭头切换图片
            let liwidth = $('.bannerimgAll img').eq(0).width();




            //第二个轮播图效果
            let imgsunderAll = $('.imgsunderAll')  //下面移动的大盒子
            let underimgs = $('.imgsunderAll li') //轮播图下面所有的图片的li
            let underleft = $('.Stableft')//左箭头切换图片
            let underright = $('.Stabright')//右箭头切换图片

            let index = 0;
            let index2=0;
            imgsunderAll.append(underimgs.first().clone());
            imgsunderAll.prepend(underimgs.last().clone());

            banner.append(imgs.first().clone());
            banner.prepend(imgs.last().clone());
            // console.log($('.bannerimgAll img').length * liwidth);
            imgsunderAll.width($('.imgsunderAll li').length * liwidth).css('left', -liwidth + 'px');

            banner.width($('.bannerimgAll img').length * liwidth).css('left', -liwidth + 'px');




            button.on('click', function () {
                index = $(this).index();
                tabswitch();
                button.eq(index).addClass('selected').siblings().removeClass('selected');
            });


            setInterval(function () {
                tabRight();
            }, 2000);



        

            tabright.on('click', function () {
                tabRight();
            })
            tableft.on('click', function () {
                index--;
                if (index < 0) {
                    button.eq(button.length - 1).addClass('selected').siblings().removeClass('selected');
                } else {
                    button.eq(index).addClass('selected').siblings().removeClass('selected');
                }
                tabswitch();

            })





            underleft.on('click', function () {
                index2--;
                tabswitch2();
            })
            underright.on('click', function () {
                index2++;
                tabswitch2();
            })

            function tabRight() {
                index++;
                if (index == 5) {
                    button.eq(0).addClass('selected').siblings().removeClass('selected');
                } else {
                    button.eq(index).addClass('selected').siblings().removeClass('selected');
                }
                tabswitch();
            }

            function tabswitch() {
                banner.stop(true, true).animate({
                    left: -(index + 1) * liwidth
                }, function () {
                    if (index > button.length - 1) {
                        banner.css('left', -liwidth + 'px');
                        index = 0;
                    }
                    if (index < 0) {
                        banner.css('left', -liwidth * button.length + 'px');
                        index = button.length - 1;
                    }
                });
            }
            function tabswitch2() {
                imgsunderAll.stop(true, true).animate({
                    left: -(index2 + 1) * liwidth
                }, function () {
                    if (index2 > underimgs.length) {
                        imgsunderAll.css('left', -liwidth + 'px');
                        index = 0;
                    }
                    if (index2 < 0) {
                        imgsunderAll.css('left', -liwidth * underimgs.length + 'px');
                        index2 = underimgs.length;
                    }
                });
            }







        })




    })
})