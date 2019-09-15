import {expect, test} from '@oclif/test'
import 'reflect-metadata'
import {instance, mock, reset} from 'ts-mockito'

import {DeleteSettingInteractor} from '../../../src/business/interactors/delete-setting.interactor'
import {SettingRepository} from '../../../src/business/repositories/setting.repository'
import {FileService} from '../../../src/business/services/file.service'
import {OutputService} from '../../../src/business/services/output.service'
import injector from '../../../src/injector'

describe('DeleteSettingInteractor', () => {
  let interactor: DeleteSettingInteractor

  let outputService: OutputService = mock<OutputService>()
  let fileService: FileService = mock<FileService>()
  let settingRepository: SettingRepository = mock<SettingRepository>()

  before(() => {
    injector.snapshot()
    injector.rebind('OutputService').toConstantValue(instance(outputService))
    injector.rebind('FileService').toConstantValue(instance(fileService))
    injector.rebind('SettingRepository').toConstantValue(instance(settingRepository))

    interactor = injector.get<DeleteSettingInteractor>('DeleteSettingInteractor')
  })

  afterEach(() => {
    reset(outputService)
    reset(fileService)
    reset(settingRepository)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

})
