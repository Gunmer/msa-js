import {injectable} from 'inversify'
import * as path from 'path'

import {SettingService} from '../business/services/setting.service'
import {Setting} from '../business/setting'

@injectable()
export class FactorySettingService implements SettingService {
  getDefault(): Setting {
    return new Setting('default', '', false)
  }

  getSetting(name: string, file?: string): Setting {
    return new Setting(name, file || `${name}.xml`, false)
  }

  getSettingByFilePath(filePath: string): Setting {
    const name = path.parse(filePath).name
    return this.getSetting(name)
  }
}
