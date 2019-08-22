import {flags} from '@oclif/command'
import chalk from 'chalk'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {Setting} from '../entities/setting'
import {getFileService} from '../msa-js'
import {SettingRepository} from '../repository/setting.repository'

export class Add extends Command {
  static description = 'Add a new setting'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [
    {name: 'name', required: true, description: 'Name of setting'},
    {name: 'file', required: true, description: 'Path of setting file'},
  ]
  static aliases = ['a']

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = getFileService(this.config.home)

  async run() {
    const parse = this.parse(Add)

    const setting = new Setting(parse.args.name)

    await this.settingRepository.checkIfExistByName(setting.name)

    this.fileService.createSetting(setting, parse.args.file)
    await this.settingRepository.save(setting)

    this.outputService.success(`The ${chalk.bold.yellow(setting.name)} setting was created`)
  }
}
