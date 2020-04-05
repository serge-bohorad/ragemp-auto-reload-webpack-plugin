## Installation

```
npm i electron-auto-reload-webpack-plugin --save-dev
```

## Usage:

Set the following field in the package.json

```
"main": "path/to/main.js"
```

Define the plugin in your webpack configuration

```js
const { ElectronAutoReloadPlugin } = require('electron-auto-reload-webpack-plugin')

module.exports = {
  target: 'electron-main',
  // ...
  plugins: [new ElectronAutoReloadPlugin()]
  // ...
}
```
