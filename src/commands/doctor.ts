import {flags} from '@oclif/command'
import 'reflect-metadata'

import {DoctorInteractor} from '../business/interactors/doctor.interactor'
import injector from '../injector'

import Command from './base'

export class Doctor extends Command {
  static description = 'Tool for diagnostic and fix some issues'
  static flags = {
    help: flags.help({char: 'h'}),
    fix: flags.boolean({char: 'f'})
  }

  private readonly interactor = injector.get<DoctorInteractor>('DoctorInteractor')

  async run() {
    const parse = this.parse(Doctor)
    await this.interactor.execute(parse.flags.fix)
  }
}
