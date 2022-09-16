const express=require('express');
const indexRouter=require('./routes/indexRouter');
const path=require('path');
const hbs=require('hbs');
const morgan=require('morgan');
const session=require('express-session');
const app=express();
const db=require('./models/db');
db.conectar();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({secret:'123456', resave: true, saveUninitialized: true}));
app.use('/', indexRouter);

const server=app.listen(8080);
console.log('Servidor listo');
