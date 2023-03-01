const fetch = require('node-fetch')
const randomUseragent = require('random-useragent');
const cheerio = require('cheerio')
const readline = require('readline-sync')
var random = require('random-name')
const randomize = require('randomatic')

const chalk = require('chalk')
const figlet = require('figlet-promises');
const Figlet = new figlet();
let font = 'ogre';

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            
        resolve(text);
});


const functionGetReff = (linkreff) => new Promise((resolve, reject) => {
    fetch(linkreff, {
        method: 'GET',
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        },
        referrerPolicy: "strict-origin-when-cross-origin",
    })
    .then((res) => {
        resolve(res)
    })
    .catch((err) => reject(err))
  })

const functionRegist= (email, reff) => new Promise((resolve, reject) => {
    fetch('https://user.atlasvpn.com/v1/request/join', {
        method: 'POST',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-client-id": "Web",
            "Referer": "https://account.atlasvpn.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        },
        body:JSON.stringify({
            "email": email,
            "marketing_consent": true,
            "referrer_uuid": reff,
            "referral_offer": "initial"
        })
    })
    .then((res) => {
        resolve(res)
    })
    .catch((err) => reject(err))
  })

  const functionGetBearer = (code) => new Promise((resolve, reject) => {
    fetch(`https://user.atlasvpn.com/v1/tokens/${code}`, {
        method: 'GET',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://account.atlasvpn.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        },
    })
    .then((res) => res.json())
    .then((res) => {
        resolve(res.token)
    })
    .catch((err) => reject(err))
  })

const functionSubmitReff = (bearer) => new Promise((resolve, reject) => {
    fetch('https://user.atlasvpn.com/v1/auth/confirm', {
        method: 'GET',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": `Bearer ${bearer}`,
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://account.atlasvpn.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
        },
    })
    .then((res) => {
        resolve(res)
    })
    .catch((err) => reject(err))
  })

const getEmailRandom = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const result = [];
            $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
                result.push($(element).text());
            });
            resolve(result);
        })
        .catch(err => reject(err));
});

const GetOtp = (email, domain) => new Promise((resolve, reject) => {
        fetch(`https://generator.email/${domain}/${email}`, {
            method: "get",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                "cookie": `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
                "upgrade-insecure-requests": 1,
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36",
             }
        })
        .then(res => res.text())
        .then(text => {
            let $ = cheerio.load(text);
            let src = $('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > center > div > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > div > div:nth-child(3) > strong');
            const srcc = src.text()  
            resolve(srcc);
        })
        .catch(err => console.log(err));
});

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

(async ()=> {
    console.clear()
    await Figlet.loadFonts();
    let banner = await Figlet.write("AutoReff Atlas",font);
    console.log(chalk.bold.blue(banner))
    console.log(chalk.bold.blue("                                 by: Conny                                  \n"))
    var tanyareff = readline.question(chalk.yellow('Link reff : '));
    var jumlah = readline.question(chalk.yellow('Jumlah reff : '))

    for (var i = 1; i <= jumlah; i++) {
        try {
            const domainList = await getEmailRandom();
            const domain = domainList[Math.floor(Math.random() * domainList.length)];
            var firstName = random.first()
            var lastname = random.last()
            var uname = `${firstName}${randomize('0', 5)}${lastname}`
            const email = `${firstName}${lastname}${await randstr(5)}@${domain}`.toLowerCase();
            var linkreff = tanyareff;

            console.log(chalk.cyan('========================================================================='))
            console.log(chalk.green(`-> Mencoba Reff ke ${i} dengan email ${email}`))

            const getreff = await functionGetReff(linkreff)
            if(!getreff.status == 200) return;
            await sleep(100)

            const reff = getreff.url.split(/[=&]/)[1];
            console.log(chalk.green('-> Mencoba Regist...'))
            const regist = await functionRegist(email,reff)
            if(!regist.status == 204) return;
            await sleep(510)

                let linkConfirm;
                do {
                    linkConfirm = await GetOtp(email.split("@")[0], email.split("@")[1]);
                    console.log(chalk.green(`-> Wait for veriff link..`))

                } while (!linkConfirm);

            console.log(chalk.green(`-> Link confirm Found`))
            console.log(chalk.green('-> Mencoba SubmitReff...'))
            const parts = linkConfirm.split(" ");
            const code = parts[1];
            const bearer = await functionGetBearer(code)
            const submit = await functionSubmitReff(bearer)
            if(submit.status == 401){
                console.log(chalk.red(`-> unautorized`))
                i--;
            }
            await sleep(100)

            console.log(chalk.green(`-> Sukses Reff ke ${i}`))
            console.log(chalk.cyan('========================================================================='))
        } catch (error) {
            console.log(error)
            i--;
        }
    }
    

})()