import {EntityRepository, Repository} from 'typeorm'

import {Setting} from '../entities/setting'
import {SettingAlreadyExistError} from '../errors/setting-already-exist.error'
import {SettingNotFoundError} from '../errors/setting-not-found.error'

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {
  async findOneByName(settingName: string) {
    try {
      return await this.findOneOrFail({name: settingName})
    } catch {
      throw new SettingNotFoundError(settingName)
    }
  }

  async findSelected() {
    return this.findOne({selected: 1})
  }

  async checkIfExistByName(settingName: string) {
    const setting = await this.findOne({name: settingName})
    if (setting) {
      throw new SettingAlreadyExistError(settingName)
    }

    return !!setting
  }

  async addDefault() {
    const defaultSetting = new Setting('default')
    defaultSetting.file = ''
    defaultSetting.select()

    return this.save(defaultSetting)
  }
}
