import {expect, test} from '@oclif/test'
import chalk from 'chalk'
import 'reflect-metadata'
import {instance, mock, reset, verify, when} from 'ts-mockito'

import {ListSettingsInteractor} from '../../../src/business/interactors/list-settings.interactor'
import {SettingRepository} from '../../../src/business/repositories/setting.repository'
import {OutputService} from '../../../src/business/services/output.service'
import {Setting} from '../../../src/business/setting'
import injector from '../../../src/injector'

describe('ListSettingsInteractor', () => {
  let interactor: ListSettingsInteractor

  let outputService: OutputService = mock<OutputService>()
  let settingRepository: SettingRepository = mock<SettingRepository>()

  before(() => {
    injector.snapshot()
    injector.rebind('OutputService').toConstantValue(instance(outputService))
    injector.rebind('SettingRepository').toConstantValue(instance(settingRepository))

    interactor = injector.get<ListSettingsInteractor>('ListSettingsInteractor')
  })

  afterEach(() => {
    reset(outputService)
    reset(settingRepository)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

  test.it('should printed when retrieve unselected setting', async () => {
    when(settingRepository.findAll()).thenResolve([new Setting('setting', '', false)])

    await interactor.execute()

    verify(outputService.print('   setting')).called()
  })

  test.it('should printed when retrieve selected setting', async () => {
    when(settingRepository.findAll()).thenResolve([new Setting('setting', '', true)])

    await interactor.execute()

    verify(outputService.print(`${chalk.cyan(' > setting')}`)).called()
  })

  test.it('should stopped spinner after repository', async () => {
    when(settingRepository.findAll()).thenResolve([])

    await interactor.execute()

    verify(outputService.stopSpinner()).calledAfter(settingRepository.findAll())
  })

})
