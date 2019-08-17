import {Command} from '@oclif/command'

import {SettingRepository} from '../repository/setting.repository'

export default class Hello extends Command {
  static description = 'describe the command here'

  private settingsRepository = new SettingRepository()

  async run() {
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
