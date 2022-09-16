const express=require('express');
const router=express.Router();
const home=require('../controllers/home');

router.get('/',home.index);
router.get('/signup',home.registerV);
router.post('/signup',home.register);
router.get('/signin', home.loginV);
router.post('/signin', home.login);
router.get('/welcome', autenticado, home.welcome)
router.get('/logout', home.logout);

function autenticado(req,res,next){
    if(req.session.user){
        return next();
    }
    res.render('login', {mensaje: 'Para acceder a esta ruta primero tenes que registrarte o acceder'});;
}

module.exports=router;