<?php
include "conn.php"; //引入数据库连接文件
if (isset($_POST['phone'])) { //获取用户名
    $phone = @$_POST['phone']; //取值
    // $message = @$_POST['message'];
    $phoneresult = $conn->query("select * from registry where phone='$phone'"); //如果能够找到记录，用户名存在的
    // $messageresult = $conn->query("select * from registry where email='$message'");
    // echo($phone);
    // echo((    $message ));
    // echo($phoneresult->fetch_assoc());
    // echo(($messageresult->fetch_assoc()));

    if (($phoneresult->fetch_assoc())) { //如果$result->fetch_assoc()有值，返回true,否则就是false;
        echo true; //1 存在
    } else {
        echo false;
    }
} else {
    exit('非法操作'); //输出非法操作，终止程序
}
//将表单的值接收，放入数据库。
if (isset($_POST['phone']) && isset($_POST['message']) && isset($_POST['pass'])) { //点击了注册按钮
    // echo (1);
    $phone = $_POST['phone'];
    $pass = sha1($_POST['pass']);
    $email = $_POST['message'];
    $conn->query("insert  registry values(null,'$phone','$pass','$email')");
    // header('location:localhost/secondStudy/taobao/src/login.html'); //php的跳转
    echo "<script>alert('注册成功'); window.setTimeout(location.href='http://10.31.155.20/secondStudy/taobao/taobao/src/login.html',2000); </script>";
}
