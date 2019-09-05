import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {ListSettingsInteractor} from '../interactors/list-settings.interactor'
import {SettingRepository} from '../repository/setting.repository'

export class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.help({char: 'h'})}

  private readonly settingsRepository = getCustomRepository(SettingRepository)
  private readonly interactor = new ListSettingsInteractor(this.outputService, this.settingsRepository)

  async run() {
    this.parse(List)
    await this.interactor.execute()
  }
}
