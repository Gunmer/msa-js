import {CLIError} from '@oclif/errors'

export class SettingAlreadyExistError extends CLIError {
  constructor(settingName: string) {
    super(`The setting ${settingName} already exist`, {code: 'SettingAlreadyExistError', exit: 1})
  }
}
