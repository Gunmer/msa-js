import {CLIError} from '@oclif/errors'

export class CanNotDeleteDefaultError extends CLIError {
  constructor() {
    super('Can`t delete default setting', {code: 'CanNotDeleteDefaultError', exit: 1})
  }
}
