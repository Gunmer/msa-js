import {Setting} from '../entities/setting'
import {OutputService} from '../services/output.service'

import {Interactor} from './interactor'
import {SettingRepository} from './repositories/setting.repository'
import {FileService} from './services/file.service'

export class DoctorInteractor extends Interactor<boolean, void> {
  constructor(
    private readonly outputService: OutputService,
    private readonly fileService: FileService,
    private readonly settingRepository: SettingRepository
  ) {
    super()
  }

  protected async _execute(fix: boolean): Promise<void> {
    const settings = await this.settingRepository.findAll()
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

    if (fix) {
      const newSettings = files.map(this.toSetting)
      newSettings.push(Setting.DEFAULT)

      this.fileService.deleteSelectedSetting()
      await this.settingRepository.deleteAll()
      await this.settingRepository.saveSettings(newSettings)

      this.outputService.info('Data base has restored')
    }

    if (hasOnlyOneSettingSelected && allSettingsHasFile && !fix) {
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
