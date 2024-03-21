const express =require ('express');
const dotenv =require ('dotenv');
const morgan =require ('morgan');
const path  =require('path')
const  Color =require ('colors');

const errorHandler = require("./src/middlewares/error")

const connectDB =require ('./src/config/db.js');


const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/auth', require('./src/routes/auth.js'));
app.use('/api/v1/star', require('./src/routes/star.js'));
app.use('/api/v1/planet', require('./src/routes/planet.js'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};
 
const PORT = process.env.PORT || 3002;

connectDB();

app.get('/', (request, response) => {
    response.send('ok')
});


app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port:  ${PORT}`.white.bold)
});