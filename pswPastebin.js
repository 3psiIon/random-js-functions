async function pgetData(code, pswd) {//code is the path of the url, pswd is the password
        code = 'https://pastebin.com/' + code
        var req = await fetch(code, {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "en-US,en;q=0.9",
              "cache-control": "max-age=0",
              "priority": "u=0, i",
              "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
          })
          var resC = req.headers.get('set-cookie').split(' ')
          var cookie = resC.filter((_, i)=>i % 3 == 0).join(' ').replace(/.$/, '')
      var csrf = (await req.text()).split('name="csrf-token" content="')[1].split('"')[0].replaceAll('=', '%3D')
          var data = (await (await fetch(code, {
            "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": cookie,
            "Referer": code,
            "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `_csrf-frontend=${csrf}&is_burn=1&PostPasswordVerificationForm%5Bpassword%5D=${pswd}`,
            "method": "POST"
            })).text()).split('<ol class="text">')[1].split('</ol>')[0].split(/[<>"]/).filter((_, i) => (i - 8) % 12 === 0).join('').replaceAll(/&nbsp;|\r/g, '\n').replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            return data
    }
