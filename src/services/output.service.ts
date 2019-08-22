import chalk from 'chalk'
import ora = require('ora')

export class OutputService {
  constructor(private readonly spinner = ora({hideCursor: true, spinner: 'bouncingBall'})) {
  }

  startSpinner(message?: string) {
    if (!this.spinner.isSpinning) {
      this.spinner.start(message)
    } else {
      this.spinner.text = message || ''
    }
  }

  updateSpinner(message: string) {
    this.spinner.text = message
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

}
