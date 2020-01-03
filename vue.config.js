module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    },
    name: 'Groupware',
    themeColor: '#399F4F',
    manifestOptions: {
      background_color: '#399F4F',
      orientation: 'portrait'
    }
  }
}
