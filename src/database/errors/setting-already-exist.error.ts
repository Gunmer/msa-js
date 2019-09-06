import {CLIError} from '@oclif/errors'
import chalk from 'chalk'

export class SettingAlreadyExistError extends CLIError {
  constructor(settingName: string) {
    super(`The setting ${chalk.bold.yellow(settingName)} already exist`, {code: 'SettingAlreadyExistError', exit: 1})
  }
}
