#!/usr/bin/env node

const { spawn, exec } = require('child_process');

function errHandler(err) {
  console.error(`${err}`);
  process.exit(1);
}

function watchStatus() {
  const gitStatus = spawn('git', ['status']);

  gitStatus.stdout.on('data', data => {
    console.log(`${data}`);
  });
}

function main() {
  exec('clear', (error, stdout, stderr) => {
    if (error) {
      errHandler(error);
    }
    console.log(`${stdout}`);
    watchStatus();
  });
}
setInterval(main, 1000);
