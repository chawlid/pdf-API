// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
const fs = require('node:fs');



cloudinary.config({ 
    cloud_name: 'dpckpvwza', 
    api_key: '174477339252399', 
    api_secret: 'QRkchj1uT6Pl1GosvJKdETo8WCM' 
  });

  
  

 
function uploadCloud(buffer,name,res) {

 return streamifier.createReadStream(buffer).pipe(cloudinary.uploader.upload_stream(
    {
      
      public_id:name,
      folder: "save/"
    },
    function(error,result) {
     try {
       console.log(result.public_id);
       global.pdfIdCreated=name;
      //res.send(name);
     } catch (error) {
      console.log(error);
     }
       
    }
));
}

function getFilename(folder) {
  const files = folder.split("/");
  let file = files[1];
  return file;
}


exports.uploadCloud=uploadCloud;
