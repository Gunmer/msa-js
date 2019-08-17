import {ConnectionOptions, createConnection} from 'typeorm'

import {Setting} from '../entities/setting'

export class SettingRepository {
  private options: ConnectionOptions = {
    type: 'sqlite',
    database: '/Users/cristiam/.m2/msa/msa.db',
    entities: [Setting],
    logging: false
  }

  async findAllSettings() {
    const connection = await createConnection(this.options)
    const settingRepository = connection.getRepository(Setting)
    return settingRepository.find()
  }

}
