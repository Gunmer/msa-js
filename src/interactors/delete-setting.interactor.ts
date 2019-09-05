import chalk from 'chalk'

import {SettingRepository} from '../repository/setting.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

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
      const settings = await this.settingRepository.find()
      param = await this.outputService.selectSetting('Choose the setting to be deleted', settings)
    }

    const setting = await this.settingRepository.findOneByName(param)
    this.fileService.deleteStoredSettings(setting)
    await this.settingRepository.remove(setting)

    this.outputService.success(`The ${chalk.bold.yellow(param)} setting was deleted`)
  }

}
