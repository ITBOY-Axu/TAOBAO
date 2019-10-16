
require(['config'], function () {
    require(['jquery', 'jqcookie'], function () {
        (function () {
            var $phone = $('.phone input');
            var $phonero = $('.phone-erro ');

            var $message = $('.message input');
            var $messagero = $('.message-erro');


            var $pass = $('.secrt input');
            var $passero = $('.secrt-erro');

            var $pass2 = $('.secrt2 input');
            var $passero2 = $('.secrt2-erro');

            var $yz = $('.yz input');
            var $yzm = $('.yzm');
            var $yzmero = $('.yzm-erro');


            var $success = $('.success');

            var $read = $('.read input')

            console.log($pass);
            var tellock = true;
            var emaillock = true;
            var passlock = true;
            var passlock2 = true;
            var yzmlock = true;
            var readlock = false;


            var arr = [];
            for (var i = 48; i <= 57; i++) {
                arr.push(String.fromCharCode(i));
            }

            for (var i = 97; i <= 122; i++) {
                arr.push(String.fromCharCode(i));
            }



            $surepass = $('.secrt2 input');
            // 手机号码验证
            $phone.on('blur', function () {
                let reg = /^1[3578]\d{9}$/;
                if (this.value !== '') {//验证手机号码不能为空
                    if (reg.test(this.value)) {//检测手机号码是否合法
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.155.20/secondStudy/taobao/taobao/php/registry.php',
                            async: true,
                            data: {
                                phone: $phone.val()
                            }
                        }).done(function (datarr) {
                            // console.log(datarr);
                            if (!datarr) {
                                $phonero.html('可用的手机号码');
                                $phonero.css({ 'color': 'green' });
                                $phonero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                                tellock = true;
                            }
                            else {
                                $phonero.html('手机号码已经存在');
                                $phonero.css({ 'color': 'black' });

                                // tellock () false;
                                $phonero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                                tellock = false;
                            }

                        })

                        // tellock () true;
                    } else {
                        $phonero.html('手机号码格式不正确');
                        $phonero.css({ 'color': 'black' });
                        console.log(1);
                        // tellock () false;
                        $phonero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                        tellock = false;
                    }
                } else {

                    $phonero.html('手机号码不能为空');
                    $phonero.css({ 'color': 'black' });
                    // tellock () false;
                    $phonero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    tellock = false;
                }
            })

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



            //电子邮箱
            $message.on('blur', function () {
                let reg = /^(\w[\w\-\+]*\w)\@(\w[\w\-\+]*\w)\.(\w[\w\-\+]*\w)$/;
                if (this.value !== '') {//验证手机号码不能为空
                    if (reg.test(this.value)) {//检测手机号码是否合法
                        // $.ajax({
                        //     type: 'post',
                        //     url: 'http://localhost/secondStudy/taobao/php/registry.php',
                        //     async: true,
                        //     data: {
                        //         message: $message.val()
                        //     }
                        // }).done(function (datarr) {
                        //     console.log(datarr);
                        // // console.log(1111);
                        // if (!datarr) {
                        //     $messagero.html('可用的电子邮箱');
                        //     $messagero.css({ 'color': 'green' });
                        //     $messagero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                        //     emaillock = true;
                        // }
                        // else {
                        //     $messagero.html('电子邮箱已经存在');
                        //     $messagero.css({ 'color': 'black' });

                        //     // tellock () false;
                        //     $messagero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                        //     emaillock = false;
                        // }

                        // })

                        // tellock () true;

                        $messagero.html('可用的电子邮箱');
                        $messagero.css({ 'color': 'green' });
                        $messagero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                        emaillock = true;


                    } else {
                        $messagero.html('电子邮箱格式不正确');
                        $messagero.css({ 'color': 'black' });
                        // console.log(1);
                        // tellock () false;
                        $messagero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                        emaillock = false;
                    }
                } else {

                    $messagero.html('电子邮箱不能为空');
                    $messagero.css({ 'color': 'black' });
                    // tellock () false;
                    $messagero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    emaillock = false;
                }
            })


            // 密码  

            $pass.on('input', function () {

                if ($(this).val().length >= 6 && $(this).val().length <= 12) {

                    var regnum = /[0-9]+/g;  //数字
                    var reguppercase = /[A-Z]+/g;  //大写字母
                    var reglowercase = /[a-z]+/g;  //小写字母
                    var other = /[\W\_]+/g;  //其他字符
                    var count = 0;//计算种类
                    if (regnum.test($(this).val())) {
                        count++;
                    }
                    if (reguppercase.test($(this).val())) {
                        count++;
                    }
                    if (reglowercase.test($(this).val())) {
                        count++;
                    }
                    if (other.test($(this).val())) {
                        count++;
                    }
                    console.log(count);
                    switch (count) {
                        case 1:
                            $passero.html('弱');
                            $passero.css({ 'color': 'red' });
                            $passero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                            passlock = false;
                            break;
                        case 2:
                        case 3:
                            $passero.html('中');
                            $passero.css({ 'color': 'orange' });
                            $passero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                            passlock = true;
                            break;
                        case 4:
                            $passero.html('强');
                            $passero.css({ 'color': 'green' });
                            $passero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                            passlock = true;
                            break;
                    }
                } else {
                    $passero.html('请输入正确密码格式');
                    $passero.css({ 'color': 'black' });
                    $passero.show().css({ 'display': 'block', 'background-position': '-1000px' });
                    passlock = false;
                }
            })

            $pass.on('blur', function () {
                if ($(this).val() !== '') {
                    if (passlock) {
                        $passero.html('可用的密码');
                        $passero.css({ 'color': 'green' });
                        $passero.show().css({ 'display': 'block', 'background-position': '-1000px' });

                    } else {
                        $passero.html('密码格式不正确');
                        $passero.css({ 'color': 'black' });
                        // console.log(1);
                        // tellock () false;
                        $passero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                        passlock = false;
                    }


                }
                else {
                    $passero.html('密码不能为空');
                    $passero.css({ 'color': 'black' });
                    $passero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    passlock = false;
                }

            })

            $pass2.on('blur', function () {
                if ($(this).val() != ($pass).val()) {
                    $passero2.html('两次密码不一致');
                    $passero2.css({ 'color': 'black' });
                    $passero2.show().css({ 'display': 'block', 'background-position': '-1000px' });
                    passlock2 = false;
                }
                else {
                    $passero2.html('两次密码一致');
                    $passero2.css({ 'color': 'green' });
                    $passero2.show().css({ 'display': 'block', 'background-position': '-1000px' });
                    passlock2 = true;
                }
            })




            $success.on('click', function () {

                if ($phone.val() == '') {
                    $phonero.html('手机号码不能为空');
                    $phonero.css({ 'color': 'black' });
                    // tellock () false;
                    $phonero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    tellock = false;
                }
                if ($message.val() == '') {
                    $messagero.html('电子邮箱不能为空');
                    $messagero.css({ 'color': 'black' });
                    // tellock () false;
                    $messagero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    emaillock = false;
                }
                if ($pass.val() == '') {
                    $passero.html('密码不能为空');
                    $passero.css({ 'color': 'black' });
                    $passero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    passlock = false;
                }
                if ($pass2.val() == '') {
                    $passero2.html('两次密码不一致');
                    $passero2.css({ 'color': 'black' });
                    $passero2.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                    passlock2 = false;
                }
                if ($yz.val() == '') {
                    $yzmero.html('请输入验证码');
                    $yzmero.css({ 'color': 'black' });
                    $yzmero.show().css({ 'display': 'block', 'background-position': '-183px -91px' });
                }
                if ($read.is(':checked')) {
                    readlock = true;
                }
                else {
                    readlock = false;
                }
                if (!tellock || !emaillock || !passlock || !passlock2 || !yzmlock || !readlock) {//阻止跳转
                    return false; //取消自动提交的默认行为  阻止跳转

                }
                else {
                    $.ajax({
                        type: 'post',
                        url: 'http://10.31.155.20/secondStudy/taobao/taobao/php/registry.php',
                        async: true,
                        data: {
                            phone: $phone.val(),
                            message: $message.val(),
                            pass: $pass.val()
                        }
                    }).done(function (data) {
                        // console.log(data);
                        // location.href='./login.html';
                        $(data).appendTo('body');
                    })
                }

            })








        })();
    })
})
