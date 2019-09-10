import {Container} from 'inversify'

import businessModule from './business/business.module'
import databaseModule from './database/database.module'
import serviceModule from './services/service.module'

const injector = new Container()

injector.load(businessModule, serviceModule, databaseModule)

export default injector
