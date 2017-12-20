const CoinHive = require('coin-hive');
const config = require('./config');

(async () => {
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
  miner.on('update', data =>
    console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)
  );
  miner.on('error', err => {
    console.error(err);
  });

  // Stop miner
  setTimeout(async () => {
    await miner.stop()
    console.log('miner has stop')
  }, config.time);
})().then(() => console.log('ok')).catch(err => console.error(e));



