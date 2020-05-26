export const getToken = () => {
     const token = localStorage.getItem('TOKEN_TYPE') + localStorage.getItem('TOKEN')
     if(token){
         return token
     }else {
         return ''
     }
}