var productos = {
  libros: [{
    Nombre: 'Tuareg',
    Categoria: 'Novelas',
    Precio: '$255',
    puntos: 'El ateneo',
    img: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Tuareg_novel_-_bookcover.jpg'
  }, {
    Nombre: 'Cuentos Completos',
    Categoria: 'Cuentos',
    precio: '$500',
    puntos: 'Gral. Las heras',
    img: 'http://content.cuspide.com/getcover.ashx?ISBN=9789500738651&size=3&coverNumber=1&id_com=1113'
  }, {
    Nombre: 'Mil y una noches',
    Categoria: 'Cuentos',
    Precio: '$1500',
    puntos: 'La calle',
    img: 'http://lengua.laguia2000.com/wp-content/uploads/2014/03/mil.jpg'
  }],
  discos: [{
    Nombre: 'La mosca y la sopa',
    Categoria: 'Rock',
    precio: '$10',
    puntos: 'Zelig!',
    img: 'https://i.ytimg.com/vi/MQf-Cbsxk1M/mqdefault.jpg'
  }, {
    Nombre: 'Let it be',
    Categoria: 'Rock',
    Precio: '$250',
    puntos: 'The cave',
    img: 'http://d817ypd61vbww.cloudfront.net/sites/default/files/styles/media_responsive_widest/public/tile/image/original_459.jpg?itok=OGwy4GrW'
  }, {
    Nombre: 'Giros',
    Categoria: 'Rock Nacional',
    Precio: '$350',
    puntos: 'Disqueria',
    img: 'http://img2.wikia.nocookie.net/__cb20111212132013/lyricwiki/images/e/e2/Fito_P%C3%A1ez_-_Giros.jpg'
  }]
}
var num=0
for (var key in productos) {
  productos[key].forEach(add_to_page)
}

function add_to_page(producto){
    $("#contenido").append('\
        <div id=item'+num+' class="producto thumbnail">\
        <div class="row">\
          <div class="img col-sm-2">\
              <img class=img-thumbnail src='+producto.img+' alt="" />\
              </div>\
              <div class="info col-sm-10">\
              </div></div></div>')
          for(var key in producto){
            if(key!=="img"){
  $("#item"+num+" .info").append('<div class="'+key.toLowerCase()+'">\
      <span> '+producto[key]+'</span>\
    </div>')
  }
  }
  num++
  }

function create_navbar(){
  $("#productos-nav").empty()
for(var key in productos){
  $("#productos-nav").append('<li><a class=identi id='+key+' href="#">'+key+"</a></li>")
}
}

$("body").on("click", ".identi", function(){
  $(".categorias").show()
  $(".formulario").hide()
  $("li").removeClass("active")
  $(this).parent().addClass("active")
  $("#contenido").empty()
    num=0
  if($(this).hasClass("vertodo")){
    for (var key in productos) {
      productos[key].forEach(add_to_page)
  }
}else if($(this).attr("id")==="agregar"){
  $(".categorias").hide()
  $(".formulario").show()
  addCategory()
}else{
productos[$(this).attr("id")].forEach(add_to_page)
}
})

create_navbar()


$("#submit").click(function() {
    if (!($("#newone").val() && $("#titulo").val() && $("#titulo").val() && $("#categoria").val() && $("#precio").val() && $("#puntos").val())){
        $("#alert").show()
    } else {
        $("#alert").hide()
        if ($("#tipo").val() === "otro") {
            productos[$("#newone").val()] = []
            productos[$("#newone").val()].push({
                Nombre: $("#titulo").val(),
                Categoria: $("#categoria").val(),
                Precio: $("#precio").val(),
                puntos: $("#puntos").val().split(" ,"),
                imagen: $("#imagen").val()
            })


            $(".input").val("")
            addCategory()


        } else {
            productos[$("#tipo").val().toLowerCase()].push({
                titulo: $("#titulo").val(),
                Categoria: $("#categoria").val(),
                Precio: $("#precio").val(),
                "Saling Points": $("#puntos").val().split(" ,"),
                imagen: $("#imagen").val()

            })

            $(".input").val("")
            $("#newone").val("-")

        }
        create_navbar()

    }
})

$("#tipo").change(function(){
  if($("#tipo").val()!=="otro"){
    $("#nuevo").hide()
    $("#newone").val("-")
  }
  else{
    $("#nuevo").show()
    $("#newone").val("")

  }
})

// $("body").mousemove(function(){
//   if($("body").innerHeight()<600){
//     $("#footer").addClass("absolute").removeClass("relative")
//   }else{
//     $("#footer").removeClass("absolute").addClass("relative")
//
//   }
// })

$("*").on("click keydown", function(){
  $("body").mousemove()
})
$(window).resize(function(){
  $("body").mousemove()
})

$("#search").click(function(){
  $("#contenido").empty()
    $("li").removeClass("active")
  for (var key in productos) {
    for (var i = 0; i < productos[key].length; i++) {
      if(coincidencia(productos[key][i])){
        add_to_page(productos[key][i])
      }
    }

}

})

function coincidencia(producto){
  if((producto["Nombre"]).toLowerCase().match($("#inputSearch").val().toLowerCase())||(producto["Categoria"].toLowerCase()).match($("#inputSearch").val().toLowerCase())){
    return true
  }
  return false
}

$("#inputSearch").on("change keyup",function(event){

    $("#search").click()

})

function addCategory(){
  $("option:not(#otro)").remove()
for(key in productos){
  $("<option>" + capitalize(key) + "</option>").insertBefore("#otro")
}
$("#tipo").val($("#tipo option:first-of-type").val()).change()
}

function capitalize(string){
  return string[0].toUpperCase()+string.slice(1)
}
