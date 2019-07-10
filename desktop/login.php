<?php
// Add/change usernames & passwords below.
$LOGIN_INFORMATION = array(
  'Administrator' => 'PassWord',
  'UserName' => 'LogIn'
);
// request login? true - show login and password boxes, false - password box only
define('USE_USERNAME', true);
// User will be redirected to this page after logout
define('LOGOUT_URL', 'desktop.php');
// time out after NN minutes of inactivity. Set to 0 to not timeout
define('TIMEOUT_MINUTES', 0);
// This parameter is only useful when TIMEOUT_MINUTES is not zero
// true - timeout time from last activity, false - timeout time from login
define('TIMEOUT_CHECK_ACTIVITY', true);
// show usage example
//if(isset($_GET['help'])) {
//  die('Include following code into every page you would like to protect, at the very beginning (first line):<br>&lt;?php include("' . str_replace('\\','\\\\',__FILE__) . '"); ?&gt;');
//}
// timeout in seconds
$timeout = (TIMEOUT_MINUTES == 0 ? 0 : time() + TIMEOUT_MINUTES * 60);
// logout?
if(isset($_GET['logout'])) {
  setcookie("verify", '', $timeout, '/'); // clear password;
  header('Location: ' . LOGOUT_URL);
  exit();
}
if(!function_exists('showLoginPasswordProtect')) {
// show login form
function showLoginPasswordProtect($error_msg) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>BrowzOS</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="description" content="BrowzOS, like any other operating system, can use account information for users to log in." />
<!--[if IE]>
<script type="text/javascript">
self.resizeTo(screen.width,screen.height);
self.moveTo(0,0);</script>
 <style type="text/css">
 .dock img {behavior: url(desktop/iepngfix.htc);}
 </style>
<![endif]-->
<link href="desktop/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div style="width:500px; margin-left:auto; margin-right:auto; text-align:center">
  <form method="post">
    <h1>Please log into your user account</h1>
<?php if (USE_USERNAME) echo 'Username:<br /><input type="text" name="access_login" /><br />Password:<br />'; ?>
    <input type="password" name="access_password" /><p></p><input type="submit" name="Submit" value="Log in" />
    <p></p>
    <?php echo $error_msg; ?><br />
  </form>
  </div>
</body>
</html>
<?php
  // stop at this point
  die();
}
}
// user provided password
if (isset($_POST['access_password'])) {

  $login = isset($_POST['access_login']) ? $_POST['access_login'] : '';
  $pass = $_POST['access_password'];
  if (!USE_USERNAME && !in_array($pass, $LOGIN_INFORMATION)
  || (USE_USERNAME && ( !array_key_exists($login, $LOGIN_INFORMATION) || $LOGIN_INFORMATION[$login] != $pass ) ) 
  ) {
    showLoginPasswordProtect("The account information you have provided is incorrect. Please try again.");
  }
  else {
    // set cookie if password was validated
    setcookie("verify", md5($login.'%'.$pass), $timeout, '/');
    
    // Some programs (like Form1 Bilder) check $_POST array to see if parameters passed
    // So need to clear password protector variables
    unset($_POST['access_login']);
    unset($_POST['access_password']);
    unset($_POST['Submit']);
  }
}
else {
  // check if password cookie is set
  if (!isset($_COOKIE['verify'])) {
    showLoginPasswordProtect("");
  }
  // check if cookie is good
  $found = false;
  foreach($LOGIN_INFORMATION as $key=>$val) {
    $lp = (USE_USERNAME ? $key : '') .'%'.$val;
    if ($_COOKIE['verify'] == md5($lp)) {
      $found = true;
      // prolong timeout
      if (TIMEOUT_CHECK_ACTIVITY) {
        setcookie("verify", md5($lp), $timeout, '/');
      }
      break;
    }
  }
  if (!$found) {
    showLoginPasswordProtect("");
  }
}
?>