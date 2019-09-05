import chalk from 'chalk'

import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'
import {SettingRepository} from './repositories/setting.repository'

export class ListSettingsInteractor extends Interactor<void, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly settingRepository: SettingRepository
  ) {
    super()
  }

  protected async _execute(): Promise<void> {
    const settings = await this.settingRepository.findAll()

    this.outputService.stopSpinner()

    settings.forEach(s => {
      if (s.isSelected()) {
        this.outputService.print(chalk.cyan(` > ${s.name}`))
      } else {
        this.outputService.print(`   ${s.name}`)
      }
    })
  }

}
