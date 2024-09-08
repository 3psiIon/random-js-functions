async function getBuildNum() {//gets the current build number for discord.com
    var headers = {
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Referer": "https://discord.com/login",
            "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.116 Safari/537.36"
        },
        "body": null,
        "method": "GET"
      }
    var files = (await (await fetch('https://discord.com/login', {
        "headers": headers,
        "body": null,
        "method": "GET"
      })).text()).match(/<script\s+src="([^"]+\.js)"\s+defer>\s*<\/script>/g).map(s => s.split('"')[1])
    for (let i = 0; i < files.length; i++) {
        var temp = await (await fetch('https://discord.com/' + files[i], {
            "headers": headers,
            "body": null,
            "method": "GET"
          })).text()
        if (temp.includes('"buildNumber"')) {
            return temp.split('"buildNumber"')[1].match(/\d+/)[0]
        }
    }
}
