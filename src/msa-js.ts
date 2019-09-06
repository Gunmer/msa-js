import {OutputService} from './business/services/output.service'
import {CustomOutputService} from './services/custom-output.service'
import {FactorySettingService} from './services/factory-setting.service'
import {FsFileService} from './services/fs-file.service'

let outputService: CustomOutputService

export function getOutputService(): OutputService {
  if (!outputService) {
    outputService = new CustomOutputService()
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

let factorySettingService: FactorySettingService

export function getSettingService() {
  if (!factorySettingService) {
    factorySettingService = new FactorySettingService()
  }

  return factorySettingService
}
