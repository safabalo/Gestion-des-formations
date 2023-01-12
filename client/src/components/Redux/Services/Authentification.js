import axios from 'axios';
const URL = 'http://localhost:2000/auth/';

const Login = (user) => {
    axios.post(URL+ 'login', user)
    .then(res => {
        if(res.data){
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        console.log(res.data)
    })
    .catch(err => {
        console.log(err.msg)
    })
}
const Logout = () => {
    axios.get(URL+ 'logout')
    .then(()=> {
        localStorage.removeItem('user')
    })
    .catch(err => {
        console.log(err.msg)
    })  
}

export default{
    Login,
    Logout
}
