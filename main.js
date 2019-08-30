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

  gitStatus.stderr.on('data', data => {
    errHandler(data);
  });

  // gitStatus.on('close', code => {
  // console.log(`child process exited with code ${code}`);
  // });
}

function clear() {
  exec('clear', (error, stdout, stderr) => {
    if (error) {
      errHandler(error);
    }
    console.log(`${stdout}`);
    // console.error(`stderr: ${stderr}`);
  });
}

function main() {
  clear();
  watchStatus();
}
setInterval(main, 1000);
