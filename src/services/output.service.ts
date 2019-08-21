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
    this.spinner.succeed(message)
  }

  info(message: string) {
    this.spinner.info(message)
  }

  warning(message: string) {
    this.spinner.warn(message)
  }

  fail(message: string) {
    this.spinner.fail(message)
  }

  stopSpinner() {
    this.spinner.stop()
  }

}
