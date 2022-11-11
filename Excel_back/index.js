const express = require("express")
const app = express();
const data = require("./data.js");
const cors = require('cors');
const upload = require('express-fileupload');
const csv=require('csvtojson')

 



app.use(cors())
app.use(upload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public`
  }))

let csvPath = `${__dirname}/public/data.csv`
  
// app.post("/items", (req, res) => {
//     // res.header("Access-Control-Allow-Origin", "*")
    
//     res.send(`listened by server ${req.body}`)
// })

// app.get("/", (req, res) => {
//     res.json(data);
// });

// app.get("/:id", (req, res) => {
//     Object.keys(data).forEach((i) => {
//         if (req.params.id === i) {
//             res.json({[i]: data[i]}) 
//         } 
//     })
    
//         res.send("route not defined")
    
    
// })

app.post("/upload", (req, res) => {
    let uploadFile = req.files.file;
    let name = uploadFile.name;
    // const saveAs = `${name}`;
    
 
    uploadFile.mv(csvPath, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            
            res.status(200).send("Uploaded successfully");
        }
         
    });

});

app.get("/show-csv", (req, res) => {
    csv()
    .fromFile(csvPath)
    .then((jsonObj)=>{
        console.log(jsonObj);
        res.send(jsonObj)
    })
     
    // Async / await usage
    // const jsonArray = csv().fromFile(csvPath);
    // res.send(jsonArray);
    
} )



app.listen(4000 , console.log("app is listening on port 4000"))

