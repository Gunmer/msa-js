import {CLIError} from '@oclif/errors'
import chalk from 'chalk'

export class SettingNotFoundError extends CLIError {
  constructor(settingName: string) {
    super(`Not found setting with name ${chalk.bold.yellow(settingName)}`, {code: 'SettingNotFoundError', exit: 1})
  }
}
