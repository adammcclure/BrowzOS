<!--
var _info = navigator.userAgent;
var _ns = false;
var _ns6 = false;
var _ie = (_info.indexOf("MSIE") > 0 && _info.indexOf("Win") > 0 && _info.indexOf("Windows 3.1") < 0);
if (_info.indexOf("Opera") > 0) _ie = false;
var _ns = (navigator.appName.indexOf("Netscape") >= 0 && ((_info.indexOf("Win") > 0 && _info.indexOf("Win16") < 0) || (_info.indexOf("Sun") > 0) || (_info.indexOf("Linux") > 0) || (_info.indexOf("AIX") > 0) || (_info.indexOf("OS/2") > 0) || (_info.indexOf("IRIX") > 0)));
var _ns6 = ((_ns == true) && (_info.indexOf("Mozilla/5") >= 0));
if (_ie == true) {
  document.writeln('<object code="jchess.class" archive="jchess.zip" height=375 name=jchess width=375 VIEWASTEXT>');
}
else if (_ns == true && _ns6 == false) { 
  // BEGIN: Update parameters below for NETSCAPE 3.x and 4.x support.
  document.write('<EMBED ');
  document.write('WIDTH="375" ');
  document.write('HEIGHT="375" ');
  document.write('fen="">');
  document.write('bgcolor="">');
  document.write('color="">');
  document.write('whtfld="">');
  document.write('blkfld="">');
  document.write('brdwidth="289">');
  document.write('brdheight="289">');
  document.write('but1txt="Settings">');
  document.write('but2txt="Move Now">');
  document.write('but3txt="New">');
  document.write('but4txt="About">');
  document.write('msgline1txt="depth={0} time={1} nodes={2} score={3}">');
  document.write('Level="0,5000,99">');
  document.write('flip="0">');
  document.write('<NOEMBED>');
  // END
}
else {
  document.writeln('<APPLET code="jchess.class" archive="jchess.zip" height=375 name=jchess width=375 VIEWASTEXT>');
}
  document.writeln('<PARAM NAME="fen" VALUE="">');
  document.writeln('<PARAM NAME="bgcolor" VALUE="">');
  document.writeln('<PARAM NAME="color" VALUE="">');
  document.writeln('<PARAM NAME="whtfld" VALUE="">');
  document.writeln('<PARAM NAME="blkfld" VALUE="">');
  document.writeln('<PARAM NAME="brdwidth" VALUE="289">');
  document.writeln('<PARAM NAME="brdheight" VALUE="289">');
  document.writeln('<PARAM NAME="but1txt" VALUE="Settings">');
  document.writeln('<PARAM NAME="but2txt" VALUE="Move Now">');
  document.writeln('<PARAM NAME="but3txt" VALUE="New">');
  document.writeln('<PARAM NAME="but4txt" VALUE="About">');
  document.writeln('<PARAM NAME="msgline1txt" VALUE="depth={0} time={1} nodes={2} score={3}">');
  document.writeln('<PARAM NAME="Level" VALUE="0,5000,99">');
  document.writeln('<PARAM NAME="flip" VALUE="0">');

// END
if (_ie == true) {
  document.writeln('</OBJECT>');
}
else if (_ns == true && _ns6 == false) {
  document.writeln('</NOEMBED></EMBED>');
}
else {
  document.writeln('</APPLET>');
}
//-->