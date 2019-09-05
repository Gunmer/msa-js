import chalk from 'chalk'

import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'
import {SettingRepository} from './repositories/setting.repository'

export class DeleteSettingInteractor extends Interactor<string, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly fileService: FileService,
    private readonly settingRepository: SettingRepository
  ) {
    super()
  }

  protected async _execute(param: string): Promise<void> {
    if (!param) {
      const settings = await this.settingRepository.findAll()
      param = await this.outputService.selectSetting('Choose the setting to be deleted', settings)
    }

    const setting = await this.settingRepository.findOneByName(param)
    this.fileService.deleteStoredSettings(setting)
    await this.settingRepository.deleteSetting(setting)

    this.outputService.success(`The ${chalk.bold.yellow(param)} setting was deleted`)
  }

}
