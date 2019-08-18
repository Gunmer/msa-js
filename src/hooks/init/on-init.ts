import {Hook} from '@oclif/config'
import {Connection, getConnectionManager} from 'typeorm'

import {Setting} from '../../entities/setting'

const hook: Hook<'init'> = async function () {
  const connectionManager = getConnectionManager()
  let connection: Connection

  if (connectionManager.has('default')) {
    connection = connectionManager.get('default')
  } else {
    connection = connectionManager.create({
      type: 'sqlite',
      database: `${this.config.home}/.m2/msa/msa.db`,
      entities: [Setting],
      logging: true
    })
  }

  if (!connection.isConnected) {
    await connection.connect()
  }
}

export default hook
