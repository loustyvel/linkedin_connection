const puppeteer = require('puppeteer');

async function start_browser() {
    browser = await puppeteer.launch({
        // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        //modify headless for debug
        headless: true,
        defaultViewport: null,
        slowMo: 250,
        // args: ['--window-size=800,860'],
        args: ['--no-sandbox', '--start-maximized', '--disable-setuid-sandbox', '--disable-infobars', '--window-position=0,0', '--ignore-certifcate-errors', '--ignore-certifcate-errors-spki-list',]
    })
}


start_browser().then(async () => {
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin/", { waitUntil: 'load' });
    await page.waitFor(3000)
    await page.click('#username')
        // modify mail account
    await page.keyboard.type('YOUR_MAIL');
    await page.click('[id="password"]')
        // modify password account
    await page.keyboard.type('YOUR_PASSWORD');
    await page.click('[type="submit"]')
    await page.goto("https://www.linkedin.com/mynetwork/", { timeout: 0, waitUntil: 'load' });
    await page.evaluate(() => {
        Array.from(document.querySelectorAll('[data-control-name="people_connect"]'),
            e => e.click())
    });
    await page.screenshot({ path: 'screenshot0.png' })
//the function setInterval refreshes the page every hour
    let connect = async function connect_() {

        try {
            await page.goto("https://www.linkedin.com/mynetwork/", { timeout: 0, waitUntil: 'load' });
            await page.waitFor(10000)
            await page.evaluate(() => {
                Array.from(document.querySelectorAll('[data-control-name="people_connect"]'),
                    e => e.click())
            });
            await page.screenshot({ path: 'screenshote01.png' })
        } catch{
            await page.screenshot({ path: 'screenshoterr.png' })
        }
    }
    try { await setInterval(connect, 3600000); } catch{
        await page.screenshot({ path: 'screenshoterr.png' })
    }

})
