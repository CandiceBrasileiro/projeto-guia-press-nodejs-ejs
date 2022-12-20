const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o BD!")
  })
  .catch((msgErro) => {
    console.log(msgErro);
  })

// Usar o ejs como tamplate engine
app.set('view engine', 'ejs');
// Carregar arquivos estáticos
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order:[
    ['id', 'DESC'] //ASC = crescente || DESC = decrescente
  ] }).then(perguntas => {
    console.log(perguntas);
    res.render("index", {
      perguntas: perguntas
    });
  }); //Select * all from perguntas
  
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  })
})

app.listen(8080,()=>{console.log("App rodando!")});