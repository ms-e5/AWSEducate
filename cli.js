
'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {	
	const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--enable-automation'],
					headless: true,
					args: ['--disable-infobars', '--no-sandbox']
					});
	const page = await browser.newPage();
//	await page.emulate(puppeteer.devices['iPhone X']);
//  await page.setViewport({ width: 1280, height: 800});
//  page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36');
  
	const aws_user = process.env['WEB_USER'];
	const aws_pwd = process.env['WEB_PWD'];
	//console.log(aws_user);
	await page.goto('https://www.awseducate.com/student/s/awssite',   {waitUntil: "networkidle2"});
	await page.type('input[id="loginPage:siteLogin:loginComponent:loginForm:username"]', aws_user);
	await page.type('input[id="loginPage:siteLogin:loginComponent:loginForm:password"]', aws_pwd, {delay: 100});
	page.click('.loginText',{waitUntil: "networkidle2"});
	await page.waitForSelector('.btn');
	await page.click('.btn');

	const target = await browser.waitForTarget(t => t.url().includes('https://labs.vocareum.com/'));
	const page2 =  await target.page();
	//console.log(`Page title:`, await page2.title());

	await page2.waitForSelector('#showawsdetail');
	await page2.click('#showawsdetail');
	await page2.waitForSelector('#clikeybox');
	let txt = await page2.$eval('#clikeybox', el => el.querySelector("span").innerText);
	fs.writeFileSync( './.aws/credentials', txt);

//	await page2.waitForSelector('#clikeyboxbtn',{visible: true});
//	await page2.waitFor(500);
//	await page2.click('#clikeyboxbtn');
//	await page2.screenshot({ path: './example.png' });
	
  await browser.close();
})();
