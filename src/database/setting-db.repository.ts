import {EntityRepository, Repository} from 'typeorm'

import {SettingRepository} from '../business/repositories/setting.repository'
import {Setting} from '../business/setting'

import {SettingEntity} from './entities/setting.entity'
import {SettingAlreadyExistError} from './errors/setting-already-exist.error'
import {SettingNotFoundError} from './errors/setting-not-found.error'

@EntityRepository(SettingEntity)
export class SettingDbRepository extends Repository<SettingEntity> implements SettingRepository {
  async findOneByName(settingName: string): Promise<Setting> {
    try {
      const settingEntity = await this.findOneOrFail({name: settingName})
      return this.mapToSetting(settingEntity)
    } catch {
      throw new SettingNotFoundError(settingName)
    }
  }

  async findSelected(): Promise<Setting> {
    const settingEntity = await this.findOneOrFail({selected: 1})
    return this.mapToSetting(settingEntity)
  }

  async checkIfExistByName(settingName: string): Promise<boolean> {
    const setting = await this.findOne({name: settingName})
    if (setting) {
      throw new SettingAlreadyExistError(settingName)
    }

    return !!setting
  }

  async findAll(): Promise<Setting[]> {
    const settingEntities = await this.find()
    return settingEntities.map(s => this.mapToSetting(s))
  }

  async saveSetting(setting: Setting): Promise<Setting> {
    let settingEntity = this.mapToSettingEntity(setting)
    settingEntity = await this.save(settingEntity)
    return this.mapToSetting(settingEntity)
  }

  async saveSettings(settings: Setting[]): Promise<Setting[]> {
    let settingEntities = settings.map(s => this.mapToSettingEntity(s))
    settingEntities = await this.save(settingEntities)
    return settingEntities.map(s => this.mapToSetting(s))
  }

  async deleteSetting(setting: Setting): Promise<Setting> {
    let settingEntity = this.mapToSettingEntity(setting)
    settingEntity = await this.remove(settingEntity)
    return this.mapToSetting(settingEntity)
  }

  deleteAll(): Promise<void> {
    return this.clear()
  }

  // noinspection JSMethodCanBeStatic
  private mapToSetting(setting: SettingEntity): Setting {
    return new Setting(setting.name, setting.file, setting.selected === 1)
  }

  // noinspection JSMethodCanBeStatic
  private mapToSettingEntity(setting: Setting): SettingEntity {
    return new SettingEntity(setting.name, setting.file, setting.isSelected ? 1 : 0)
  }
}
