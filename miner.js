const CoinHive = require('coin-hive')
const config = require('./config')

(async () => {
  // Create miner
  const miner = await CoinHive(config.key, {
    pool: {
      host: 'etnpool.minekitten.io',
      port: 3333
    },
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

  // Stop miner
  setTimeout(async () => await miner.stop(), config.time);
})();



