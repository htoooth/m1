const CoinHive = require('coin-hive');
const config = require('./config');

let timer = null;

async function mining() {
  // Create miner
  const miner = await CoinHive(config.key, {
    pool: {
      host: 'etnpool.minekitten.io',
      port: 3333
    },
    // launch: {
    //   executablePath: 'c:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    //   args: ['--disable-setuid-sandbox', '--no-sandbox']
    // },
    devFee: 0
  });

  // Start miner
  await miner.start();

  // Listen on events
  miner.on('found', () => console.log('Found!'));

  miner.on('accepted', () => console.log('Accepted!'));

  miner.on('update', (data) =>
    console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)
  );

  miner.on('error', async (err) => {
    console.log(err);
    await miner.kill();
  });

  miner.on('job', () => {
    console.log('new job has received');
  });

  // Stop miner
  timer = setTimeout(async () => {
    await miner.kill();
    console.log('miner has stop');
    process.exit();
  }, config.time);
}

async function main() {
  return mining().then(() => {
    console.log('miner start to run')
  }).catch((err) => {
    console.error(e);
    main();
  });
}

process.on('unhandledRejection', () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  main();
  console.log('miner restart to run!!!');
})

main();



