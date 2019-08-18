import {CLIError} from '@oclif/errors'

export class FileNotFoundError extends CLIError {
  constructor(file: string) {
    super(`The file ${file} not found`, {code: 'FileNotFoundError', exit: 1})
  }
}
