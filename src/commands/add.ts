import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {AddParam, AddSettingInteractor} from '../interactors/add-setting.interactor'
import {getFileService} from '../msa-js'
import {SettingDbRepository} from '../repository/setting-db.repository'

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
  private readonly interactor = new AddSettingInteractor(this.outputService, this.fileService, this.settingRepository)

  async run() {
    const parse = this.parse(Add)
    const addParam: AddParam = {
      name: parse.args.name,
      file: parse.args.file
    }

    await this.interactor.execute(addParam)
  }
}
