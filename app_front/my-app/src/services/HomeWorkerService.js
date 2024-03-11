import axios from 'axios'
import proxy from '../../package.json';

const USERS_REST_API_URL = proxy.proxy + "/home_worker";

class LoginClientService {

    getWorker(worker){
        return axios.post(USERS_REST_API_URL + "/get_worker", worker);
    }
    getAutoparts(worker){
        return axios.post(USERS_REST_API_URL + "/get_autoparts", worker)
    }
    getOrders(worker){
        return axios.post(USERS_REST_API_URL + "/get_orders", worker)
    }
    updateAutopart(autopart){
        return axios.post(USERS_REST_API_URL + "/update_autoparts", autopart)
    }
    
}

export default new LoginClientService();