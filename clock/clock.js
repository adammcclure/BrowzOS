<!--
ns4 = (navigator.appName.indexOf("Netscape")>=0 && document.layers)? true : false;
ie4 = (document.all && !document.getElementById)? true : false;
ie5 = (document.all && document.getElementById)? true : false;
ns6 = (document.getElementById && navigator.appName.indexOf("Netscape")>=0 )? true: false;
var mx=0;
var my=0;
var outer;
var now=new Date(); 
var ringX=new Array();
var ringY=new Array();
ringX[7]=[80,94,100,94,77,53,28,11,5,11,28,53];
ringY[7]=[8,26,50,74,91,97,91,74,50,26,8,2];
var hours=new Array();
var minutes=new Array();
var seconds=new Array();
var txt=(ns4)? '<table cellpadding=0 cellspacing=0><tr><td width="117" height="117"><ilayer name="outer" height="117" width="117">' : '<div id="outer" style="position:relative; width:117px; height:117px; visibility:visible">';
txt+='<img src="face.gif">';
for(i=1;i<=7;i++)txt+=(ns4)? '<layer name="sec'+i+'" top="-100" left="0" bgcolor="black" width="6" height="6"></layer>' : '<div id="sec'+i+'" style="position:absolute; top:-100px; left:-100px; width:6px; height:6px; background-color:black; font-size:6px;"></div>';
for(i=1;i<=6;i++)txt+=(ns4)? '<layer name="min'+i+'" top="-100" left="0" bgcolor="blue" width="6" height="6"></layer>' : '<div id="min'+i+'" style="position:absolute; top:-100px; left:-100px; width:6px; height:6px; background-color:blue; font-size:6px;"></div>';
for(i=1;i<=5;i++)txt+=(ns4)? '<layer name="hrs'+i+'" top="-100" left="0" bgcolor="red" width="6" height="6"></layer>' : '<div id="hrs'+i+'" style="position:absolute; top:-100px; left:-100px; width:6px; height:6px; background-color:red; font-size:6px;"></div>';
txt+=(ns4)? '</ilayer></td></tr></table>' : '</div>';
document.write(txt);
function runclock(){
now=new Date();
now.hrs=now.getHours();
now.min=now.getMinutes();
now.sec=now.getSeconds();
if(now.hrs==12)now.hrs=0;
now.hrs=(now.hrs>12)? now.hrs-12 : now.hrs;
now.hrs=Math.floor((now.hrs*5)+(now.min/12));
for(n=0;n<hours.length;n++)moveid(hours[n], ringX[n][now.hrs], ringY[n][now.hrs]);
for(n=0;n<minutes.length;n++)moveid(minutes[n], ringX[n][now.min], ringY[n][now.min]);
for(n=0;n<seconds.length;n++)moveid(seconds[n], ringX[n][now.sec], ringY[n][now.sec]);
}
function moveid(id,x,y){
if(ns4)id.moveTo(x,y);
else{
id.style.left=x+'px';
id.style.top=y+'px';
}}
// FUNCTION TO FIND NESTED LAYERS IN NS4 BY MIKE HALL
function findlayer(name,doc){
var i,layer;
for(i=0;i<doc.layers.length;i++){
layer=doc.layers[i];
if(layer.name==name)return layer;
if(layer.document.layers.length>0)if((layer=findlayer(name,layer.document))!=null)return layer;
}
return null;
}
function getid(idstr){
if(ns4) return findlayer(idstr, document);
if(ie4) return document.all[idstr];
else return document.getElementById(idstr);
}
window.onload=function(){
  for(i=1;i<=5;i++)hours[i-1]=getid('hrs'+i);
  for(i=1;i<=6;i++)minutes[i-1]=getid('min'+i);
  for(i=1;i<=7;i++)seconds[i-1]=getid('sec'+i);
  outer=getid('outer');
  var cnt=[0];
  var radius=6;
  var result=new Array();
  for(i=1;i<=60;i++){
  cnt[i]=cnt[i-1]+((Math.PI*2)/60);
  cnt[i-1]+=Math.PI/180;
  }
  for(num=0;num<=6;num++){
  ringX[num]=new Array();
  ringY[num]=new Array();
  for(i=1;i<=60;i++){
  result=((i-15)<0)? 60+i-15 : i-15;
  ringX[num][i]=Math.floor((num*radius*Math.cos(cnt[result]))+56);
  ringY[num][i]=Math.floor((num*radius*Math.sin(cnt[result]))+55);
  }
  ringX[num][0]=ringX[num][60];
  ringY[num][0]=ringY[num][60];
  }
  setInterval('runclock()',100);
}

window.onresize=function(){
  if(ns4)setTimeout('history.go(0)',300);
}
//-->