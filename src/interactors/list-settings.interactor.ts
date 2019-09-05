import chalk from 'chalk'

import {SettingRepository} from '../repository/setting.repository'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

export class ListSettingsInteractor extends Interactor<void, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly settingRepository: SettingRepository
  ) {
    super()
  }

  protected async _execute(): Promise<void> {
    const settings = await this.settingRepository.find()

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
