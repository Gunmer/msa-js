import chalk from 'chalk'
import {inject, injectable} from 'inversify'

import {SettingRepository} from '../repositories/setting.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

@injectable()
export class DeleteSettingInteractor implements Interactor<string, void> {
  constructor(
    @inject('OutputService')
    private readonly outputService: OutputService,
    @inject('FileService')
    private readonly fileService: FileService,
    @inject('SettingRepository')
    private readonly settingRepository: SettingRepository
  ) {
  }

  async execute(param: string): Promise<void> {
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
