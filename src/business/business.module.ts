import {ContainerModule} from 'inversify'

import {AddSettingInteractor} from './interactors/add-setting.interactor'
import {DeleteSettingInteractor} from './interactors/delete-setting.interactor'
import {DoctorInteractor} from './interactors/doctor.interactor'
import {ListSettingsInteractor} from './interactors/list-settings.interactor'
import {UseSettingInteractor} from './interactors/use-setting.interactor'

const businessModule = new ContainerModule(bind => {
  bind<ListSettingsInteractor>('ListSettingsInteractor').to(ListSettingsInteractor)
  bind<UseSettingInteractor>('UseSettingInteractor').to(UseSettingInteractor)
  bind<AddSettingInteractor>('AddSettingInteractor').to(AddSettingInteractor)
  bind<DeleteSettingInteractor>('DeleteSettingInteractor').to(DeleteSettingInteractor)
  bind<DoctorInteractor>('DoctorInteractor').to(DoctorInteractor)
})

export default businessModule
