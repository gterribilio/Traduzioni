function resize() {
  var h = $(window).height();
  var w = $(window).width();
  $("section, header").css({"width": w, "height": h});
}

$(window).on("load resize scroll",function(e){
   resize();
});