require(['config'], function () {
    require(['jquery'], function () {
        (function () {
            let shopleftunder = $('.shopleft-under');
            let shoptimeunder = $('.shoptime-under');
            let everyunder = $('.every-under');
            let fashionleft = $('.fashionLeft-under');
            let hotshop = $('.hotShopping');
            let mainlefttop = $('.mianleft-top p');
            let imgsunderAll = $('.imgsunderAll')
            // let bannermain = $('.banner-main');
            // var bannertwomain = $('.banner-Twomain');

            let mainright = $('.mainright-img');
            let Imgsunderimgs = $('.Imgsunderimgs');


            $.ajax({
                type: 'get',
                url: 'http://10.31.155.20/secondStudy/taobao/new-taobao/taobao/php/item.php',
                async: true,
                dataType: 'json',
            }).done(function (data) {
                // console.log(data[0].url);
                let str = '';  //  有好货
                let item = '';//抢购
                let every = '';//每日好店
                let fashion = '';//时尚爆料王
                let hot = '';//热卖商品
                let second = '';//二级菜单栏
                let secondimg = '';//二级菜单的图片
                let underall = ''; //二级菜单底部的图片
                let undersmall = '';//二级菜单底部的图片 小图片
                $.each(data, function (index, value) {
                    str = ` <a herf="javascript:;" class="left-underimg">
                    <img src="${value.url}"> 
                    <div class="info">
                    <h4 class="a-all">${value.i}</h4>
                    <p>${value.span}<p>
                    <span class="tb-ifont"> ${value.pinlin}</span>
                    </div>
                    </a>
                    `
                    shopleftunder.append(str);

                })

                for (let i = 0; i < 3; i++) {
                    item += `<li><img src="${data[i].url}">
                   <div class="shoptime-font">
                   <h4>${data[i].p}</h4>
                   <p class="title">收藏加购 优先发货</p>
                   <div class="progress">
                       <div class="progress-bar" style="width: 80%"></div>
                   </div>
                   <div class="desc">
                       <span class="percentage">80%</span>
                       <span class="letter">已抢${data[i].sale}件</span>
                   </div>
                   <div class="shoptime-price">
                       <span class="now">${data[i].price}</span>
                       <span class="before">${data[i].beprice}</span>
                   </div>
               </div></li>
                   `
                }
                shoptimeunder.append(item);


                for (let a = 0; a < 8; a++) {

                    every += `<li>
                    <a href="javascript:;">
                        <h4 class="everyUnder-font">
                            <span class="title">今日推荐—1天3波</span>
                            <span class="subtitle">${data[a].pinlin}</span>
                        </h4>
                    </a>
                    <div class="everyUnder-img">
                        <img src="${data[a].url}" alt="">
                    </div>
                    <div class="everyUnder-imgRight">
                        <img src="${data[a].url}" alt="">
                        <img src="${data[a].url}" alt="">
                    </div>
                </li>`
                }
                everyunder.append(every);

                for (let b = 0; b < 6; b++) {
                    fashion += `
                    <li>
                    <p class="fashion-font">
                        <em>腔调</em>
                        <span>${data[b].p}</span>
                    </p>
                    <a href="" class="fashion-img">
                        <img src="${data[b].url}" alt=""    style="width:120px";>
                        <img src="${data[b].url2}" alt="">
                    </a>
                </li>
                    `
                }
                fashionleft.append(fashion);

                $.each(data, function (index, value) {
                    hot += ` <li>
            
                    <a href="javascript:;" class="hotimg"> <img src="${value.url}" alt=""></a>
                   
                    <a href="javascript:;" class="hotline"><img src="../src/img/baoyou.png" alt="">
                       ${value.p}  </a>
                    <a href="" class="hotline-1"><span>评价</span><span>${value.pingjia} </span><span>收藏</span><span>${value.shoucang}</span></a>
                    <p class="hotline-2">

                        <a href="javascript:;" class="price"><span  class="Price1">${value.price}</span><span class="Price2">${value.beprice}</span></a>
                        <a href="javascript:;" class="sell"><span>月销${value.sale}笔</span></a></p>
                </li>`
                    hotshop.append(hot);
                })








                $.each(data, function (index, value) {
                    second += `
            
                                        <a href="javascript:;">${value.clothes}</a>
                                     
                        `
                    // console.log(second);
                    // console.log(mainlefttop);
                    mainlefttop.append(second);
                })


                for (let c = 0; c < 6; c++) {
                    // console.log(data[c].i);
                    secondimg += `<a href="javascript:;">
                        <img src="${data[c].url2}" alt="">
                        <h5> ${data[c].i}</h5>
                    </a>`
                }
                // console.log(secondimg);
                mainright.append(secondimg);

               for(let d=0;d<6;d++) {

                    underall += ` <a> <img src="${data[d].bannersmall}"
                    alt=""></a> <a><img src="${data[d].bannersmall}"
                    alt=""></a> `
                   
                    // Imgsunderimgs.append(underall);
                }
                Imgsunderimgs.html(underall);

                for (let e=0;e<5;e++){
                    undersmall+=`<li><a>
                    <img src="${data[e].underbanner}"></a><a>
                    <img src="${data[e].underbanner}"></a>
                    </li>`
                }
                imgsunderAll.append(undersmall);
            })


        })()




    })
})