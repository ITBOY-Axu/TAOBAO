require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        (function () {
            const comurl = 'http://10.31.155.20/secondStudy/taobao/taobao/php/'
            let sid = location.search.substring(1).split('=')[1];
            const bannermiddle = $('.banner-middle');
            const bannerleft = $('.banner-left');
            $.ajax({
                type: 'get',
                url: comurl + 'detail.php',
                data: {
                    id: sid
                },
                async: true,
                dataType: 'json'
            }).done(function (data) {
                // console.log(data)
                let underdetails = data.details.split(',');
                // console.log(data.details.split(',')[1])
                let str = '';
                let font = '';
                str = `
               
                <div class="bannerLeft-imgs">
                
                    <div class="imgs-sf">
                        <a href="javascript:;">
                         
                            <img src="${data.datail}" alt="">
                          
                            <div class="sf"></div>
                        </a>

                    </div>
                    <div class="imgs-gf">
                            <img src="${data.datail}" alt="">
                        </div>
                </div>
                
                <ul class="bannerLeft-smallimgs">
                    <li> <img src="${underdetails[0]}" alt=""></li>
                    <li> <img src="${underdetails[1]}" alt=""></li>
                    <li> <img src="${underdetails[2]}" alt=""></li>
                    <li> <img src="${underdetails[3]}" alt=""></li>
                    <li> <img src="${underdetails[4]}" alt=""></li>
                </ul>
           `
                bannerleft.html(str);


                font = `
                <div class="middle-Top">
                    <h3>
                        <span>代购</span>
                        ${data.p}
                    </h3>
                    <p>举报</p>
                </div>
                <!-- 中间部分的上面      价格 部分 -->
                <ul class="price">
                    <li class="price-cancel"> <span>
                            价格
                        </span>
                        <em>￥${data.beprice}</em>
                    </li>
                    <!-- 中间部分的上面      价格 部分    右边的累积评论-->
                    <li class="pinlun">
                        <div class="pinlun-left"><a href="javascript:;">
                                <span class="number">${data.shoucang}</span>
                                <span>累计评论</span>
                            </a></div>
                        <div class="pinlun-right">
                            <a href="javascript:;">
                                <span class="number">${data.sale}</span>
                                <span>交易成功</span>
                            </a>
                        </div>
                    </li>
                    <!-- 中间部分的上面      价格 部分    淘宝目前价格部分-->
                    <li class="taobao-price">
                        <span class="price-style">淘宝价</span>
                        <div class="now-price   ">
                            <!-- 人民币符号 -->
                            <strong class="tb-promo-price"><em class="tb-rmb-num">￥${data.price}</em></strong>
                        </div>
                    </li>
                    <!-- 中间部分的上面      价格 部分    优惠部分部分-->
                    <li class="taobao-sell">
                        <span class="tb-sell-type">优惠</span>
                        <div class="tb-sell-price">
                            <i></i>
                            <span>淘金币可抵4.8元</span>
                        </div>
                    </li>
                    <!-- 中间部分的上面      价格 部分  配送部分-->
                    <li class="taobao-song">
                        <span class="tb-sell-type">配送</span>
                        <!-- 配送地区 -->
                        <div class="tb-sell-price">
                            <span>浙江杭州至</span>
                            <div class="tb-sell-local">
                                浙江杭州
                                <ul></ul>
                            </div>
                            <span>快递</span>
                            <div class="tb-sell-kuai">
                                免运费
                                <ul></ul>
                            </div>
                            <span>48小时内发货</span>
                        </div>
                    </li>
                </ul>
         
 
           `
                bannermiddle.prepend(font);

                // const sbox =$('.imgs-sf');
                const imgsf = $('.imgs-sf');  //小盒子
                const smallimg = $('.imgs-sf img')
                const imggf = $('.imgs-gf  img');  //大图
                const sf = $('.sf'); //小放大镜
                const gf = $('.imgs-gf') //大放大镜
                const ul = $('.bannerLeft-smallimgs')//缩略图外面的大盒子
                const leftbutton = $('.leftchange')//左边点击的按钮
                const rightbutton = $('.rightchange') //右边点击的按钮
                const sum = $('.sumbutton')  //数量的Input框
                const cartbtn = $('.shopcar')  //点击购物车跳转购物车页面
                //移入小图显示放大镜
                imgsf.hover(function () {
                    //鼠标移入   
                    sf.css({ 'visibility': 'visible' });
                    gf.css({ 'visibility': 'visible' });
                    let width = imgsf.width() * gf.width() / imggf.width();
                    let height = imgsf.height() * gf.height() / imggf.height();
                    // console.log(imgsf.css('width'))
                    // console.log(gf.css('width'))
                    // console.log(imggf.css('width'))
                    sf.css({ 'width': width, 'height': height });
                    // console.log(sf)
                    let bili = imggf.width() / imgsf.width();
                    // console.log(bili);
                    $(this).on('mousemove', function (e) {

                        let left = e.pageX - imgsf.offset().left - sf.width() / 2;
                        let top = e.pageY - imgsf.offset().top - sf.height() / 2;

                        if (left < 0) {
                            left = 0;
                        } else if (left >= imgsf.width() - sf.width()) {
                            left = imgsf.width() - sf.width() - 2;
                        }
                        if (top <= 0) {
                            top = 0;
                        } else if (top >= imgsf.height() - sf.height()) {
                            top = imgsf.height() - sf.height() - 2;
                        }
                        sf.css({ 'left': left });
                        sf.css({ 'top': top });
                        // console.log(left*-bili)
                        imggf.css({ 'left': left * -bili });
                        imggf.css({ 'top': top * -bili });

                    })
                }, function () {
                    sf.css({ 'visibility': 'hidden' });
                    gf.css({ 'visibility': 'hidden' });
                })

                //点击缩略图  实现切换   
                ul.on('click', function (event) {

                    if (event.target.nodeName == 'IMG') {
                        Nsrc = event.target.src;
                        //  console.log(Nsrc)
                        //  console.log(smallimg.attr('src'))
                        // $(imgsf.img).attr({src:Nsrc});
                        smallimg.attr('src', Nsrc);
                        imggf.attr('src', Nsrc);
                    }
                })


                //加入购物车按钮，添加购物车

                let sidarr = [];  //存储商品的sid
                let numarr = [];  //存放的数量

                let num = sum.val();
                //点击左边按钮  添加商品数量
                leftbutton.on('click', function () {
                    // console.log(sum.val());
                    num--;
                    if (num <= 0) {
                        num = 0;
                    }
                    sum.val(num);
                })
                //点击右边按钮  添加商品数量
                rightbutton.on('click', function () {
                    num++;
                    sum.val(num);
                })
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    sidarr = $.cookie('cookiesid').split(',');
                    numarr = $.cookie('cookienum').split(',');
                }

                cartbtn.on('click', function () {
                    alert('商品添加成功');
                    if (sidarr.indexOf(sid) !== -1) {
                        // console.log(1);
                        console.log(sidarr);
                        console.log(sid);
                        let index = sidarr.indexOf(sid);
                        console.log(index)
                        numarr[index] = parseInt(numarr[index]) + parseInt(sum.val());
                        console.log(numarr[index])
                        $.cookie('cookienum', numarr.toString(), { expires: 7 });
                    } else {
                        console.log(2);
                        sidarr.push(sid);
                        $.cookie('cookiesid', sidarr.toString(), { expires: 7 });
                        numarr.push(sum.val());
                        $.cookie('cookienum', numarr.toString(), { expires: 7 });
                    }
                })





            })



        })()




    })
})