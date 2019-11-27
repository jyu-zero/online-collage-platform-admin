import user from './user'
import dutyScheduling from './duty-scheduling'
import news from './news'
import lostAndFound from './lost-and-found'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'
import question from './question'

export const userApi = user

export const dutySchedulingApi = dutyScheduling

export const newsApi = news

export const lostAndFoundApi = lostAndFound

export const testApi = { test: '/test' }

export const questionApi = question

export const responseHandler = _responseHandler

export const prefix = apiPrefix
