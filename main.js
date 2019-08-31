#!/usr/bin/env node

const { spawn, exec } = require('child_process');

function errHandler(err) {
  console.error(`${err}`);
  process.exit(1);
}

function watchStatus() {
  return new Promise((resolve, reject) => {
    const gitStatus = spawn('git', ['status']);

    gitStatus.stdout.on('data', data => {
      return resolve(`${data}`);
    });

    gitStatus.stderr.on('data', data => {
      return reject(data);
    });
  });
}

function promiseClear() {
  return new Promise((resolve, reject) => {
    exec('clear', (error, stdout, stderr) => {
      if (error) return reject(error);

      return resolve(console.log(`${stdout}`));
    });
  });
}

let old = '';

async function main() {
  try {
    const data = await watchStatus();
    if (data === old) return;

    await promiseClear();
    old = data;
    console.log(data);
  } catch (e) {
    errHandler(e);
  }
}

setInterval(main, 1000);
