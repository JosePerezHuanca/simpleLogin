const mongoose=require('mongoose');

async function conectar(){
    try{
        await mongoose.connect('mongodb://localhost:27017/login', {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('¡conectado!');
    }
    catch(error){
console.log(error.messaje);
    }
}

module.exports ={conectar};