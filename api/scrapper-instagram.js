const puppeteer = require('puppeteer');

const instaData = async (username) => {
    //let launchOptions = { headless: false, args: ['--start-maximized'] };
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    //await page.setViewport({width: 1366, height: 768});
    //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    await Promise.all([
        page.waitForNavigation({timeout: 60000}),
        page.goto('https://instagram.com/'+username, {
            waitUntil: 'networkidle2',
        })
    ])
    await page.waitForSelector('header > section > ul > li span');

    const data = await page.$$eval("header > section > ul > li span",
        elems => elems.map(function (elem) {
            return elem.textContent
        })
    )

    let formattedData = {
        'posts': data[0],
        'followers': data[1],
        'following': data[2]
    }
    console.log(formattedData)

    await browser.close();
    return formattedData
}

module.exports.instaData = instaData