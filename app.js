'use-strict'
/*
  Module dependencies
*/

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var path = require('path')

var userController = require('./controllers/user');
console.log(userController);
//Establecemos la ruta de la carpeta de vistas
app.set('views', __dirname + '/views');

//Definimos que utilizaremos 'ejs' como motor para visualización
app.set('view engine', 'ejs');

//Colocamos la carpeta 'public' visible en las direcciones
app.use(express.static(__dirname + '/public'));

//Configuramos una herramienta para parsear información en formato JSON
app.use(bodyParser.json());

//Configuramos una herramienta para parsear información del método POST
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', userController.getAllUsers);
app.get('/signup/:type', (req, res) =>{
  var type = req.params.type;
  console.log(`Type: ${type}`);
  if(type == 'member'){
    console.log("Rendering index");
    res.render('pages/signupMember.ejs');
  }else{
    res.redirect('/');
  }
});

module.exports = app
