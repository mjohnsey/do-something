import * as fs from 'fs'
import * as path from 'path'

export class Config {
  static loadConfig(configDir: string, configFileName: string = this.defaultFileName()): Config {
    const location = path.join(configDir, configFileName)
    const config = this.loadConfigFromFile(location)
    return config
  }

  static loadConfigFromFile(location: string): Config {
    const toml = require('toml')
    const data = fs.readFileSync(location)
    const tomlData = toml.parse(data)
    return new Config(tomlData)
  }

  static defaultFileName(): string {
    return 'config.toml'
  }

  public ConfigToml: any

  constructor(configToml: any) {
    this.ConfigToml = configToml
  }
}
