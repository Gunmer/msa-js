import Command from '@oclif/command'
import {CLIError} from '@oclif/errors'

import {OutputService} from '../business/services/output.service'
import injector from '../injector'

export default abstract class extends Command {
  protected readonly outputService = injector.get<OutputService>('OutputService')

  async catch(err: any) {
    if (err instanceof CLIError) {
      this.outputService.fail(err.message)
    }
  }

  async finally() {
    this.outputService.stopSpinner()
    await this.config.runHook('finally', {})
  }
}
