import {Command, flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {SettingRepository} from '../repository/setting.repository'
import {FileService} from '../services/file.service'

export default class Use extends Command {
  static description = 'Select the setting to use'
  static args = [{
    name: 'setting',
    required: true,
  }]
  static flags = {
    help: flags.help({char: 'h'}),
  }
  static aliases = ['u']

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = new FileService(this.config.home)

  async run() {
    const parse = this.parse(Use)

    const newSetting = await this.settingRepository.findOneByName(parse.args.setting)
    const oldSetting = await this.settingRepository.findSelected()

    if (oldSetting) {
      this.fileService.deactivateSetting(oldSetting)
      oldSetting.unselect()
      await this.settingRepository.save(oldSetting)
    }

    this.fileService.activateSetting(newSetting)
    newSetting.select()
    await this.settingRepository.save(newSetting)

    this.log(`You activate ${newSetting.name} setting`)
    this.exit()
  }
}
