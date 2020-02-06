const {Router}  = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/get', (request, response) => {
    console.log(request.query);
    return response.json({'Mensagem de olá': 'Hello Mundo!!'});
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs/:_id', DevController.delete);

routes.get('/search', SearchController.index)

routes.put('/put/:id', (request, response) => { 
    console.log(request.params);
    return response.json({'Mensagem de olá': 'Hello Mundo!!'});
});
routes.delete('/delete/:id', (request, response) => {
    console.log(request.params);
    return response.json({'Mensagem de olá': 'Hello Mundo!!'});
});

module.exports = routes;