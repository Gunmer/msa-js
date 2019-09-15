import chalk from 'chalk'
import {inject, injectable} from 'inversify'

import {SettingRepository} from '../repositories/setting.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

@injectable()
export class UseSettingInteractor implements Interactor<string, void> {
  constructor(
    @inject('OutputService')
    private readonly outputService: OutputService,
    @inject('FileService')
    private readonly fileService: FileService,
    @inject('SettingRepository')
    private readonly settingRepository: SettingRepository
  ) {
  }

  async execute(setting: string): Promise<void> {
    if (!setting) {
      const settings = await this.settingRepository.findAll()
      setting = await this.outputService.selectSetting('Choose the setting to be used', settings)
    }

    const newSetting = await this.settingRepository.findOneByName(setting)
    const oldSetting = await this.settingRepository.findSelected()

    if (oldSetting) {
      this.fileService.deactivateSetting(oldSetting)
      oldSetting.unselect()
      await this.settingRepository.saveSetting(oldSetting)
    }

    this.fileService.activateSetting(newSetting)
    newSetting.select()
    await this.settingRepository.saveSetting(newSetting)

    this.outputService.success(`You activate ${chalk.bold.yellow(setting)} setting`)
  }
}
