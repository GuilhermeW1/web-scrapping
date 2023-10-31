import puppeteer from "puppeteer-core";
import fs from "fs";

export async function scrap(){
  let browser;
  try{
    browser = await puppeteer.launch({
      channel: "chrome"
    });

    const page = await browser.newPage();

    await page.goto('https://www.fundamentus.com.br/resultado.php');


    const selector = '#resultado';
    const rodape = '.rodape';

    await page.waitForSelector(selector);
    await page.waitForSelector(rodape);
    const el = await page.$(selector);

    const text = await el.evaluate(e => e.innerHTML);


    fs.writeFileSync('html.txt', text);
  }catch(e){
    console.error('scrap failed', e);
  }
  finally{
    await browser?.close();
  }
}
