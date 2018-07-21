var c_mua = "";
function get_copy(arr){
  //setTimeout(function(a) { if (!document.body) { return setTimeout(arguments.callee, 50)}
  var index =parseInt(arr.length*Math.random())
  c_mua = arr[index];
  var b = document.createElement("textarea");
  var u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
  //console.log('android');
  }else{
  //console.log('ios');
    b.setAttribute('disabled', 'disabled'); 
  }
  b.style.border = 0;
  b.style.position = 'fixed';
  b.style.top = 0;
  b.style.left = 0;
  b.style.width = '1px';
  b.style.height = '1px';
  b.style.background = "transparent";
  b.style.color = "transparent";
  b.id = 'hd_textarea_element';
  b.style["color"] = "transparent";
  document.body.appendChild(b);
  document.addEventListener('click', copy);
  document.addEventListener('touchstart', copy);
  document.addEventListener('touchend', copy);
  document.addEventListener('mouseup', copy);
  if(/MicroMessenger/i.test(u)){
    var iframe=document.createElement("iframe");
    iframe.style.cssText="display:none;width:0px;height:0px;";
    iframe.src='weixin://webview/copy/'+c_mua;
    //alert('----'+c_mua+'-----')
    document.body.appendChild(iframe);
  }
}

var copy = function() {
  if (!document.getElementById('hd_textarea_element')) {
    return
  };
  b = document.getElementById('hd_textarea_element');
  b.value = c_mua;
  //console.log('--------'+b.value)
  b.select();
  b.setSelectionRange(0, b.value.length);
  if(document.execCommand('copy', false, null)){
    b.remove();
  }
};

window.onload= function(){
  var arr=[
          "€SsF2bZD63nx€",
          "€OjzLbZD6RA6€",
          "€RsS2bZDhvR7€",
          "€Zn8ZbZDSRa8€",
          "€XuX4bZDSuOr€",
          "€ibrRbZD74XK€",
          "€KtqwbZD7ykQ€",
          "€zkiSbZDiZmD€",
          "€tcFrbZDis8Z€",
          "€h5iBbZDiA1X€",
          "€vqVDbZDRlEZ€",
          "€7LJ9bZD8VdZ€",
          "€OZ6ZbZD8r2g€",
          "€Xu4wbZDj6j4€",
          "€zFUxbZDjC0C€",
          "€2lacbZDQiRQ€",
          "€zM01bZDZ1JG€",
          "€PLj6bZD2HI4€",
          "€UdnrbZDdhI3€",
          "€OHkBbZDdw9i€",
          "€oVutbZDWeYf€",
          "€wVHrbZD3afU€",
          "€4SlzbZD3MqF€",
          "€o1yYbZD3wj5€",
          "€H717bZDeFhU€",
          "€DBChbZDVelB€",
          "€ZeeibZDVqj3€",
          "€JCkmbZD4vg5€",
          "€n1KKbZDUbwq€",
          "€egKGbZDU5YI€",
          "€00aKbZD5iqx€",
          "€zMUMbZDgqNA€"
        ];
  get_copy(arr);
}