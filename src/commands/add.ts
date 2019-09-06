import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {AddParam, AddSettingInteractor} from '../business/interactors/add-setting.interactor'
import {SettingDbRepository} from '../database/setting-db.repository'
import {getFileService, getSettingService} from '../msa-js'

import Command from './base'

export class Add extends Command {
  static description = 'Add a new setting'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [
    {name: 'file', required: true, description: 'Path of setting file'},
    {name: 'name', required: false, description: 'Name of setting'},
  ]
  static aliases = ['a']

  private readonly settingRepository = getCustomRepository(SettingDbRepository)
  private readonly fileService = getFileService(this.config.home)
  private readonly settingService = getSettingService()
  private readonly interactor = new AddSettingInteractor(this.outputService, this.fileService, this.settingRepository, this.settingService)

  async run() {
    const parse = this.parse(Add)
    const addParam: AddParam = {
      name: parse.args.name,
      file: parse.args.file
    }

    await this.interactor.execute(addParam)
  }
}
