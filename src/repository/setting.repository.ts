import {Connection, getConnection} from 'typeorm'

import {Setting} from '../entities/setting'

export class SettingRepository {
  private connection: Connection

  constructor() {
    this.connection = getConnection()
  }

  async findAllSettings() {
    return this.connection.manager.find(Setting)
  }

}
