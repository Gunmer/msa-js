import {ContainerModule} from 'inversify'
import {getCustomRepository} from 'typeorm'

import {SettingRepository} from '../business/repositories/setting.repository'

import {SettingDbRepository} from './setting-db.repository'

const databaseModule = new ContainerModule(bind => {
  bind<SettingRepository>('SettingRepository').toDynamicValue(() => getCustomRepository(SettingDbRepository))
})

export default databaseModule
