import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {ListSettingsInteractor} from '../interactors/list-settings.interactor'
import {SettingDbRepository} from '../repository/setting-db.repository'

export class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.help({char: 'h'})}

  private readonly settingsRepository = getCustomRepository(SettingDbRepository)
  private readonly interactor = new ListSettingsInteractor(this.outputService, this.settingsRepository)

  async run() {
    this.parse(List)
    await this.interactor.execute()
  }
}
