import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import crypto from 'crypto';


dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json());

 
app.get ('/', (req, res) =>  {
    console.log( "Markdown" );
    res.send("Markdown API is running");
}
);



app.listen(8000, () => { 
    console.log(`server running on ${PORT}`)
});
