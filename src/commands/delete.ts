import {Command, flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {SettingRepository} from '../repository/setting.repository'
import {FileService} from '../services/file.service'

export default class Delete extends Command {
  static description = 'Delete a setting'
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static args = [
    {name: 'setting', required: true, description: 'Select setting for delete'},
  ]
  static aliases = ['d']

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = new FileService(this.config.home)

  async run() {
    const parse = this.parse(Delete)

    const setting = await this.settingRepository.findOneByName(parse.args.setting)
    this.fileService.deleteSettings(setting)
    await this.settingRepository.remove(setting)

    this.log(`The ${parse.args.setting} setting was deleted`)
    this.exit()
  }
}
