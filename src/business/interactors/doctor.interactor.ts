import {inject, injectable} from 'inversify'

import {SettingRepository} from '../repositories/setting.repository'
import {FileService} from '../services/file.service'
import {OutputService} from '../services/output.service'
import {SettingService} from '../services/setting.service'
import {Setting} from '../setting'

import {Interactor} from './interactor'

@injectable()
export class DoctorInteractor implements Interactor<boolean, void> {
  constructor(
    @inject('OutputService')
    private readonly outputService: OutputService,
    @inject('FileService')
    private readonly fileService: FileService,
    @inject('SettingRepository')
    private readonly settingRepository: SettingRepository,
    @inject('SettingService')
    private readonly settingService: SettingService
  ) {
  }

  async execute(fix: boolean): Promise<void> {
    const settings = await this.settingRepository.findAll()
    const files = this.fileService.getAllSettingFiles()

    const selectedSettings = settings.filter(s => s.isSelected)
    const hasOnlyOneSettingSelected = selectedSettings.length <= 1
    if (!hasOnlyOneSettingSelected) {
      this.outputService.warning('There is more than one settings selected')
    }

    const allSettingsHasFile = settings.every(setting => this.hasFile(setting, files))
    if (!allSettingsHasFile) {
      this.outputService.warning('There are settings without a file')
    }

    if (fix) {
      const newSettings = files.map(s => this.settingService.getSettingByFilePath(s))
      const defaultSetting = this.settingService.getDefault()
      defaultSetting.select()
      newSettings.push(defaultSetting)

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

}
