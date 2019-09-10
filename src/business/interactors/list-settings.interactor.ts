import chalk from 'chalk'
import {inject, injectable} from 'inversify'

import {SettingRepository} from '../repositories/setting.repository'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

@injectable()
export class ListSettingsInteractor implements Interactor<void, void> {
  constructor(
    @inject('OutputService')
    private readonly outputService: OutputService,
    @inject('SettingRepository')
    private readonly settingRepository: SettingRepository,
  ) {
  }

  async execute(): Promise<void> {
    const settings = await this.settingRepository.findAll()

    this.outputService.stopSpinner()

    settings.forEach(s => {
      if (s.isSelected) {
        this.outputService.print(chalk.cyan(` > ${s.name}`))
      } else {
        this.outputService.print(`   ${s.name}`)
      }
    })
  }

}
