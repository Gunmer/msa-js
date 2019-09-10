import {flags} from '@oclif/command'
import 'reflect-metadata'

import {AddParam, AddSettingInteractor} from '../business/interactors/add-setting.interactor'
import injector from '../injector'

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

  private readonly interactor = injector.get<AddSettingInteractor>('AddSettingInteractor')

  async run() {
    const parse = this.parse(Add)
    const addParam: AddParam = {
      name: parse.args.name,
      file: parse.args.file
    }

    await this.interactor.execute(addParam)
  }
}
