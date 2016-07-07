

$("input").keypress(function(e){
  if(e.keyCode===13){
    $("ul").append($("<li>").append($("<span class='delete'>").append($("<i class='fa fa-trash'>")), $(this).val()))
    $("input").val("")
  }
})
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed")
})

$("ul").on("click", ".delete", function(event){
  $(this).parent().fadeOut(500, function(){$(this).remove()})
  event.stopPropagation()
})

$(".fa-plus").click(function(){
  $(".inputCont").slideToggle(600)

})
