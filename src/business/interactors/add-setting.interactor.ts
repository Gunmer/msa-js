import chalk from 'chalk'
import {inject, injectable} from 'inversify'
import * as path from 'path'

import {SettingRepository} from '../repositories/setting.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'
import {SettingService} from '../services/setting.service'

import {Interactor} from './interactor'

@injectable()
export class AddSettingInteractor implements Interactor<AddParam, void> {
  constructor(
    @inject('OutputService')
    private readonly outputService: OutputService,
    @inject('FileService')
    private readonly fileService: FileService,
    @inject('SettingRepository')
    private readonly settingRepository: SettingRepository,
    @inject('SettingService')
    private readonly settingService: SettingService,
  ) {
  }

  async execute(param: AddParam): Promise<void> {
    const name = await this.getName(param)
    const setting = this.settingService.getSetting(name)

    await this.settingRepository.checkIfExistByName(name)

    this.fileService.createSetting(setting, param.file)
    await this.settingRepository.saveSetting(setting)

    this.outputService.success(`The ${chalk.bold.yellow(name)} setting was created`)
  }

  private async getName(param: AddParam) {
    if (param.name) {
      return param.name
    }

    const file = path.parse(param.file).name
    return this.outputService.askQuestion('What is the name?', file)
  }
}

export interface AddParam {
  file: string
  name?: string
}
