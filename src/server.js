const path  =require('path');
const cors = require('cors');
const dotenv =require ('dotenv');
const morgan =require ('morgan');
const  colors =require ('colors');
const express =require ('express');

const errorHandler = require("./middlewares/error.js");

const connectDB =require ('./config/db.js');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/auth', require('./routes/auth.js'));
app.use('/api/v1/star', require('./routes/star.js'));
app.use('/api/v1/planet', require('./routes/planet.js'));

dotenv.config();
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));

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