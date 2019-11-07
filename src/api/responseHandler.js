
export default function (response, vm){
    if(response.code === '0000'){
        return true
    }
    switch(response.code){
        case '4001':
            vm.$router.push({ name: 'Login' })
            return false
        default:
            return false
    }
}
