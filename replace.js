const fs = require('fs');

const dir = "src/enviroments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const slackVar = process.env.SLACK_PRO;

fs.access(dir, fs.constants.F_OK, (err) => {
    if (err) {
        console.log('src doesn\'t exist, creating now', process.cwd());
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        })
    }

    try {
        fs.writeFileSync(dir + '/' + file, slackVar);
        fs.writeFileSync(dir + "/" + prodFile, slackVar);
    } catch (error) {
        process.exit(1);
    }
});