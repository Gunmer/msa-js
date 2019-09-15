import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {SettingRepository} from '../../src/business/repositories/setting.repository'
import {Setting} from '../../src/business/setting'
import {SettingEntity} from '../../src/database/entities/setting.entity'
import {SettingAlreadyExistError} from '../../src/database/errors/setting-already-exist.error'
import {SettingNotFoundError} from '../../src/database/errors/setting-not-found.error'
import {SettingDbRepository} from '../../src/database/setting-db.repository'
import injector from '../../src/injector'

describe('SettingRepository', () => {
  let repository: SettingRepository

  let settingDbRepository = new SettingDbRepository()

  before(() => {
    injector.snapshot()
    injector.rebind<SettingRepository>('SettingRepository').toConstantValue(settingDbRepository)

    repository = injector.get<SettingRepository>('SettingRepository')
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(repository).not.undefined
  })

  test
    .stub(settingDbRepository, 'findOneOrFail', () => new SettingEntity('name', 'name.xml', 0))
    .it('should be retrieve setting by name', async () => {
      const setting = await repository.findOneByName('name')

      expect(setting.name).is.equals('name')
      expect(setting.file).is.equals('name.xml')
      expect(setting.isSelected).is.false
    })

  test
    .stub(settingDbRepository, 'findOneOrFail', () => {
      throw new Error()
    })
    .it('should be throw SettingNotFoundError when setting not found', async () => {
      try {
        await repository.findOneByName('name')
      } catch (e) {
        expect(e).instanceof(SettingNotFoundError)
      }
    })

  test
    .stub(settingDbRepository, 'findOneOrFail', () => new SettingEntity('name', 'name.xml', 1))
    .it('should be retrieve setting by name', async () => {
      const setting = await repository.findSelected()

      expect(setting.isSelected).is.true
    })

  test
    .stub(settingDbRepository, 'findOne', () => undefined)
    .it('should be false when setting not exist', async () => {
      const exist = await repository.checkIfExistByName('name')

      expect(exist).is.false
    })

  test
    .stub(settingDbRepository, 'findOne', () => new SettingEntity('', '', 0))
    .it('should be throw SettingAlreadyExistError when setting exist', async () => {
      try {
        await repository.checkIfExistByName('name')
        expect.fail('The error has not been throwed')
      } catch (e) {
        expect(e).instanceof(SettingAlreadyExistError)
      }
    })

  test
    .stub(settingDbRepository, 'find', () => [new SettingEntity('', '', 1), new SettingEntity('', '', 0)])
    .it('should be retrieve all settings', async () => {
      const settings = await repository.findAll()

      expect(settings).has.lengthOf(2)
    })

  test
    .stub(settingDbRepository, 'save', (entity: SettingEntity) => {
      expect(entity.name).is.equals('name')
      entity.name = 'saved'
      return entity
    })
    .it('should be save setting', async () => {
      const setting = await repository.saveSetting(new Setting('name', '', false))

      expect(setting.name).is.equals('saved')
    })

  test
    .stub(settingDbRepository, 'save', (entities: SettingEntity[]) => {
      expect(entities).has.lengthOf(1)
      return entities
    })
    .it('should be save settings', async () => {
      const settings = await repository.saveSettings([new Setting('name', '', false)])

      expect(settings).has.lengthOf(1)
    })

  test
    .stub(settingDbRepository, 'remove', (entity: SettingEntity) => {
      expect(entity.name).is.equals('name')
      entity.name = 'deleted'
      return entity
    })
    .it('should be delete setting', async () => {
      const setting = await repository.deleteSetting(new Setting('name', '', true))

      expect(setting.name).is.equals('deleted')
    })

  test
    .stub(settingDbRepository, 'clear', () => {})
    .it('should be delete all', async () => {
      await repository.deleteAll()
    })

})
