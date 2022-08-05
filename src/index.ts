"use strict";
import * as puppeteer from "puppeteer";

const visitGoogle = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");
    await page.screenshot({path: "googleSS.png"});
    await page.waitForTimeout(5000);
    await page.goto("https://developer.mozilla.org/es/");
    await page.screenshot({path: "developerSS.png"});
    await page.waitForTimeout(5000);
    await page.goto("https://pptr.dev/#usage");
    await page.screenshot({path: "pptrSS.png"});

    await browser.close();
};

visitGoogle();