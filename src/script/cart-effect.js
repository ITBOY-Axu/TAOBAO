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
                                    <input type="checkbox" class="SelectBox">
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
                const delect = $('.delet');
                $.each(delect, function (index, value) {
                    $(this).attr('sid', arrsid[index]);

                    $(value).on('click', function () {
                        //让每个删除按钮  绑定一个对应的sid  
                        let arrsid = $.cookie('cookiesid').split(',');
                        let arrnum = $.cookie('cookienum').split(',');
                        let sid = $(this).attr('sid');

                        // console.log(arrsid);
                        // console.log(arrnum);
                        // console.log(($.inArray(sid, arrsid)))
                        // console.log($.inArray(sid, arrsid))
                        arrsid.splice(($.inArray(sid, arrsid)), 1);
                        arrnum.splice(($.inArray(sid, arrsid)), 1);
                        // console.log(arrsid);
                        // console.log(arrnum);

                        $.cookie('cookiesid', arrsid, { expires: 7 });
                        $.cookie('cookienum', arrnum, { expires: 7 });

                        $(this).parents('.shopItem-under').remove();
                        pricesum();
                    })
                })


                //判断  结算按钮变色
                const buybut = $('.buy a');
                //上面的结算按钮
                const buysbut = $('.submit-btn');
                //总价格
                const topallprice = $('.price');
                const allprice = $('.three-allprice em')
                //每个p标签的商品总价格
                const everyprice = $('.priceall span')
                // console.log(everyprice.text());

                //每个渲染商品的数量
                const amount = $('.amount');


                //商品数量的总和 
                const allamount = $('.three-num em')


                //  顶部上方的所有商品的数量
                const shopnum = $('.shoppingnumber');

                //每个商品的单价
                const oneprice = $('.now span');


                //左右两边的加减按钮
                const jia = $('.jia');
                const jian = $('.jian');

                // 全选框    
                const allselect = $('.selectbox');

                //每个input框
                const select = $('.SelectBox').not('.selectbox');




                // let Num = amount.val();
                //点击左右边按钮  添加商品数量   并且实现商品价格的计算
                $.each(jian, function (index, value) {

                    let price = oneprice.eq(index).text()
                    $(value).on('click', function () {
                        let Num = amount.eq(index).val();
                        Num--
                        if (Num <= 0) {
                            Num = 0;
                        }
                        amount.eq(index).val(Num);

                        //每个商品对应的单价
                        everyprice.eq(index).text(price * Num);

                        //    console.log(amountsum()) ;

                        pricesum()


                    })
                })

                $.each(jia, function (index, value) {
                    let price = oneprice.eq(index).text()
                    $(value).on('click', function () {
                        let Num = amount.eq(index).val();
                        Num++
                        amount.eq(index).val(Num);
                        everyprice.eq(index).text(price * Num);


                        pricesum()

                    })
                })

                //封装一个求和计算总价格和商品总数的方法
                //商品数量总和的方法


                //商品价格数量总和的方法
                function pricesum() {
                    let Pricesum = 0;
                    let AllSum = 0;
                    const everyprice = $('.priceall span');
                    const amount = $('.amount');

                    $.each(select, function (index, value) {

                        if ($(value).prop('checked')) {
                            // console.log(everyprice.eq(index).text())
                            Pricesum += Number(everyprice.eq(index).text());
                            AllSum += Number(amount.eq(index).val());
                            buybut.css({ 'cursor': 'pointer', 'background': '#f40' });
                            buysbut.css({ 'cursor': 'pointer', 'background': '#f40' });
                        }


                    })
                    allamount.html(AllSum);
                    shopnum.html(AllSum);

                    allprice.html('￥' + Pricesum);
                    topallprice.html('￥' + Pricesum);
                }



                //全选框


                // console.log(allselect);

                allselect.on('click', function () {
                    if ($(this).prop('checked')) {
                        select.prop('checked', true);
                        allselect.prop('checked', true);
                    }
                    else {
                        select.prop('checked', false);
                        allselect.prop('checked', false);
                    }
                    pricesum();
                })

                //单选框
                select.on('click', function () {
                    if ($('.SelectBox:checked').not('.selectbox').length === select.length) {
                        allselect.prop('checked', true);
                    } else {
                        allselect.prop('checked', false);
                    }
                    pricesum();
                })




            })




        })()
    })
})