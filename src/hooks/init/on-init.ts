import {Hook} from '@oclif/config'
import {getConnectionManager} from 'typeorm'

import {Setting} from '../../entities/setting'

const hook: Hook<'init'> = async function () {
  const connectionManager = getConnectionManager()
  const connection = connectionManager.create({
    type: 'sqlite',
    database: `${this.config.home}/.m2/msa/msa.db`,
    entities: [Setting],
    logging: false
  })

  await connection.connect()
}

export default hook
