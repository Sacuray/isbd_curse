import axios from 'axios'
import proxy from '../../package.json';

const USERS_REST_API_URL = proxy.proxy + "/auth";

class LoginClientService {

    selectClient(worker){
        return axios.post(USERS_REST_API_URL + "/login_worker", worker);
    }
}

export default new LoginClientService();