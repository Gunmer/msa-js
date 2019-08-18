import {CLIError} from '@oclif/errors'

export class CanNotDeleteSelectedError extends CLIError {
  constructor() {
    super('Can`t delete selected setting', {code: 'CanNotDeleteActiveError', exit: 1})
  }
}
