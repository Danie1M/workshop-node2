"use strict";

//import { TIMEOUT } from "dns";
//import { url } from "inspector";
import * as puppeteer from "puppeteer";
interface objtData {
    title: string,
    image: string,
    price: string,
    author: string
};

const fs = require('fs');
async function saveJson(objJson) {
    try {
        const res2 = await fs.promises.readFile('ejemplo2.json', 'utf8')
        //console.log("Res2", res2)
        if (!res2) {
            await fs.promises.writeFile('ejemplo1.json', JSON.stringify(objJson, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log('Se guardo correctamenete1');
            });
            await fs.promises.writeFile('ejemplo2.json', JSON.stringify(objJson, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log('Se guardo correctamenete1');
            });
        } else {
            const parRes = JSON.parse(res2)
            parRes.push(...objJson)
            fs.writeFile('ejemplo2.json', JSON.stringify(parRes, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log('Se guardo correctamenete2');
            });
        }
    } catch (err) { console.log("error no jalo la guardada") }
}


const visitGoogle = async (url) => {
    const browser = await puppeteer.launch({ headless: false, timeout: 120000 });
    const page = await browser.newPage();
    await page.goto(url);
    const cicloPage = await page.evaluate(() => {
        const res: objtData[] = [];
        const info = Array.from(document.querySelectorAll('.products-grid.first .item'));
        for (const objPro of info) {
            const title = objPro.querySelector('.products-grid.first .item .product-information a').textContent;
            const image = objPro.querySelector('.products-grid.first .item .product-image img').getAttribute('src');
            const price = objPro.querySelector('.products-grid.first .item .product-information .price').textContent;
            const author = objPro.querySelector('.products-grid.first .item .product-information .author').textContent;
            res.push({ title, image, price, author });
        }
        return res
    })
    saveJson(cicloPage)
    await page.waitForTimeout(1000);
    await browser.close();
    return cicloPage;
};

let url = "https://www.tematika.com/libros?limit=40&p="
for (let x = 1; x <= 5;x++) {
    visitGoogle(url + `${x}`);
}

