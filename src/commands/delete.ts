import {flags} from '@oclif/command'
import 'reflect-metadata'

import {DeleteSettingInteractor} from '../business/interactors/delete-setting.interactor'
import injector from '../injector'

import Command from './base'

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

  private readonly interactor = injector.get<DeleteSettingInteractor>('DeleteSettingInteractor')

  async run() {
    const parse = this.parse(Delete)
    await this.interactor.execute(parse.args.setting)
  }
}
