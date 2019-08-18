import {Command, flags} from '@oclif/command'

import {SettingRepository} from '../repository/setting.repository'

export default class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.boolean({char: 'h'})}

  private readonly settingsRepository = new SettingRepository()

  async run() {
    const parse = this.parse(List)

    if (parse.flags.help) {
      this._help()
      return
    }

    const settings = await this.settingsRepository.findAllSettings()

    settings.forEach(s => {
      if (s.isSelected === 0) {
        this.log(`   ${s.name}`)
      } else {
        this.log(` > ${s.name}`)
      }
    })
  }
}
