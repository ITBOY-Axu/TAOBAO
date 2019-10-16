<?php

include "conn.php";//连接数据库

if(isset($_POST['message']) && isset($_POST['pass'])&&($_POST['phone'])){
    $email=$_POST['message'];
    $pass=sha1($_POST['pass']);
    $phone=$_POST['phone'];
    $result=$conn->query("select * from registry where email='$email' and password='$pass' and phone='$phone' ");

    if($result->fetch_assoc()){
        echo true;//用户名和密码存在
    }else{
        echo false;
    }

}else{
    exit('非法操作');
}