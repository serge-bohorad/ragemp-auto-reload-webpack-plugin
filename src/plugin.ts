import * as fs from 'fs'
import { dirname, basename } from 'path'
import { execSync, exec } from 'child_process'

import { Config } from './types'

import { isString } from './utils'

export class RagempAutoReloadPlugin {
  config: Config

  serverDirectory: string
  serverProcessName: string

  constructor(config: Config) {
    this.config = config

    this.validateConfig()
    this.determineServerDirectory()
    this.determineServerProcessName()
  }

  validateConfig = () => {
    if (!this.config) {
      throw Error('Failed to read the config. Config is not provided')
    }

    const { serverPath } = this.config

    if (!isString(serverPath)) {
      throw TypeError('Failed to read the config. "serverPath" must be a string')
    }

    if (!fs.existsSync(serverPath)) {
      throw Error(`The server file not found. Path: ${serverPath}`)
    }
  }

  determineServerDirectory = () => {
    this.serverDirectory = dirname(this.config.serverPath)
  }

  determineServerProcessName = () => {
    this.serverProcessName = basename(this.config.serverPath)
  }

  // Webpack entry method
  apply = (compiler) => {
    compiler.hooks.done.tap('RagempAutoReloadPlugin', () => {
      const { serverDirectory, serverProcessName } = this

      try {
        execSync(`taskkill /T /F /IM ${this.serverProcessName}`, { stdio: 'ignore' })
      } catch (e) {}

      exec(`cd ${serverDirectory} && start /MIN ${serverProcessName}`)
    })
  }
}
