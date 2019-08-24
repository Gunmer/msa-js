import {flags} from '@oclif/command'
import chalk from 'chalk'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {getFileService} from '../msa-js'
import {SettingRepository} from '../repository/setting.repository'

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

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = getFileService(this.config.home)

  async run() {
    const parse = this.parse(Use)

    if (!parse.args.setting) {
      const settings = await this.settingRepository.find()
      parse.args.setting = await this.outputService.selectSetting('Choose the setting to be used', settings)
    }

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

    this.outputService.success(`You activate ${chalk.bold.yellow(parse.args.setting)} setting`)
  }
}
