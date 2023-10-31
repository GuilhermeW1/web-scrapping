import * as readline from 'readline';
import { createReadStream, createWriteStream, read } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDataFromLine } from './getDataFromRow.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readPath = path.join(__dirname, 'html.txt');

export async function getJsonData () {
  const readableStream = createReadStream(readPath);
  let trCounter = 0;
  const obj = [];
  const objModel = {};
  let newObj = {}
  let counter = 0

  const rl = readline.createInterface({
    input: readableStream,
    output: process.stdout,
    terminal: false,
  })

  rl.on('line', (line) => {
    //get the headers of the table
    if(line.includes('th')){
      const res = getDataFromLine(line, 2);

      if(res){
        objModel[res] = '';
      }
    }

    //get the data of the table
    //get the control of tr where tr starts the trcounter recives 1 and start to push to a new 
    //array and where the gets 2 the reset the counter and push the new array to an global array
    if(line.slice(0,3).includes('tr') && line.length > 6) {
      trCounter += 1;
    }

    if(trCounter == 1){
      const headers = Object.keys(objModel);
      let el = undefined;

      if(line.length > 30 ){
        el = getDataFromLine(line, 3);
      }else{
        el = getDataFromLine(line, 1);
      }

      if(el){
        newObj[headers[counter]] = el;
        counter += 1;
      }
    }

    //reset the counter and push the array
    if(trCounter == 2){
      trCounter = 0;
      obj.push(newObj);
      newObj = {};
      counter = 0;
    }

  });

  return new Promise((resolve) => {
    rl.on('close', () => {
      resolve(JSON.stringify(obj));
    })
  })
}
