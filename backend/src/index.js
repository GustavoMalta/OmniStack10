const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');//caminho relativo para nao buscar nos modulos
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://gustavoomini:gustavoomini@cluster0-h85mk.mongodb.net/omini10?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//app.use(cors({origin:'localhost:3000'})) ou 
app.use(cors());
app.use(express.json());
app.use(routes);


//get = Adquirir Informação;
//post = Criar Informação;
//put = Editar Informação;
//delete = Deletar Informação;

//Parametros
// 
// Query Params: "?Chave=valor" (Filtros, Ordenação, Paginação)
// Route Params: Pelo Endereço sem formato "/valor" (identifica informalção para remover ou alterar)
// Body: Pelo Corpo do Request (Dados de criação ou alteração de registro)
//

app.listen(3333);
