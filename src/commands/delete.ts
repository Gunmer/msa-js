import {flags} from '@oclif/command'
import chalk from 'chalk'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {getFileService} from '../msa-js'
import {SettingRepository} from '../repository/setting.repository'

export class Delete extends Command {
  static description = 'Delete a setting'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [
    {name: 'setting', required: true, description: 'Select setting for delete'},
  ]
  static aliases = ['d']

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = getFileService(this.config.home)

  async run() {
    const parse = this.parse(Delete)

    const setting = await this.settingRepository.findOneByName(parse.args.setting)
    this.fileService.deleteStoredSettings(setting)
    await this.settingRepository.remove(setting)

    this.outputService.success(`The ${chalk.bold.yellow(parse.args.setting)} setting was deleted`)
  }
}
