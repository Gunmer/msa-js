import {expect, test} from '@oclif/test'
import * as fs from 'fs'

import {FileService} from '../../src/business/services/file.service'
import {Setting} from '../../src/business/setting'
import injector from '../../src/injector'
import {CanNotDeleteDefaultError} from '../../src/services/errors/can-not-delete-default.error'
import {CanNotDeleteSelectedError} from '../../src/services/errors/can-not-delete-selected.error'
import {FileNotFoundError} from '../../src/services/errors/file-not-found.error'

describe('FsFileService', () => {
  let service: FileService

  before(() => {
    injector.snapshot()
    injector.bind('USER_HOME').toConstantValue('/user/home')

    service = injector.get<FileService>('FileService')
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test
    .stub(fs, 'copyFileSync', () => {
      throw new Error()
    })
    .it('should be throwed FileNotFoundError', () => {
      try {
        service.createSetting(new Setting('setting', 'setting.xml', false), '')
        expect.fail('The error has not been throwed')
      } catch (e) {
        expect(e).instanceof(FileNotFoundError)
      }
    })

  test
    .stub(fs, 'copyFileSync', () => {
    })
    .it('should be not throw FileNotFoundError', () => {
      try {
        service.createSetting(new Setting('setting', 'setting.xml', false), '')
      } catch {
        expect.fail('The error has been throwed')
      }
    })

  test
    .stub(fs, 'copyFileSync', () => {
    })
    .it('should be copy file', () => {
      try {
        service.activateSetting(new Setting('setting', '', false))
      } catch (e) {
        expect.fail(e)
      }
    })

  test.it('should be do nothing when activate default setting', () => {
    try {
      service.activateSetting(new Setting('default', '', false))
    } catch (e) {
      expect.fail(e)
    }
  })

  test
    .stub(fs, 'unlinkSync', () => {
    })
    .stub(fs, 'existsSync', () => true)
    .it('should be delete file', () => {
      try {
        service.deactivateSetting(new Setting('setting', '', false))
      } catch (e) {
        expect.fail(e)
      }
    })

  test.it('should be do nothing when deactivate default setting', () => {
    try {
      service.deactivateSetting(new Setting('default', '', false))
    } catch (e) {
      expect.fail(e)
    }
  })

  test
    .stub(fs, 'unlinkSync', () => {
    })
    .stub(fs, 'existsSync', () => true)
    .it('should be delete selected setting', () => {
      try {
        service.deleteSelectedSetting()
      } catch (e) {
        expect.fail(e)
      }
    })

  test.it('should be throw CanNotDeleteSelectedError when deleting selected setting', () => {
    try {
      service.deleteStoredSettings(new Setting('', '', true))
      expect.fail('The error has not been throwed')
    } catch (e) {
      expect(e).instanceof(CanNotDeleteSelectedError)
    }
  })

  test.it('should be throw CanNotDeleteDefaultError when deleting default setting', () => {
    try {
      service.deleteStoredSettings(new Setting('default', '', false))
      expect.fail('The error has not been throwed')
    } catch (e) {
      expect(e).instanceof(CanNotDeleteDefaultError)
    }
  })

  test
    .stub(fs, 'unlinkSync', () => {
    })
    .it('should be delete setting', () => {
      try {
        service.deleteStoredSettings(new Setting('setting', '', false))
      } catch (e) {
        expect.fail(e)
      }
    })

  test
    .stub(fs, 'readdirSync', () => ['.ignore', 'setting.xml', 'setting.json'])
    .it('should be retrieve only valid settings', () => {
      const settingFiles = service.getAllSettingFiles()

      expect(settingFiles).has.lengthOf(1)
      expect(settingFiles).contain('setting.xml')
      expect(settingFiles).not.contain('.ignore')
      expect(settingFiles).not.contain('setting.json')
    })

})
