import {Hook} from '@oclif/config'
import {Connection, getConnectionManager} from 'typeorm'

const hook: Hook<'init'> = async function () {
  const connectionManager = getConnectionManager()
  let connection: Connection

  if (connectionManager.has('default')) {
    connection = connectionManager.get('default')
  } else {
    connection = connectionManager.create({
      type: 'sqlite',
      database: `${this.config.home}/.m2/msa/msa.db`,
      entities: ['**/entities/*.ts'],
      migrations: ['**/migrations/*.ts'],
      logging: false,
      migrationsTableName: 'migrations',
      migrationsRun: true
    })
  }

  if (!connection.isConnected) {
    await connection.connect()
  }
}

export default hook
