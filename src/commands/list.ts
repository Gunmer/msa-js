import {flags} from '@oclif/command'
import chalk from 'chalk'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {SettingRepository} from '../repository/setting.repository'

export class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.help({char: 'h'})}

  private readonly settingsRepository = getCustomRepository(SettingRepository)

  async run() {
    this.parse(List)

    const settings = await this.settingsRepository.find()

    this.outputService.stopSpinner()

    settings.forEach(s => {
      if (s.isSelected()) {
        this.log(chalk.cyan(` > ${s.name}`))
      } else {
        this.log(`   ${s.name}`)
      }
    })
  }
}
