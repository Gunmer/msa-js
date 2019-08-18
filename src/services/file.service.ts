import * as fs from 'fs'

import {Setting} from '../entities/setting'
import {FileNotFoundError} from '../errors/file-not-found.error'

export class FileService {
  constructor(
    private readonly home: string,
    private readonly settingPath = `${home}/.m2/settings.xml`,
  ) {
  }

  createSetting(newSetting: Setting, pathFile: string) {
    try {
      const destinationFilePath = `${this.home}/.m2/msa/${newSetting.file}`
      fs.copyFileSync(pathFile, destinationFilePath)
    } catch {
      throw new FileNotFoundError(pathFile)
    }
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
