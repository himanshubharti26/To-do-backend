const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 9000;
const connectDB  = require('./db');
const router = require('./routes');


app.use((req, res, next)=>{
    console.log(req.method, req.url, req.body, new Date(), new Date().toLocaleTimeString());
    next();
})
app.use(cors({
    origin:'*'
}));
app.use(express.json());
connectDB();
app.use('/tasks',router)


app.get('/',(req,res)=>{
    res.status(200).send("Welcome to backend");
})
app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
})