let prefix = {
    api: process.env.VUE_APP_API_URL_PREFIX
}

// 适配 mock
if(process.env.NODE_ENV === 'development'){
    for(let key of Object.keys(prefix)){
        if(process.env.VUE_APP_USE_MOCK === 'true'){
            prefix[key] = process.env.VUE_APP_MOCK_URL
        }
    }
}

export default prefix
