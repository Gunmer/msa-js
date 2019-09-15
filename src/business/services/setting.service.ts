import {Setting} from '../setting'

export interface SettingService {
  getDefault(): Setting

  getSetting(name: string, file?: string): Setting

  getSettingByFilePath(filePath: string): Setting
}
