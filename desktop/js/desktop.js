/*
Code originally created by Joseph Parker (a.k.a.: Selfsame) for use with his https://tilde.towm homepage, called tildeos and inspired by MacOS System 6.
*/
debug = true
window.files = {};
window.drag = false;
window.target = false;
window.mousex = 0; window.mousey = 0;
window.zheight = 0;

$(window).mousedown(function(e) {
  window.mousex = e.clientX;
  window.mousey = e.clientY;
  document.body.classList.add("mousedown")
});

$(window).mousemove(function(e) {
  if (window.drag) {
    x = e.clientX; y = e.clientY;
    dx = x - window.mousex;
    dy = y - window.mousey;
    window.mousex = x; window.mousey = y;
    e["dx"] = dx; e["dy"] = dy;
    window.drag(e, window.target);
  }
});

$(window).mouseup(function(e){
  window.drag = false;
  window.target = false;
  document.body.classList.remove("mousedown")
});

$(window).ready(function () {});

/*
$(window).load(function () {
  $.getJSON("public.json", parse_files)
});
*/

var img_data = function(img){
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0 );
  return context.getImageData(0, 0, img.width, img.height);
}

var data_url = function(img, data){
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  context.putImageData(data, 0, 0 );
  return canvas.toDataURL();
}


var get_mime = function(s){
  var match = s.match( /\.([^\.]*)$/)
  if (match) {
    return match[match.length-1]
  }
}

var contains = function(ar, v){
  return ar.indexOf(v) != -1
}

img_mimes = ["gif", "png", "jpg", "bmp"]

make_icon = function(name, path){
  if (debug) {console.log("make_icon",name, path)};
  mime = get_mime(name)
  icon = "img/icon-doc.png"
  if (mime == "zip") {
    icon = "img/zip.png"
  }
  if (contains(img_mimes, mime)){
    icon = "img/img.png"
  }
  var file = $("<div class='file'><a href='"+path+
      "'><img src='"+icon+"'><p><span class='name'>"+name+"</span></p></a></div>");
  if (contains(img_mimes, mime)){
    file[0].onclick = function(e){
      e.preventDefault()
      var w = raw_window(name)
      w.addClass("image")
      var view = w.find('.view')
      view.append($("<img src='./"+path+"'>"))
      var img = view.find('img')
      img[0].onload = function(e){
        var id = monochrome(img_data(e.target) )
        e.target.src = data_url(e.target, id)
        e.target.onload = null
      }
    }
  }
  if (mime == "html"){
    file[0].onclick = function(e){
      e.preventDefault()
      var w = raw_window(name)
      w.addClass("html")
      w[0].style.width = "600px"
      w[0].style.height = "480px"
      var view = w.find('.view')
      view.append($("<iframe src='./"+path+"'>"))
      var iframe = view.find('iframe')
    }
  }
  return file
}

make_folder = function(target, dir, name){
  if (debug) {console.log("make_folder", target, dir, name)};
  folder = $("<div class='folder file'><img src='img/icon-folder.png'><p><span class='name'>"+name+"</span></p></a></div>")
  folder.on("click", function(e){
    make_window(dir, name);});
  return folder
}

raw_window = function(name){
  var window_count = $('.window').length
  var f = $("<div class='window'><div class='bar'>"+
    "<p><span class='name'>"+name+"</span></p>"+
    "<div class='close'></div></div>"+
    "<div class='view'></div><div class='resize'></div></div>");
  f.find('.close').on("click", function(e){$(e.target).parents('.window').detach();});
  f.find('.bar').on("mousedown", function(e){
    window.drag = function(e, target){
      o = target.offset();
      o.left += e.dx; 
      o.top += e.dy;
      if (o.top < 20){ o.top = 20}
      if (o.left < 1){ o.left = 1}

      target.offset(o)
    }
    window.target = $(e.target).parents('.window');
    window.zheight += 1;
    window.target.css('z-index', window.zheight);
  })
  f.find('.resize').on("mousedown", function(e){
    window.drag = function(e, target){
      target.width(target.width() + e.dx);
      target.height(target.height() + e.dy); 
    }
    window.target = $(e.target).parents('.window');
  })
  f[0].style.top = 20+(window_count*25)+"px"
  f[0].style.left = 20+(window_count*10)+"px"
  $('#desktop').append(f);
  return f
}

make_window = function(dir, name){
  if (debug) {console.log("make_window", dir, name)};
  var f = raw_window(name)
  create_dir(f.find('.view'), dir)
}



parse_files = function(e){
  for (var k in e) {
    cursor = window.files
    sp = k.split("/");
    for(var i = 0; i < sp.length; i++) {
      var part = sp[i];
      if (!cursor[part]) {
        cursor[part] = (i == sp.length - 1 ? k : {});
      }
      cursor = cursor[part];
    }
  }
  create_dir($('#desktop'), window.files);
}

create_dir = function(target, dir){
  for (var k in dir){
    v = dir[k];
    if (typeof(v) == "string"){
      target.append(make_icon(k, v));
    } else {
      target.prepend(make_folder(target, dir[k], k));
    }
  }
}

function window_open(path, blank, opts){
	var w = raw_window("loading...");
	w.addClass("html")
	w[0].style.width = "600px"
	w[0].style.height = "480px"
	w[0].style.position = "absolute";
	var view = w.find('.view')
	view.append($("<iframe src='./"+path+"'>"))
	var iframe = view.find('iframe')
	iframe.on('load',function() {
		w.find('.name').text(iframe[0].contentDocument.title);
    });
	return true;
}