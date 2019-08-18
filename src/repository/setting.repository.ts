import {Connection, getConnection} from 'typeorm'

import {Setting} from '../entities/setting'

export class SettingRepository {
  private readonly connection: Connection

  constructor() {
    this.connection = getConnection()
  }

  async findAllSettings() {
    return this.connection.manager.find(Setting)
  }

}
