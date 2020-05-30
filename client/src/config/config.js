import Axios from 'axios'
var environment = process.env.NODE_ENV || 'development';
console.log("env", environment)
let axios = ''
if(environment === 'development'){
  axios = Axios.create({
     baseURL: "http://localhost:3050"
  });
}else{
  axios = Axios.create({
    baseURL: "/"
  });
}

export default axios;