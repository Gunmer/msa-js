import {EntityRepository, Repository} from 'typeorm'

import {Setting} from '../entities/setting'
import {SettingAlreadyExistError} from '../errors/setting-already-exist.error'
import {SettingNotFoundError} from '../errors/setting-not-found.error'
import {SettingRepository} from '../interactors/repositories/setting.repository'

@EntityRepository(Setting)
export class SettingDbRepository extends Repository<Setting> implements SettingRepository {
  async findOneByName(settingName: string): Promise<Setting> {
    try {
      return await this.findOneOrFail({name: settingName})
    } catch {
      throw new SettingNotFoundError(settingName)
    }
  }

  async findSelected(): Promise<Setting> {
    return this.findOneOrFail({selected: 1})
  }

  async checkIfExistByName(settingName: string): Promise<boolean> {
    const setting = await this.findOne({name: settingName})
    if (setting) {
      throw new SettingAlreadyExistError(settingName)
    }

    return !!setting
  }

  async addDefault(): Promise<Setting> {
    const defaultSetting = new Setting('default')
    defaultSetting.file = ''
    defaultSetting.select()

    return this.save(defaultSetting)
  }

  async findAll(): Promise<Setting[]> {
    return this.find()
  }

  async saveSetting(setting: Setting): Promise<Setting> {
    return this.save(setting)
  }

  async saveSettings(setting: Setting[]): Promise<Setting[]> {
    return this.save(setting)
  }

  async deleteSetting(setting: Setting): Promise<Setting> {
    return this.remove(setting)
  }

  deleteAll(): Promise<void> {
    return this.clear()
  }

}
