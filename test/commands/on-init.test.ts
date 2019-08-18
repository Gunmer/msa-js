import {expect, test} from '@oclif/test'
import {getConnection} from 'typeorm'

describe('hooks', () => {
  test
    .stdout()
    .hook('init')
    .it('when run init hook the database should be initialized', () => {
      const connection = getConnection()
      expect(connection.isConnected).to.be.true
    })
})
