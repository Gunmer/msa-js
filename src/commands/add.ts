import {Command, flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {Setting} from '../entities/setting'
import {SettingRepository} from '../repository/setting.repository'
import {FileService} from '../services/file.service'

export default class Add extends Command {
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
  private readonly fileService = new FileService(this.config.home)

  async run() {
    const parse = this.parse(Add)

    const setting = new Setting(parse.args.name)

    await this.settingRepository.checkIfExistByName(setting.name)

    this.fileService.createSetting(setting, parse.args.file)
    await this.settingRepository.save(setting)

    this.log(`The ${setting.name} setting was created`)
    this.exit()
  }
}
