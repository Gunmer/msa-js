import {Command, flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {SettingRepository} from '../repository/setting.repository'

export default class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.help({char: 'h'})}

  private readonly settingsRepository = getCustomRepository(SettingRepository)

  async run() {
    this.parse(List)

    const settings = await this.settingsRepository.find()

    settings.forEach(s => {
      if (s.isSelected()) {
        this.log(` > ${s.name}`)
      } else {
        this.log(`   ${s.name}`)
      }
    })

    this.exit()
  }
}
