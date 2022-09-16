const model=require('../models/user');
const bcrypt=require('bcryptjs');
const sal=10;

const index=(req,res)=>{
res.render('index');
}

const registerV=(req,res)=>{
    res.render('register');
}

const register=(req,res)=>{
   let userObj={
      nombre: req.body.nombre,
      clave: req.body.clave
   }
   bcrypt.hash(userObj.clave,sal, (error, result)=>{
      if(error){
         console.log(error);
      }
      else{
         userObj.clave=result;
         if(req.body.clave===req.body.clave2){
            model.create(userObj);
            res.redirect('/');
         }
         else{
            res.render('register', {mensaje: 'Las contraseñas no coinciden'});
         }
      }  
   })
}

const loginV=(req,res)=>{
res.render('login');
}

const login=async(req,res)=>{
   let userQuery=await model.readUser(req.body.nombre);
if(userQuery){
   bcrypt.compare(req.body.clave,userQuery.clave,(error,succes)=>{
   if(succes===false){
      console.log('error en el usuario o contraseña');
      res.render('login', {mensaje: 'Error en el usuario o contraseña'})
   }
   else{
      req.session.user=userQuery.nombre;
      res.redirect('/welcome');
      
   }
})
}
else{
   res.render('login', {mensaje: 'Error en el usuario o contraseña'})
}
}


const welcome=(req,res)=>{
   res.render('welcome', {user: req.session.user});
}


const logout=(req,res)=>{
req.session.destroy();
res.redirect('/');
}

module.exports.index=index;
module.exports.registerV=registerV;
module.exports.register=register;
module.exports.loginV=loginV;
module.exports.login=login;
module.exports.welcome=welcome;
module.exports.logout=logout;

