import {CLIError} from '@oclif/errors'

export class SettingNotFoundError extends CLIError {
  constructor(settingName: string) {
    super(`Not found setting with name ${settingName}`, {code: 'SettingNotFoundError', exit: 1})
  }
}
