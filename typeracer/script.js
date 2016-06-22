
    var pocisionActual
    var palabraActual
    var userInput
    var seconds
    var frases=[
      "Hola esta es una oracion random del typeracer, si juegas otra vez apareceran nuevas frases para completar",
      "Cada frase que ves surge de un arreglo de frases, que corre una funcion que apendea cada palabra entre spans",
      "Las frases aparecen usando el metodo Math.random y una vez que sale una frase no se vuelve a repetir",
      "Si completas todas las frases no podras jugar otra vez y tendras que refreshear la página"
  ]

  function elegirFrase(){
    var num=Math.floor(Math.random()*frases.length)
    return frases.splice(num, 1)[0]
  }

  function appendearFrase(){
    var frase =elegirFrase()
    var arregloFrase=frase.split(" ")
    for (var i = 0; i < arregloFrase.length; i++) {
      arregloFrase[i]="<span id="+i+">"+arregloFrase[i]+(i===arregloFrase.length-1?".":" ")+"</span>"
    }
    $(".frase").html(arregloFrase.join(""))
  }




    var init= function(){
      appendearFrase()
      seconds=0
      pocisionActual=0
      timer = setInterval(function(){
        seconds++
      },1000 )
      $("#resultado").hide()
      $("#juego").show()
      $("#userInput").focus()
    }

    init()
    $("button").click(init)

    var avanzar= function(){
    palabraActual=$("#"+pocisionActual).text()
    userInput=$("#userInput").val()
    if(palabraActual===userInput){
      $("#"+pocisionActual).removeClass("palabraActual")
      pocisionActual++
      $("#userInput").val("")
      $("span").removeClass("error")
    }
    $("#"+pocisionActual).addClass("palabraActual")
    }
    var ganar=function(){
      if(pocisionActual===$("span").length){
        $("#juego").hide()
        clearInterval(timer)
        $("#resultado").show()
        $("#tiempo").text("Lo has logrado en "+seconds+" segundos.")
        $("#velocidad").text("Escribes a una velocidad de " +Math.round(($("span").length*60)/seconds)+" palabras por minuto")
        if(!frases.length){
          $("button").hide()
          $("<p>").appendTo("#resultado").text("El juego a terminado! Ya no nos quedan mas frases!")
        }
      }
    }
    var comparador= function(){
      if(palabraActual.slice(0,userInput.length)!==userInput){
        $("#userInput, #"+pocisionActual).addClass("error")
        $("#mensaje").show()
      }else{
        $("#userInput, #"+pocisionActual).removeClass("error")
        $("#mensaje").hide()
      }
    }

    $("#userInput").keyup(function(){
      avanzar()
      ganar()
      comparador()
    })
