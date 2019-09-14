import {expect, test} from '@oclif/test'
import chalk from 'chalk'
import {Ora} from 'ora'
import {instance, mock, reset, verify, when} from 'ts-mockito'

import {OutputService} from '../../src/business/services/output.service'
import {Setting} from '../../src/business/setting'
import injector from '../../src/injector'

describe('CustomOutputService', () => {
  let service: OutputService

  let spinner = mock<Ora>()

  before(() => {
    injector.snapshot()
    injector.rebind('ora').toConstantValue(instance(spinner))

    service = injector.get<OutputService>('OutputService')
  })

  afterEach(() => {
    reset(spinner)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should call succeed', () => {
    service.success('message')

    verify(spinner.succeed(chalk.green('message'))).called()
  })

  test.it('should call info', () => {
    service.info('message')

    verify(spinner.info(chalk.blue('message'))).called()
  })

  test.it('should call info', () => {
    service.warning('message')

    verify(spinner.warn(chalk.yellow('message'))).called()
  })

  test.it('should call fail', () => {
    service.fail('message')

    verify(spinner.fail(chalk.red('message'))).called()
  })

  test.it('should call stop', () => {
    service.stopSpinner()

    verify(spinner.stop()).called()
  })

  test.it('should call start', () => {
    when(spinner.isSpinning).thenReturn(false)

    service.startSpinner('message')

    verify(spinner.start('message')).called()
  })

  test.stdout().it('should be print message', ctx => {
    service.print('message')

    expect(ctx.stdout).to.equals('message\n')
  })

  test.stdin('\n').stdout().it('should print settings and retrieve selected', async ctx => {
    const setting = await service.selectSetting('question', [new Setting('setting', '', false)])

    expect(ctx.stdout).to.equals('? question (Use arrow keys)\n❯ setting ? question setting\n')
    expect(setting).equals('setting')
  })

  test.stdin('answer\n').stdout().it('should print question and retrieve answer', async ctx => {
    const answer = await service.askQuestion('question', 'default')

    expect(ctx.stdout).to.contain('? question (default)')
    expect(answer).equals('answer')
  })

  test.stdin('\n').stdout().it('should print question and retrieve answer', async ctx => {
    const answer = await service.askQuestion('question', 'default')

    expect(ctx.stdout).to.contain('? question (default)')
    expect(answer).equals('default')
  })

})
