import {ContainerModule} from 'inversify'

import {OutputService} from '../business/services/output.service'
import {SettingService} from '../business/services/setting.service'

import {CustomOutputService} from './custom-output.service'
import {FactorySettingService} from './factory-setting.service'
import {FsFileService} from './fs-file.service'

const serviceModule = new ContainerModule(bind => {
  bind<OutputService>('OutputService').to(CustomOutputService).inSingletonScope()
  bind<SettingService>('SettingService').to(FactorySettingService).inSingletonScope()
  bind<FsFileService>('FileService').to(FsFileService).inSingletonScope()
})

export default serviceModule
