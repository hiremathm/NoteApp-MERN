import Axios from 'axios'
var environment = process.env.NODE_ENV || 'development';
console.log("env", environment)
let axios = ''
if(environment === 'development'){
  axios = Axios.create({
     baseURL: "http://localhost:6060/api/"
  });
}else{
  axios = Axios.create({
    baseURL: "/api/"
  });
}

export default axios;