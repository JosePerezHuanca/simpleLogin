const mongoose=require('mongoose');
const db=require('./db');

let usuarioSchema=mongoose.Schema({
nombre: String,
clave: String
});

const userModel=mongoose.model('users', usuarioSchema);

async function create(user){
try{
let userM=new userModel(user);
await userM.save();
}
catch(error){
    console.log(error.messaje);
}
}

async function readUser(name){
    try{
let query=await userModel.findOne({nombre: name});
return query;
    }
    catch(error){
console.log(error);
    }
}


module.exports={create, readUser};