import {FileService} from './services/file.service'
import {OutputService} from './services/output.service'

let outputService: OutputService
export function getOutputService(): OutputService {
  if (!outputService) {
    outputService = new OutputService()
  }
  return outputService
}

let fileService: FileService
export function getFileService(homePath: string) {
  if (!fileService) {
    fileService = new FileService(homePath)
  }
  return fileService
}
