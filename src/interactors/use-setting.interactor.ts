import chalk from 'chalk'

import {SettingDbRepository} from '../repository/setting-db.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

export class UseSettingInteractor extends Interactor<string, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly fileService: FileService,
    private readonly settingRepository: SettingDbRepository
  ) {
    super()
  }

  protected async _execute(setting: string): Promise<void> {
    if (!setting) {
      const settings = await this.settingRepository.find()
      setting = await this.outputService.selectSetting('Choose the setting to be used', settings)
    }

    const newSetting = await this.settingRepository.findOneByName(setting)
    const oldSetting = await this.settingRepository.findSelected()

    if (oldSetting) {
      this.fileService.deactivateSetting(oldSetting)
      oldSetting.unselect()
      await this.settingRepository.save(oldSetting)
    }

    this.fileService.activateSetting(newSetting)
    newSetting.select()
    await this.settingRepository.save(newSetting)

    this.outputService.success(`You activate ${chalk.bold.yellow(setting)} setting`)
  }
}
