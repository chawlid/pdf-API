const express = require('express')
const bodyParser = require('body-parser');
const fs = require("fs");
const pdf=require('./pdfConvert');
const chokidar = require('chokidar');
const { get } = require('http');



const app = express();
const port = 3000 || process.env.port;

const http = require("http").createServer(app);
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', (req, res) => res.send(' Is Connecting!'));

global.pdfIdCreated='0';

app.get('/api/pdfconvert', (req, res) => res.send(global.pdfIdCreated));

app.post('/api/pdfconvert',  function (req, res) {
  let  url=req.body.url;
  let  idFile=req.body.idFile;
  

  pdf.convertUrlToPdf(url,idFile , res)
  .then(()=>console.log('Pdf Created with success'))
  .catch(err=>console.error('Error:',err));
  

  /*var watcher = chokidar.watch(`./save/${idFile}/pdf_${idFile}.pdf`, {ignored: /^\./, persistent: true});
  watcher.once('add', async function() {
 // await new Promise(resolve => setTimeout(resolve, 1000));
    pdfIdCreated=idFile;
   // res.send(pdfIdCreated);
    console.log('The ID is sended');
});*/
  

})

app.get('/api/download/:id', function (req, res) {
  console.log(req.params.id);
  res.download(`${__dirname}/save/${req.params.id}/pdf_${req.params.id}.pdf`);
})

app.get('/api/delete/:id', (req, res) => {
  let idFile=req.params.id;
  fs.rmSync(`./save/${idFile}`, {recursive: true, force: true,});
  res.send(`File ID : ${idFile} is Deleted.` )
})
//export default new App().server;
app.listen(port, () => console.log(` App listening on port ${port}!`));


exports.pdfIdCreated=pdfIdCreated;