import user from './user'
import dutyScheduling from './duty-scheduling'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'

export const userApi = user

export const dutySchedulingApi = dutyScheduling

export const testApi = { test: '/test' }

export const responseHandler = _responseHandler

export const prefix = apiPrefix
