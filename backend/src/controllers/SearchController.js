const axios = require('axios');
const Dev = require('../models/dev');
const parseTechs = require('../utils/parseStringtoArray')
// -20.593696 -47.564252
// 
module.exports = {
    async index(request, response){
        //usca os devs no raio de 10Km
        //fintrar tecnologias
        const {lat, lon, techs} = request.query;
        const techsArray = parseTechs(techs.toLowerCase())
        techsArray
        console.log(techsArray);
        var devs = await Dev.find({
            techs:{
                $in: techsArray.map(e => new RegExp(e, 'i')) //para fazer o case Insensitive. ignorar lower ou UPPER case
            },
                location:{
                    $near:{
                        $geometry:{
                            type:"Point",
                            coordinates: [lon,lat],
                        },
                        $maxDistance: 10000,
                    },
                },
        });
        console.log(devs)
        return response.json({devs})
    }

} 