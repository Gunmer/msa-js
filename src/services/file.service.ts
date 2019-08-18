import * as fs from 'fs'

import {Setting} from '../entities/setting'

export class FileService {
  constructor(
    private readonly home: string,
    private readonly settingPath = `${home}/.m2/settings.xml`,
  ) {
  }

  activateSetting(newSetting: Setting) {
    if (newSetting.isDefault()) {
      return
    }

    const originFilePath = `${this.home}/.m2/msa/${newSetting.file}`
    fs.copyFileSync(originFilePath, this.settingPath)
  }

  deactivateSetting(oldSetting: Setting) {
    if (oldSetting.isDefault()) {
      return
    }

    fs.unlinkSync(this.settingPath)
  }
}
