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
app.use(cors());
app.use(express.json());
connectDB();
app.use('/tasks',router)



app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
})