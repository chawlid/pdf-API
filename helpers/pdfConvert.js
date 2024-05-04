
const puppeteer=require('puppeteer');
const path = require('path');
const cheerio = require('cheerio');
const fs = require('node:fs');
const axios = require('axios');

async function convertUrlToPdf(url,idFile) {

  console.log(url);
  console.log(idFile);
  
  createFile(idFile);
  //loadPage(url,idFile);

  
    const browser = await puppeteer.launch({
      headless: true,
     // args: ['--no-sandbox']
    });

    // Create a new page
    const page = await browser.newPage();
  
    // Website URL to export as pdf
     
  
    // Open URL in current page
    await page.goto(url, { waitUntil: 'networkidle0' }); 

   // const pageTitle = await page.title();
    
   const pageTitle =await getTitle(url);
    

   const newBody=await loadPage(url);
  
   
    const selector = 'body';
    await page.evaluate(async (selector,newBody) => {
    let dom = document.querySelector(selector);
    dom.innerHTML=newBody;
    }, selector,newBody);

    //To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');
  
  // Downlaod the PDF
  
    const pdf = await page.pdf({
      path: `save/${idFile}/pdf_${idFile}.pdf`,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
  
    // Close the browser instance
    await browser.close();

}

async function loadPage(url) {

  const response = await axios.get(url)
  const $ = cheerio.load(response.data);
  const bodyPage=$('body').html();
 
  return bodyPage.toString();

}

async function getTitle(url){

  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  var  title=$("title:first").text();
  title = title.replace(/[\|&;\$%@"<>\(\)\+,?]/g, "");

 return title;
}


function createFile(idFile) {
  const folderName = `save/${idFile}`;
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
}

exports.convertUrlToPdf=convertUrlToPdf;
