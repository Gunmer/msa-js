import {EntityRepository, Repository} from 'typeorm'

import {Setting} from '../entities/setting'
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
}
