import {flags} from '@oclif/command'
import 'reflect-metadata'

import {UseSettingInteractor} from '../business/interactors/use-setting.interactor'
import injector from '../injector'

import Command from './base'

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

  private readonly interactor = injector.get<UseSettingInteractor>('UseSettingInteractor')

  async run() {
    const parse = this.parse(Use)
    await this.interactor.execute(parse.args.setting)
  }
}
