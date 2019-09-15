import {ContainerModule} from 'inversify'
import * as ora from 'ora'

import {OutputService} from '../business/services/output.service'
import {SettingService} from '../business/services/setting.service'

import {CustomOutputService} from './custom-output.service'
import {FactorySettingService} from './factory-setting.service'
import {FsFileService} from './fs-file.service'

const serviceModule = new ContainerModule(bind => {
  bind<ora.Ora>('ora').toConstantValue(ora({hideCursor: true, spinner: 'bouncingBall'}))

  bind<OutputService>('OutputService').to(CustomOutputService).inSingletonScope()
  bind<SettingService>('SettingService').to(FactorySettingService).inSingletonScope()
  bind<FsFileService>('FileService').to(FsFileService).inSingletonScope()
})

export default serviceModule
