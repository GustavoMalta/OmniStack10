module.exports = function parseStringtoArray(arraytoString){
    return arraytoString.split(',').map(tech => tech.trim());
}