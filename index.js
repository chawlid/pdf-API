const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");
const pdf=require('./pdfConvert');
//const chokidar = require('chokidar');
//const { get } = require('http');



const app = express();
const port = 3000 || process.env.port;

require("http").createServer(app);
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', (req, res) => res.send(' Is Connecting!'));


app.get('/api/pdfconvert/:url/:idFile',  function (req, res) {
console.log(req.params.idFile+'  => '+req.params.url);
});

app.post('/api/pdfconvert/',  function (req, res) {
  
  let  url=req.body.url;
  let  idFile=req.body.idFile;
  
 

   pdf.convertUrlToPdf(url,idFile , res)
  .then(()=>console.log('Pdf Created with success'))
  .catch(err=>console.error('Error:',err));




})

app.get('/api/download/:id', function (req, res) {
  res.redirect(`https://res.cloudinary.com/dpckpvwza/image/upload/save/${req.params.id}.pdf`);
  
 // console.log(req.params.id);
  //res.download(`${__dirname}/save/${req.params.id}/pdf_${req.params.id}.pdf`);

})

app.get('/api/delete/:id', (req, res) => {
  let idFile=req.params.id;
  fs.rmSync(`./save/${idFile}`, {recursive: true, force: true,});
  res.send(`File ID : ${idFile} is Deleted.` )
})
//export default new App().server;
app.listen(port, () => console.log(` App listening on port ${port}!`));


