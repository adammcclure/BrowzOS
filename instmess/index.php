<?php

require_once dirname(__FILE__)."/src/phpfreechat.class.php";
$params = array();
$params["title"] = "Instant Messenger";
//Uncomment the below code to enable administrator user accounts. Be sure to change
//usernames/passwords & set the "isadmin" parameter to false before use.
//$params["admins"] = array("Administrator" => "PassWord","UserName" => "LogIn");
$params["theme"] = "phpbb2";
$params["nickmarker"] = false;
$params["frozen_nick"] = true;
$params["display_pfc_logo"] = false;
$params["quit_on_closedwindow"] = true;
$params["focus_on_connect"] = true;
$params["channels"] = array("Channel 1","Channel 2","Channel 3","Channel 4","Channel 5");
//Set the below code to false in order to halt administration rights to all users. This
//does not affect administrator user accounts listed in the "admins" parameter.
$params["isadmin"] = true;
$params["skip_proxies"] = array("censor");
$params["max_msg"] = 0;
$params["timeout"] = 3600000;
$params["height"] = "225px";
$params["serverid"] = md5(__FILE__); // calculate a unique id for this chat
//$params["debug"] = true;
$chat = new phpFreeChat( $params );

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <title>Instant Messenger</title>
<!--[if IE]>
<script type="text/javascript">
self.resizeTo(screen.width,450);
self.moveTo(0,40);</script>
<![endif]--> 
  <style type="text/css">
 body {
  background-color: #000000;
  color: #748DE7;
 }
 :link { color: #00FFFF }
</style>
 </head>
 <body>
  <?php $chat->printChat(); ?>
</body></html>
