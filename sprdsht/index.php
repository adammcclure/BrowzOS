<?php
$lang = "en";
if (!empty($_REQUEST["lang"])) $lang = $_REQUEST["lang"];
$url = "";
if (!empty($_REQUEST["url"])) $url = $_REQUEST["url"];

if ($url == "" and empty($_REQUEST["mode"])) {
  $url = "spreadsheet.js";
  if ($lang == "de") $url = "spreadsheet.js";
}
$init_data = "";
if (strpos("@".$url,"http://")==1 or strpos("@".$url,"https://")==1 or dirname($url)=="examples") {
  $init_data = @file_get_contents($url);
  if (!$init_data) $init_data = "\n\nCannot load ".$url;
}
header("Content-Type: text/html; charset=utf-8");

?>
<html>
<head>
  <title>Spreadsheet</title>
  <link media="all" href="styles.css" rel="stylesheet" type="text/css">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <script src="translations/<?php echo $lang; ?>.js" type="text/javascript"></script>
  <script src="spreadsheet.js" type="text/javascript"></script>
  <script src="json.js" type="text/javascript"></script>
<!--[if IE]>
<script type="text/javascript">
self.resizeTo(screen.width,450);
self.moveTo(0,30);</script>
<![endif]--> 
</head>
<body onmouseover="showHeaderFooter(true);">
<div class="data" id="data"></div>
<div id="source" align="center">
<script type="text/javascript">
var out = "";
out += trans("Simple Spreadsheet code / CSV data / Tab separated values (copy/paste from Excel):");
document.write(out);
</script>
<br><textarea id="code" wrap="off"><?php
  echo htmlspecialchars($init_data,ENT_QUOTES);
?></textarea><br>
<script type="text/javascript">
var out = "";
out += '<table class="default_table" id="nav_table_readonly" style="display:none; width:50%; text-align:center;">';
out += '<tr><td><input type="button" value="'+trans("Cancel")+'" onclick="cancelLoad();"></td></tr>';
out += '</table>';

out += '<table class="default_table" id="nav_table" style="width:50%;">';
out += '<tr><td colspan="2"><input type="button" value="'+trans("Load")+'" onclick="load(getObj(\'code\').value);" style="width:100%;"></td><td><input type="button" value="'+trans("Cancel")+'" onclick="cancelLoad();"></td></tr>';
out += '<tr><td>'+trans("Url")+'</td>';
out += '<td style="width:100%;"><input type="Text" id="code_url" value="" style="width:100%;"></td>';
out += '<td><input type="button" value="'+trans("Load")+'" onclick="document.location=\'spreadsheet.php?lang=en&url=\'+getObj(\'code_url\').value;"></td>';
out += '</tr></table>';

document.write(out);

<?php
if (!empty($_REQUEST["mode"]) and $_REQUEST["mode"]=="viewer") {
  echo '
    isWriteable = false;
	getObj("code").readOnly = true;
	getObj("nav_table").style.display = "none";
	getObj("nav_table_readonly").style.display = "";
    getObj("code").value = top.getObj("'.$_REQUEST["data"].'").value;
    load(getObj("code").value);
	showHeaderFooter(false);
  ';
} else if (!empty($_REQUEST["mode"]) and $_REQUEST["mode"]=="editor") {
  echo '
    saveMethod = "";
    getObj("code").value = top.getObj("'.$_REQUEST["data"].'").value;
    load(getObj("code").value);
  ';
} else {
  echo 'load(getObj("code").value);';
}
?>
</script>
</div>
</body>
</html>