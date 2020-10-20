import {Command} from '@oclif/command'
import {CongressAPI} from 'propublica-congress-sdk'
import * as _ from 'lodash'

import {Config} from '../utils'

export default class MembersCommand extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ do-something senate
{...}
`,
  ]

  static args = [
    {name: 'chamber', required: true, options: ['house', 'senate']},
    {name: 'congressNum', required: false, options: _.range(80, 116, 1)}
  ]

  async run() {
    const {args} = this.parse(MembersCommand)
    const chamber = args.chamber
    const congressNum = args.chamber
    const config = Config.loadConfig(this.config.configDir)
    const propublicaApiKey = config.ConfigToml.propublica.api_key
    const client = new CongressAPI({apiKey: propublicaApiKey});
    const result = await client.getAllMembers({chamber: chamber})
    console.log(JSON.stringify(result))
  }
}
