import {CLIError} from '@oclif/errors'
import chalk from 'chalk'

export class FileNotFoundError extends CLIError {
  constructor(file: string) {
    super(`The file ${chalk.bold.yellow(file)} not found`, {code: 'FileNotFoundError', exit: 1})
  }
}
