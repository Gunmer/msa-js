import {expect, test} from '@oclif/test'

import {SettingService} from '../../src/business/services/setting.service'
import injector from '../../src/injector'

describe('FactorySettingService', () => {
  let service: SettingService

  before(() => {
    service = injector.get<SettingService>('SettingService')
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should retrieve default setting', () => {
    const setting = service.getDefault()

    expect(setting).not.undefined
    expect(setting.name).equals('default')
    expect(setting.file).equals('')
    expect(setting.isSelected).equals(false)
  })

  test.it('should retrieve setting with name', () => {
    const setting = service.getSetting('setting')

    expect(setting).not.undefined
    expect(setting.name).equals('setting')
    expect(setting.file).equals('setting.xml')
    expect(setting.isSelected).equals(false)
  })

  test.it('should retrieve setting with name and file', () => {
    const setting = service.getSetting('setting', 'file.xml')

    expect(setting).not.undefined
    expect(setting.name).equals('setting')
    expect(setting.file).equals('file.xml')
    expect(setting.isSelected).equals(false)
  })

  test.it('should retrieve setting with file', () => {
    const setting = service.getSettingByFilePath('file.xml')

    expect(setting).not.undefined
    expect(setting.name).equals('file')
    expect(setting.file).equals('file.xml')
    expect(setting.isSelected).equals(false)
  })

})
