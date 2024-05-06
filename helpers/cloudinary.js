// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dpckpvwza', 
    api_key: '174477339252399', 
    api_secret: 'QRkchj1uT6Pl1GosvJKdETo8WCM' 
  });


  cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });