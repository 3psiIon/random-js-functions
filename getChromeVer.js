(async function() {//gets the latest chrome version, returns array, index 0 is full ver, index 1 is the main ver number
    async function getChromiumVer() {
        var data = (await (await fetch("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Windows&num=6&offset=0", {
          "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://chromiumdash.appspot.com/releases?platform=Windows",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          },
          "body": null,
          "method": "GET"
        })).json())
        return [data[0].version, data[0].milestone]
    }
    console.log(await getChromiumVer())
})()
