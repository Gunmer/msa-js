import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {DeleteSettingInteractor} from '../interactors/delete-setting.interactor'
import {getFileService} from '../msa-js'
import {SettingRepository} from '../repository/setting.repository'

export class Delete extends Command {
  static description = 'Delete a setting'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [{
    name: 'setting',
    required: false,
    description: 'Select setting for delete'
  }]
  static aliases = ['d']

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = getFileService(this.config.home)
  private readonly interactor = new DeleteSettingInteractor(this.outputService, this.fileService, this.settingRepository)

  async run() {
    const parse = this.parse(Delete)
    await this.interactor.execute(parse.args.setting)
  }
}
