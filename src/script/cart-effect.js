require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        (function () {
            const comurl = 'http://10.31.155.20/secondStudy/taobao/taobao/php/';



            $.ajax({
                type: 'get',
                url: comurl + 'item.php',
                async: true,
                dataType: 'json'
            }).done(function (data) {

                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    var arrsid = $.cookie('cookiesid').split(',');
                    var arrnum = $.cookie('cookienum').split(',');

                }
                // console.log(arrsid.length)  
                //有几个sid就渲染几次


                for (let i = 0; i < arrsid.length; i++) {
                    //    console.log(data.sid)
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].sid === arrsid[i]) {

                            let str = '';
                            str += `
                     <ul class="shopItem-under">
                                <!-- 左边的复选框 -->
                                <li class="under-checkbox">
                                    <input type="checkbox">
                                </li>
                                <!-- 右边的商品部分 -->
                                <li class="shopmessage">
                                    <!-- 左边的商品图 -->
                                    <div class="message-img">
                                        <a href="javascript:;">
                                            <img src="${data[i].datail}" alt="">
                                        </a>
                                    </div>
        
                                    <!-- 右边的商品的详情 -->
                                    <div class="messagefont">
                                        <!-- 上面的文字 -->
                                        <a href="javascript:;">${data[i].p}</a>
                                    </div>
        
                                    <!-- 下面的商品小图标 -->
                                    <div class="message-log">
                                        <span>
                                            <a href="javascript:;">
                                                <img src="../src/img/smlog.png" alt="">
                                            </a>
                                            <a href="javascript:;">
                                                <img src="../src/img/smlog.png" alt="">
                                            </a>
                                        </span>
                                    </div>
                                </li>
                                <!-- 中间的商品   介绍 -->
                                <li class="shopcenter">
                                    <div class="shopcenter-font">
                                        <p class="shopcenter-line">颜色分类：黑色(白色)加固</p>
                                    </div>
                                </li>
        
                                <!-- 商品   产品优惠价格 -->
                                <li class="sall-price">
                                    <!-- 之前价格 -->
                                      <p class="before"><em>￥</em><span>${data[i].beprice}<span></p>
                                    <!-- 最新价格 -->
                                     <p class="now"><em>￥</em><span>${data[i].price}</span></p>
                                </li>
        
                                <!-- 商品添加数量的按钮 -->
                                <li class="addnum-but">
                                    <a href="javascript:;" class="jian">-</a><input type="text" value="${arrnum[i]}" class="amount"><a href="javascript:;" class="jia">+</a>
                                </li>
        
                                <!-- 商品的总价格 -->
                                <li class="priceall">
                                   ￥ <span>${data[i].price * arrnum[i]}</span>
                                </li>
        
                                <!-- 商品的操作部分 -->
                                <li class="shop-delet">
                                    <a href="javascript:;">移入收藏夹</a>
                                    <a href="javascript:;" class="delet">删除</a>
                                </li>
                            </ul>
                     `
                            const shopItem = $('.shopItem');
                            shopItem.append(str);
                        }
                    }
                }

                //  点击删除 移出整个渲染的商品栏目  并且 把cookie清除
                const delect = $('.delet')
                delect.on('click', function () {
                    $.cookie('cookiesid', '', { expires: -1 });
                    $.cookie('cookienum', '', { expires: -1 });
                    $(this).parents('.shopItem-under').remove();
                })

                //判断  结算按钮变色
                const buybut = $('.buy a');
                //上面的结算按钮
                const buysbut = $('.submit-btn');
                //总价格
                const topallprice = $('.price');
                const allprice = $('.three-allprice em')
                //每个p标签的商品价格
                const everyprice = $('.priceall span')
                // console.log(everyprice.text());

                //每个渲染商品的数量
                const amount = $('.amount');


                //商品数量的总和 
                const allamount = $('.three-num em')

                // console.log(amount)
                // console.log(allamount)

                let sum = 0;

                $.each(everyprice, function (index, value) {
                    sum += Number($(value).text());

                })


                allprice.html('￥' + sum);
                topallprice.html('￥' + sum);


                if (allprice.html != 0) {
                    buybut.css({ 'cursor': 'pointer', 'background': '#f40' });
                    buysbut.css({ 'cursor': 'pointer', 'background': '#f40' });
                }
                let num = 0;
                $.each(amount, function (index, value) {
                    num += Number($(value).val());

                })

                allamount.html(num);


                // //加入购物车按钮，添加购物车

                // let sidarr = [];  //存储商品的sid
                // let numarr = [];  //存放的数量

                // let num = sum.val();
                // //点击左边按钮  添加商品数量
                // leftbutton.on('click', function () {
                //     // console.log(sum.val());
                //     num--;
                //     if (num <= 0) {
                //         num = 0;
                //     }
                //     sum.val(num);
                // })
                // //点击右边按钮  添加商品数量
                // rightbutton.on('click', function () {
                //     num++;
                //     sum.val(num);
                // })




            })




        })()
    })
})