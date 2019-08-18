import {expect, test} from '@oclif/test'

describe('list', () => {
  test
    .stdout()
    .command(['list'])
    .it('when run list should show at least default setting', ctx => {
      expect(ctx.stdout).to.contain('default')
    })

  test
    .stdout()
    .command(['ls'])
    .it('when run ls should show at least default setting', ctx => {
      expect(ctx.stdout).to.contain('default')
    })
})
