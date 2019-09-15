import {expect, test} from '@oclif/test'
import 'reflect-metadata'
import {instance, mock, reset} from 'ts-mockito'

import {UseSettingInteractor} from '../../../src/business/interactors/use-setting.interactor'
import {SettingRepository} from '../../../src/business/repositories/setting.repository'
import {FileService} from '../../../src/business/services/file.service'
import {OutputService} from '../../../src/business/services/output.service'
import {SettingService} from '../../../src/business/services/setting.service'
import injector from '../../../src/injector'

describe('UseSettingInteractor', () => {
  let interactor: UseSettingInteractor

  let outputService: OutputService = mock<OutputService>()
  let fileService: FileService = mock<FileService>()
  let settingRepository: SettingRepository = mock<SettingRepository>()
  let settingService: SettingService = mock<SettingService>()

  before(() => {
    injector.snapshot()
    injector.rebind('OutputService').toConstantValue(instance(outputService))
    injector.rebind('FileService').toConstantValue(instance(fileService))
    injector.rebind('SettingRepository').toConstantValue(instance(settingRepository))
    injector.rebind('SettingService').toConstantValue(instance(settingService))

    interactor = injector.get<UseSettingInteractor>('UseSettingInteractor')
  })

  afterEach(() => {
    reset(outputService)
    reset(fileService)
    reset(settingRepository)
    reset(settingService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

})
