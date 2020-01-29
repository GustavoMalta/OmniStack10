const axios = require('axios');
const Dev = require('../models/dev');
const parseTechs = require('../utils/parseStringtoArray')

module.exports = {
    
    async index(request, response){
        const devs = await Dev.find();
        console.log(devs)
        return response.json(devs);
    },

    async update(request, response){
        const {github, techs, latitude, longitude} = request.body;

        let dev = await Dev.find({github:{
                $eq:github,
            },
        });

        if (dev){           

            const resposta = await axios.get("https://api.github.com/users/" + github);//com crase `template Strings`
            const  {name, login, avatar_url, bio} = resposta.data; //name=login para caso nao exista o name
        
            const techsArray = parseTechs(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.updateOne({
                name: (name) ? name : login,//name=login nao funcionou, fiz esse if aqui
                github,
                avatar_url,
                bio,
                techs:techsArray,
                location,
            })
    
            console.log(name, avatar_url, bio);
            console.log ("Usuario Atualizado");

        }else{
            console.log ("Usuario Não Existe");
        }
        return response.json(dev);
    
    },

    async store(request, response){
        const {github, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github});

        if (!dev){           

            const resposta = await axios.get("https://api.github.com/users/" + github);//com crase `template Strings`
            const  {name, login, avatar_url, bio} = resposta.data; //name=login para caso nao exista o name
        
            const techsArray = parseTechs(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                name: (name) ? name : login,//name=login nao funcionou, fiz esse if aqui
                github,
                avatar_url,
                bio,
                techs:techsArray,
                location,
            })
    
            console.log(name, avatar_url, bio);
            console.log ("Usuario Criado");

        }else{
            console.log ("Usuario Ja existe");
        }
        return response.json(dev);
    
    }

}