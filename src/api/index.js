import user from './user'

import news from './news'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'
import question from './question'
import dutyScheduling from './duty-scheduling'

export const userApi = user

export const newsApi = news

export const dutySchedulingApi = dutyScheduling

export const testApi = { test: '/test' }

export const questionApi = question

export const responseHandler = _responseHandler

export const prefix = apiPrefix
