<?php include("desktop/login.php"); ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<title>BrowzOS</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta name="description" content="BrowzOS consists of sevearl JavaScrip components, all behaving like an actual operating system.">
<script type="text/javascript" src="desktop/js/jquery.js"></script>
<script type="text/javascript" src="desktop/js/interface.js"></script>
<script type="text/javascript" src="desktop/js/drag.js"></script>
<script type="text/javascript">
function disp_alert()
{alert("BrowzOS � 2008-2011 by TechEmporium. All rights reserved." + '\n' + '\n' + '\t' + "This software is in the public domain." + '\n');}
</script>
<script type="text/javascript">
window.moveTo(0,0);
window.resizeTo(screen.availWidth,screen.availHeight);
</script>
<!--[if IE]>
 <style type="text/css">
 img {behavior: url(desktop/desk_png.htc);}
 </style>
<![endif]-->
<link href="desktop/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--bottom dock -->
<div class="dock" id="dock2">
<div class="dock-container2">
<a class="dock-item2" href="#" onclick="window.open('rte/','_blank','width=screen.width,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=20,left=0,resizable=0'); return false;"><span>Word Processor</span><img src="desktop/dock/wproc.gif" alt="rte"></a>
<a class="dock-item2" href="#" onclick="window.open('sprdsht/index_offline.html','_blank','width=screen.width,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=30,left=0,resizable=0'); return false;"><span>Spreadsheet</span><img src="desktop/dock/sprdsht.gif" alt="sprdsht"></a>
<a class="dock-item2" href="#" onclick="window.open('calc/','_blank','width=550,height=410,scrollbars=0,status=0,menubar=0,toolbar=0,top=100,left=100,resizable=0'); return false;"><span>Scientific Calculator</span><img src="desktop/dock/calc.gif" alt="calc"></a>
<a class="dock-item2" href="#" onclick="window.open('web/','_blank','width=screen.width,height=350,scrollbars=1,status=1,menubar=1,toolbar=1,location=1,top=10,left=0,resizable=1'); return false;"><span>Web Browser</span><img src="desktop/dock/inet.gif" alt="inet"></a>
<a class="dock-item2" href="#" onclick="window.open('instmess/index_offline.html','_blank','width=550,height=200,scrollbars=0,status=0,menubar=0,toolbar=0,top=60,left=60,resizable=0'); return false;"><span>Instant Messenger</span><img src="desktop/dock/chat.gif" alt="chat"></a>
<a class="dock-item2" href="#" onclick="window.open('games/','_blank','width=675,height=410,scrollbars=0,status=0,menubar=0,toolbar=1,top=50,left=100,resizable=0'); return false;"><span>Games</span><img src="desktop/dock/games.gif" alt="games"></a>
<a class="dock-item2" href="#" onclick="window.open('media/','_blank','width=450,height=410,scrollbars=0,status=0,menubar=0,toolbar=0,top=100,left=200,resizable=0'); return false;"><span>Media Player</span><img src="desktop/dock/media.gif" alt="media"></a>
<a class="dock-item2" href="#" onclick="window.open('bzcmd/','_blank','width=800,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=50,left=50,resizable=0'); return false;"><span>Command Line</span><img src="desktop/dock/term.gif" alt="term"></a>
<a class="dock-item2" href="#" onclick="window.open('sample_app/','_blank','width=800,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=50,left=50,resizable=0'); return false;"><span>Sample &quot;Application&quot;</span><img src="desktop/dock/sample.gif" alt="sample"></a>
<a class="dock-item2" href="#" onclick="window.open('help_offline/','_blank','width=800,height=450,scrollbars=1,status=0,menubar=0,toolbar=1,top=0,left=100,resizable=0'); return false;"><span>Help</span><img src="desktop/dock/help.gif" alt="help"></a>
<a class="dock-item2" href="#" onclick="window.open('forum/','_blank','width=600,height=300,scrollbars=1,status=0,menubar=0,toolbar=0,top=70,left=50,resizable=0'); return false;"><span>Forum</span><img src="desktop/dock/forum.gif" alt="forum"></a>
<a class="dock-item2" href="#" onclick="window.open('clock/','_blank','width=245,height=475,scrollbars=0,status=0,menubar=0,toolbar=0,top=30,left=30,resizable=0'); return false;"><script type="text/javascript" src="desktop/js/clock.js"></script><span id="clockbox"></span><img src="desktop/dock/time.gif" alt="time"></a>
<a class="dock-item2" href="#" onclick="disp_alert()"><span>About BrowzOS</span><img src="desktop/dock/info.gif" alt="info"></a>
<a class="dock-item2" href="desktop.php?logout=1"><span>Log Off</span><img src="desktop/dock/logout.gif" alt="info"></a>
</div>
</div>
<!--dock menu JS options -->
<script type="text/javascript">
$(document).ready(
function()
{
$('#dock2').Fisheye(
{
maxWidth: 75,
items: 'a',
itemsText: 'span',
container: '.dock-container2',
itemWidth: 50,
proximity: 80,
alignment : 'left',
valign: 'bottom',
halign : 'center'
})});</script>
<div id="i2" style="position:absolute; top:30px; left:200px; width:32px; height:32px;">
<dl>
<dt><img src="desktop/drag/wproc.gif" width="48" height="48" align="left" alt="wproc"></dt>
<dt><font size="2"><a href="#" onclick="window.open('rte/','_blank','width=screen.width,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=20,left=0,resizable=0'); return false;">Word Processor</a></font></dt>
</dl>
</div>
<div id="i3" style="position:absolute; top:30px; left:450px; width:96px; height:51px;">
<dl>
<dt><img src="desktop/drag/sprdsht.gif" width="48" height="48" align="left" alt="spreadsheet"></dt>
<dt><font size="2"><a href="#" onclick="window.open('sprdsht/index_offline.html','_blank','width=screen.width,height=450,scrollbars=0,status=0,menubar=0,toolbar=0,top=30,left=0,resizable=0'); return false;">Spreadsheet</a></font></dt>
</dl>
</div>
<div id="i4" style="position:absolute; top:30px; left:700px; width:32px; height:32px;">
<dl>
<dt><img src="desktop/drag/calc.gif" width="48" height="48" align="left" alt="calc"></dt>
<dt><font size="2"><a href="#" onclick="window.open('calc/','_blank','width=550,height=410,scrollbars=0,status=0,menubar=0,toolbar=0,top=100,left=100,resizable=0'); return false;">Scientific Calculator</a></font></dt>
</dl>
</div>
<div id="i5" style="position:absolute; top:130px; left:200px; width:32px; height:32px;">
<dl>
<dt><img src="desktop/drag/inet.gif" width="48" height="48" align="left" alt="inet"></dt>
<dt><font size="2"><a href="#" onclick="window.open('web/','_blank','width=screen.width,height=350,scrollbars=1,status=1,menubar=1,toolbar=1,location=1,top=10,left=0,resizable=1'); return false;">Web Browser</a></font></dt>
</dl>
</div>
<div id="i6" style="position:absolute; top:130px; left:450px; width:32px; height:32px;">
<dl>
<dt><img src="desktop/drag/chat.gif" width="48" height="48" align="left" alt="chat"></dt>
<dt><font size="2"><a href="#" onclick="window.open('instmess/index_offline.html','_blank','width=550,height=200,scrollbars=0,status=0,menubar=0,toolbar=0,top=60,left=60,resizable=0'); return false;">Instant Messenger</a></font></dt>
</dl>
</div>
<div id="i7" style="position:absolute; top:130px; left:700px; width:32px; height:32px;">
<dl>
<dt><img src="desktop/drag/media.gif" width="48" height="48" align="left" alt="vid"></dt>
<dt><font size="2"><a href="#" onclick="window.open('media/','_blank','width=450,height=410,scrollbars=0,status=0,menubar=0,toolbar=0,top=100,left=200,resizable=0'); return false;">Media Player</a></font></dt>
</dl>
</div>
<table style="border-collapse: collapse;" summary="layout" id="table2" cellpadding="0" width="100%">
<tr>
<td width="100%" style="border-left-style: none; border-left-width: medium; border-top-style: none; border-top-width: medium; border-bottom-style: none; border-bottom-width: medium" height="80%">
<script type="text/javascript">
new dragElement('i2');
new dragElement('i3');
new dragElement('i4');
new dragElement('i5');
new dragElement('i6');
new dragElement('i7');
</script>
</td></tr></table></body></html>