import {Setting} from '../setting'

export interface FileService {
  createSetting(newSetting: Setting, pathFile: string): void

  activateSetting(newSetting: Setting): void

  deactivateSetting(oldSetting: Setting): void

  deleteSelectedSetting(): void

  deleteStoredSettings(setting: Setting): void

  getAllSettingFiles(): string[]
}
