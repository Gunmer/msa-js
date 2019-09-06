import {Setting} from '../setting'

export interface OutputService {
  startSpinner(message?: string): void

  updateSpinner(message: string): void

  success(message: string): void

  info(message: string): void

  warning(message: string): void

  fail(message: string): void

  stopSpinner(): void

  selectSetting(question: string, settings: Setting[]): Promise<string>

  askQuestion(question: string, def?: string): Promise<any | string>

  print(message: string): void
}
