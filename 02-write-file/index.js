const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const rl = readline.createInterface({ input, output });

console.log('Hello! How your name?\n ');

rl.on('line', (input) => {
    if (input === ".exit") {
      console.log('Goodbye!');
      process.exit();
    } else {
      fs.appendFile('./02-write-file/testFile.txt', `${input}\n`, function (err, data) {
    
        console.log(`Received: ${input}`);
      });
    }

  rl.on('SIGINT', () => {
      rl.question('See you later!', () => {
       rl.close();
      });
    process.exit();
    });
});


