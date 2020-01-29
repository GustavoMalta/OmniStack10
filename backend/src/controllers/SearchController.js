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
        const techsArray = parseTechs(techs)

        var devs = await Dev.find({
            techs:{
                $in:techsArray,
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

        console.log(request.query);
        return response.json({devs})
    }

} 