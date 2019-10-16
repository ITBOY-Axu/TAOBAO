require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        (function () {
           
            var $phone = $('.phone input');
            var $message = $('.message input');
            var $pass = $('.secrt input');
            var $read = $('.read input');
            var $yz = $('.yz input');
            var $yzm = $('.yzm');
            var $yzmero = $('.yzm-erro');
            var $success = $('.success');
            // 建立一个空数组  存放验证码
            var arr = [];
            for (var i = 48; i <= 57; i++) {
                arr.push(String.fromCharCode(i));
            }

            for (var i = 97; i <= 122; i++) {
                arr.push(String.fromCharCode(i));
            }

            //点击随机生成验证码
            $yzm.on('click', function () {
                var yzmstr = '';
                for (var i = 1; i <= 6; i++) {
                    //var index = parseInt(Math.random() * arr.length);//索引
                    var index = random(0, arr.length - 1);//索引
                    if (index > 9) {//拼接的字符
                        //公平的判断
                        var bstop = Math.random() > 0.5 ? true : false;    // 大小写的概率各一半     如果是随机到后半段的数字   就进行大写转换   如果没有的话就直接小写输出   

                        if (bstop) {
                            yzmstr += arr[index].toUpperCase();//大写
                        } else {
                            yzmstr += arr[index];
                        }
                    } else {//拼接的是数字
                        yzmstr += arr[index];
                    }
                }
                this.innerHTML = yzmstr;

            })
            //随机数
            function random(min, max) {
                return parseInt(Math.random() * (max - min + 1)) + min;
            }
            $yz.on('blur', function () {
                // console.log($yzm.html())
                if ($(this).val() != $yzm.html()) {
                    $yzmero.html('验证码不正确');
                    $yzmero.css({ 'color': 'black' });
                    console.log(1);
                    // tellock () false;
                    $yzmero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    yzmlock = false;
                }
                else {
                    $yzmero.html('验证码正确');
                    $yzmero.css({ 'color': 'green' });
                    console.log(1);
                    // tellock () false;
                    $yzmero.show().css({ 'display': 'block', 'background-position': '-1000px' });

                    yzmlock = true;
                }
            })

            $success.on('click', function () {

                if ($read.is(':checked')) {
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.155.20/secondStudy/taobao/taobao/php/login.php',
                        async: true,
                        data: {
                            phone: $phone.val(),
                            message: $message.val(),
                            pass: $pass.val(),
                        }
                    }).done(function (data) {
                        // console.log(data);
                        if (data) {
                            location.replace( 'http://10.31.155.20/secondStudy/taobao/taobao/src/taobao.html') ;
                           
                            $.cookie('youxiang', $message.val());
                        } else {

                            alert('用户名或者密码错误');
                         
                        }
                        return false;
                    })



                }
                else {
                    alert('请先勾选淘宝会员注册页面');
                }
                return false;
            });



        })()
    })
})