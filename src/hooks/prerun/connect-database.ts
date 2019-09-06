import {Hook} from '@oclif/config'
import {Connection, getConnectionManager} from 'typeorm'

import {SettingEntity} from '../../database/entities/setting.entity'
import {Migration1566161944888} from '../../database/migrations/1566161944888-Migration'
import {Migration1566162184523} from '../../database/migrations/1566162184523-Migration'
import {getOutputService} from '../../msa-js'

const hook: Hook<'prerun'> = async function () {
  getOutputService().startSpinner()

  const connectionManager = getConnectionManager()
  let connection: Connection

  if (connectionManager.has('default')) {
    connection = connectionManager.get('default')
  } else {
    connection = connectionManager.create({
      type: 'sqlite',
      database: `${this.config.home}/.m2/msa/msa.db`,
      entities: [SettingEntity],
      migrations: [
        Migration1566161944888,
        Migration1566162184523,
      ],
      logging: this.config.debug === 1,
      migrationsTableName: 'migrations',
      migrationsRun: true
    })
  }

  if (!connection.isConnected) {
    await connection.connect()
  }
}

export default hook
