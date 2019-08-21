import Command from '@oclif/command'
import {CLIError} from '@oclif/errors'

import {getOutputService} from './msa-js'

export default abstract class extends Command {
  protected readonly outputService = getOutputService()

  async catch(err: any) {
    if (err instanceof CLIError) {
      this.outputService.fail(err.message)
    }
  }

  async finally() {
    this.outputService.stopSpinner()
  }
}
