import {Setting} from '../setting'

export interface SettingRepository {
  saveSetting(setting: Setting): Promise<Setting>

  saveSettings(setting: Setting[]): Promise<Setting[]>

  findAll(): Promise<Setting[]>

  findOneByName(settingName: string): Promise<Setting>

  findSelected(): Promise<Setting>

  checkIfExistByName(settingName: string): Promise<boolean>

  deleteSetting(setting: Setting): Promise<Setting>

  deleteAll(): Promise<void>
}
