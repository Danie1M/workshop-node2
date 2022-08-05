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
const puppeteer = require("puppeteer");
const visitGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("https://www.google.com/");
    yield page.screenshot({ path: "googleSS.png" });
    yield page.waitForTimeout(5000);
    yield page.goto("https://developer.mozilla.org/es/");
    yield page.screenshot({ path: "developerSS.png" });
    yield page.waitForTimeout(5000);
    yield page.goto("https://pptr.dev/#usage");
    yield page.screenshot({ path: "pptrSS.png" });
    yield browser.close();
});
visitGoogle();
