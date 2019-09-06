import * as fs from 'fs'

import {FileService} from '../business/services/file.service'
import {Setting} from '../business/setting'

import {CanNotDeleteDefaultError} from './errors/can-not-delete-default.error'
import {CanNotDeleteSelectedError} from './errors/can-not-delete-selected.error'
import {FileNotFoundError} from './errors/file-not-found.error'

export class FsFileService implements FileService {
  constructor(
    private readonly home: string,
    private readonly settingPath = `${home}/.m2/settings.xml`,
    private readonly msaHome = `${home}/.m2/msa`
  ) {
  }

  createSetting(newSetting: Setting, pathFile: string) {
    try {
      const settingFilePath = `${this.home}/.m2/msa/${newSetting.file}`
      fs.copyFileSync(pathFile, settingFilePath)
    } catch {
      throw new FileNotFoundError(pathFile)
    }
  }

  activateSetting(newSetting: Setting) {
    if (newSetting.isDefault()) {
      return
    }

    const settingFilePath = `${this.home}/.m2/msa/${newSetting.file}`
    fs.copyFileSync(settingFilePath, this.settingPath)
  }

  deactivateSetting(oldSetting: Setting) {
    if (oldSetting.isDefault()) {
      return
    }

    this.deleteSelectedSetting()
  }

  deleteSelectedSetting() {
    if (fs.existsSync(this.settingPath)) {
      fs.unlinkSync(this.settingPath)
    }
  }

  deleteStoredSettings(setting: Setting) {
    if (setting.isSelected) {
      throw new CanNotDeleteSelectedError()
    }
    if (setting.isDefault()) {
      throw new CanNotDeleteDefaultError()
    }

    const settingFilePath = `${this.home}/.m2/msa/${setting.file}`
    fs.unlinkSync(settingFilePath)
  }

  getAllSettingFiles() {
    return fs.readdirSync(this.msaHome)
      .filter(file => file !== 'msa.db')
  }
}
