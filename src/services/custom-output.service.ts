import chalk from 'chalk'
import * as inquirer from 'inquirer'
import {inject, injectable} from 'inversify'
import * as ora from 'ora'

import {OutputService} from '../business/services/output.service'
import {Setting} from '../business/setting'

@injectable()
export class CustomOutputService implements OutputService {
  constructor(
    @inject('ora')
    private readonly spinner: ora.Ora,
  ) {
  }

  startSpinner(message?: string) {
    if (!this.spinner.isSpinning) {
      this.spinner.start(message)
    } else {
      this.spinner.text = message || ''
    }
  }

  success(message: string) {
    this.spinner.succeed(chalk.green(message))
  }

  info(message: string) {
    this.spinner.info(chalk.blue(message))
  }

  warning(message: string) {
    this.spinner.warn(chalk.yellow(message))
  }

  fail(message: string) {
    this.spinner.fail(chalk.red(message))
  }

  stopSpinner() {
    this.spinner.stop()
  }

  async selectSetting(question: string, settings: Setting[]) {
    this.stopSpinner()
    const prompt = await inquirer.prompt({
      type: 'list',
      name: 'setting',
      message: question,
      choices: settings.map(s => s.name)
    })
    this.startSpinner()
    return prompt.setting
  }

  async askQuestion(question: string, def?: string) {
    this.stopSpinner()
    const output = await inquirer.prompt({
      type: 'input',
      message: question,
      name: 'answer',
      default: def
    })
    this.startSpinner()
    return output.answer
  }

  print(message: string) {
    process.stdout.write(`${message}\n`)
  }
}
