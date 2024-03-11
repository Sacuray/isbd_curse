import axios from 'axios'
import proxy from '../../package.json';

const USERS_REST_API_URL = proxy.proxy + "/auth";

class LoginClientService {

    saveClient(client){
        return axios.post(USERS_REST_API_URL + "/register_client", client);
    }
    selectClient(client){
        console.log(proxy)
        return axios.post(USERS_REST_API_URL + "/login_client", client);
    }
}

export default new LoginClientService();