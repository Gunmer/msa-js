import chalk from 'chalk'
import * as path from 'path'

import {Setting} from '../entities/setting'
import {SettingDbRepository} from '../repository/setting-db.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'

export class AddSettingInteractor extends Interactor<AddParam, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly fileService: FileService,
    private readonly settingRepository: SettingDbRepository
  ) {
    super()
  }

  async _execute(param: AddParam): Promise<void> {
    const name = await this.getName(param)
    const setting = new Setting(name)

    await this.settingRepository.checkIfExistByName(name)

    this.fileService.createSetting(setting, param.file)
    await this.settingRepository.save(setting)

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
