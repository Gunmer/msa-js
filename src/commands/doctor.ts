import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {DoctorInteractor} from '../interactors/doctor.interactor'
import {getFileService} from '../msa-js'
import {SettingRepository} from '../repository/setting.repository'

export class Doctor extends Command {
  static description = 'Tool for diagnostic and fix some issues'
  static flags = {
    help: flags.help({char: 'h'}),
    fix: flags.boolean({char: 'f'})
  }

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = getFileService(this.config.home)
  private readonly interactor = new DoctorInteractor(this.outputService, this.fileService, this.settingRepository)

  async run() {
    const parse = this.parse(Doctor)
    await this.interactor.execute(parse.flags.fix)
  }
}
