export default {
    handle(response, vm){
        if(response.code === '0000'){
            return true
        };
        switch(response.code){
            case '4001':
                return false
            default: {
                vm.$message.error({
                    message: response.msg,
                    duration: 3000
                })
                return false
            }
        }
    }
}
