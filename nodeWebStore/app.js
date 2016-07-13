var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose")

    mongoose.connect("mongodb://localhost/web_store")
    app.set("view engine", "ejs")
    app.use(express.static("public"))
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(methodOverride("_method"))

    var productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      description: String,
      stock: Number,
      image: String,
      available: Boolean
    })

    var Product= mongoose.model("Product", productSchema)

    app.get("/", function(req, res){
      res.redirect("/products")
    })

    app.get("/products", function(req, res){
      Product.find({}, function(err, products){
        if(err){
          res.render("error")
        }else{
        res.render("index", {products:products})
      }
      })

    })

    app.get("/products/new", function(req, res){
      res.render("new")
    })

    app.post("/products", function(req, res){
      var product=req.body.product
      product.available=!!Number(product.stock)
      Product.create(req.body.product, function(err){
        if(err){
          res.render("error")
        }else{
          res.redirect("/products")
        }
      })

    })

    app.get("/products/:id", function(req, res){
      Product.findById(req.params.id, function(err, foundProduct){
        if(err){
          res.render("error")
        }else{
          res.render("show", {product:foundProduct})
        }
      })
    })

    app.get("/products/:id/edit", function(req, res){
      Product.findById(req.params.id, function(err, foundProduct){
        if(err){
          res.render("error")
        }else{
          res.render("edit", {product:foundProduct})
        }
      })
    })

    app.put("/products/:id", function(req, res){
      var product=req.body.product
      product.available=!!Number(product.stock)
      Product.findByIdAndUpdate(req.params.id, product, function(err){
        if(err){
          res.render("error")
        }else{
          res.redirect("/products/"+req.params.id)
        }
      })
    })

    app.delete("/products/:id", function(req, res){
      Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
          res.render(error)
        }else{
        res.redirect("/products")  
        }
      })
    })


    app.listen(8000, function(){
      console.log("funca!")
    })
