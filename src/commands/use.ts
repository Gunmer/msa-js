import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {UseSettingInteractor} from '../interactors/use-setting.interactor'
import {getFileService} from '../msa-js'
import {SettingDbRepository} from '../repository/setting-db.repository'

export class Use extends Command {
  static description = 'Select the setting to use'
  static args = [{
    name: 'setting',
    required: false,
    description: 'Select setting for use'
  }]
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static aliases = ['u']

  private readonly settingRepository = getCustomRepository(SettingDbRepository)
  private readonly fileService = getFileService(this.config.home)
  private readonly interactor = new UseSettingInteractor(this.outputService, this.fileService, this.settingRepository)

  async run() {
    const parse = this.parse(Use)
    await this.interactor.execute(parse.args.setting)
  }
}
