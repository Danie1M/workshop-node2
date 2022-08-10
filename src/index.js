"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { TIMEOUT } from "dns";
//import { url } from "inspector";
const puppeteer = require("puppeteer");
;
const fs = require('fs');
function saveJson(objJson) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res2 = yield fs.promises.readFile('ejemplo2.json', 'utf8');
            //console.log("Res2", res2)
            if (!res2) {
                yield fs.promises.writeFile('ejemplo1.json', JSON.stringify(objJson, null, 2), 'utf8', (err) => {
                    if (err)
                        throw err;
                    console.log('Se guardo correctamenete1');
                });
                yield fs.promises.writeFile('ejemplo2.json', JSON.stringify(objJson, null, 2), 'utf8', (err) => {
                    if (err)
                        throw err;
                    console.log('Se guardo correctamenete1');
                });
            }
            else {
                const parRes = JSON.parse(res2);
                parRes.push(...objJson);
                fs.writeFile('ejemplo2.json', JSON.stringify(parRes, null, 2), 'utf8', (err) => {
                    if (err)
                        throw err;
                    console.log('Se guardo correctamenete2');
                });
            }
        }
        catch (err) {
            console.log("error no jalo la guardada");
        }
    });
}
const visitGoogle = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false, timeout: 120000 });
    const page = yield browser.newPage();
    yield page.goto(url);
    const cicloPage = yield page.evaluate(() => {
        const res = [];
        const info = Array.from(document.querySelectorAll('.products-grid.first .item'));
        for (const objPro of info) {
            const title = objPro.querySelector('.products-grid.first .item .product-information a').textContent;
            const image = objPro.querySelector('.products-grid.first .item .product-image img').getAttribute('src');
            const price = objPro.querySelector('.products-grid.first .item .product-information .price').textContent;
            const author = objPro.querySelector('.products-grid.first .item .product-information .author').textContent;
            res.push({ title, image, price, author });
        }
        return res;
    });
    saveJson(cicloPage);
    yield page.waitForTimeout(1000);
    yield browser.close();
    return cicloPage;
});
let url = "https://www.tematika.com/libros?limit=40&p=";
for (let x = 1; x <= 5; x++) {
    visitGoogle(url + `${x}`);
}
