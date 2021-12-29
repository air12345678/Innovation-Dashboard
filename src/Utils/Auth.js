export const isLogin = () =>{
    if(localStorage.getItem('name') && localStorage.getItem('email')){
        return true;
    }
    return false;
}