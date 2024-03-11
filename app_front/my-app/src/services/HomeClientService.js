import axios from 'axios'
import proxy from '../../package.json';

const USERS_REST_API_URL = proxy.proxy + "/home_client";

class LoginClientService {

    getClient(client){
        return axios.post(USERS_REST_API_URL + "/get_client", client);
    }
    getCars(client){
        return axios.post(USERS_REST_API_URL + "/get_cars", client)
    }
    getOrders(client){
        return axios.post(USERS_REST_API_URL + "/get_orders", client)
    }
    
}

export default new LoginClientService();