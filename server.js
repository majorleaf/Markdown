import express from 'express';
import dotenv from 'dotenv';
// Built-in Node_module for interacting with file system 
import fs from 'fs';
//Built-in Node module for cryptography and random IDs
import crypto from 'crypto';


dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// middleware to parse incoming JSON bodies
app.use(express.json());


// automaticatically create "notes" folder if it doesn't exists 
const notesDir = './notes';
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
    console.log(`Created directory: ${notesDir}`);
}

 
app.get ('/', (req, res) =>  {
    console.log( "Markdown" );
    res.send("Markdown API is running");
}
);
 
app.post('/note', (req, res) => {
    try { 
        // take the note from the incoming request body
        const { note } = req.body;
        // check if the user actually sent some text 
        if(!note) {
            return res.status(400).json({ error: "provide 'note' text in JSON body "});
        }

        // generate a file name using crypto 
        const filename = `${crypto.randomUUID()}.md`;

        // //   To define the fie path where the file will be saved 
        const filepath = `${notesDir}/${filename}`;

        // write the file to the file system
        fs.writeFileSync(filepath, note);

        req.status(500).json({
            message: "Note saved successfully",
            filename: filename
        });


    } catch (error) {
        console.error("Error saving note", error);
        res.status(500).json({ error: " failed to save note"});

    }
})


app.listen(8000, () => { 
    console.log(`server running on ${PORT}`)
});
