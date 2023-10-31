import fs from 'fs';
import { scrap } from "./scraping.js";
import { getJsonData } from "./getJsonData.js";

async function run(){
  await scrap();
  const data = await getJsonData();
  fs.writeFileSync('data.json', data);
}

run();