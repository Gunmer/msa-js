import {Command, flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import {Setting} from '../entities/setting'
import {SettingRepository} from '../repository/setting.repository'
import {FileService} from '../services/file.service'

export default class Doctor extends Command {
  static description = 'Tool for diagnostic and fix some issues'
  static flags = {
    help: flags.help({char: 'h'}),
    fix: flags.boolean({char: 'f'})
  }

  private readonly settingRepository = getCustomRepository(SettingRepository)
  private readonly fileService = new FileService(this.config.home)

  async run() {
    const parse = this.parse(Doctor)

    const settings = await this.settingRepository.find()
    const files = this.fileService.getAllSettingFiles()

    const selectedSettings = settings.filter(s => s.isSelected())
    const hasOnlyOneSettingSelected = selectedSettings.length <= 1
    if (!hasOnlyOneSettingSelected) {
      this.warn('There is more than one settings selected')
    }

    const allSettingsHasFile = settings.every(setting => this.hasFile(setting, files))
    if (!allSettingsHasFile) {
      this.warn('There are settings without a file')
    }

    if (parse.flags.fix) {
      const newSettings = files.map(this.toSetting)
      newSettings.push(Setting.DEFAULT)

      this.fileService.deleteSelectedSetting()
      await this.settingRepository.clear()
      await this.settingRepository.save(newSettings)

      this.log('Data base has restored')
    }

    if (hasOnlyOneSettingSelected && allSettingsHasFile && !parse.flags.fix) {
      this.log('Everything is fine!!!')
    }

    this.exit()
  }

  // noinspection JSMethodCanBeStatic
  private hasFile(setting: Setting, files: string[]) {
    if (setting.isDefault()) {
      return true
    }

    return files.includes(setting.file)
  }

  // noinspection JSMethodCanBeStatic
  private toSetting(file: string) {
    const fileParts = file.split('.')
    return new Setting(fileParts[0])
  }
}
