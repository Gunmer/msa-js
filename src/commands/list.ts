import {flags} from '@oclif/command'
import 'reflect-metadata'

import {ListSettingsInteractor} from '../business/interactors/list-settings.interactor'
import injector from '../injector'

import Command from './base'

export class List extends Command {
  static description = 'Show a list of settings'
  static aliases = ['ls']
  static flags = {help: flags.help({char: 'h'})}

  private readonly interactor = injector.get<ListSettingsInteractor>('ListSettingsInteractor')

  async run() {
    this.parse(List)
    await this.interactor.execute()
  }
}
