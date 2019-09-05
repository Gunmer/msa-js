import {FsFileService} from './services/fs-file.service'
import {OutputService} from './services/output.service'

let outputService: OutputService
export function getOutputService(): OutputService {
  if (!outputService) {
    outputService = new OutputService()
  }
  return outputService
}

let fileService: FsFileService
export function getFileService(homePath: string) {
  if (!fileService) {
    fileService = new FsFileService(homePath)
  }
  return fileService
}
