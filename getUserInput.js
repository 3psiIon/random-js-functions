async function getUserInput(q) {//put const readline = require('node:readline') somewhere at the top, works like python input() except u gotta do await
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      return new Promise((resolve, reject) => {
        rl.question(q, a => {
            rl.close();
            resolve(a)
        });
    });
}
