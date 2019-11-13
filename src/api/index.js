import user from './user'

import news from './news'
import apiPrefix from './apiPrefix'
import _responseHandler from './responseHandler'

export const userApi = user

export const newsApi = news

export const testApi = { test: '/test' }

export const responseHandler = _responseHandler

export const prefix = apiPrefix
