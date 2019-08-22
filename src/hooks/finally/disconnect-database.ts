import {Hook} from '@oclif/config'
import {getConnection} from 'typeorm'

const hook: Hook<'finally'> = async function () {
  const connection = getConnection()
  if (connection.isConnected) {
    await connection.close()
  }
}

export default hook
