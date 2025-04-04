
module.exports = {
  apps: [
    {
      name: 'chamber_test_front',
      port: '3000',
      watch: true,
      exec_mode: 'fork',
      instances: '1',
      script: './server/index.mjs',
    },
  ],
}
