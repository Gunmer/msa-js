import {flags} from '@oclif/command'
import {getCustomRepository} from 'typeorm'

import Command from '../base'
import {Setting} from '../entities/setting'
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

  async run() {
    const parse = this.parse(Doctor)

    const settings = await this.settingRepository.find()
    const files = this.fileService.getAllSettingFiles()

    const selectedSettings = settings.filter(s => s.isSelected())
    const hasOnlyOneSettingSelected = selectedSettings.length <= 1
    if (!hasOnlyOneSettingSelected) {
      this.outputService.warning('There is more than one settings selected')
    }

    const allSettingsHasFile = settings.every(setting => this.hasFile(setting, files))
    if (!allSettingsHasFile) {
      this.outputService.warning('There are settings without a file')
    }

    if (parse.flags.fix) {
      const newSettings = files.map(this.toSetting)
      newSettings.push(Setting.DEFAULT)

      this.fileService.deleteSelectedSetting()
      await this.settingRepository.clear()
      await this.settingRepository.save(newSettings)

      this.outputService.info('Data base has restored')
    }

    if (hasOnlyOneSettingSelected && allSettingsHasFile && !parse.flags.fix) {
      this.outputService.success('Everything is fine!!!')
    }
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
