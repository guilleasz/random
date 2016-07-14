// $(window).load(function(){
//   var altura=0
// for(var i=0; i<$(".product").length; i++){
//   if(altura<$($(".product")[i]).innerHeight()){
//     altura=$($(".product")[i]).innerHeight()
//   }
// }
// $(".product").css("height", altura)
// })



$(window).on("load resize", function(){
$(".thumbpropio").css("height",$(".thumbpropio").innerWidth())
for(var i=0; i<$(".thumbpropio>img").length; i++){
  if($($(".thumbpropio>img")[i]).innerWidth()<$($(".thumbpropio>img")[i]).innerHeight()){
    $($(".thumbpropio>img")[i]).css({
      height: "100%",
      width: "auto"
    })
  }
}
})
