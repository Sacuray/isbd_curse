import axios from 'axios'
import proxy from '../../package.json';

const USERS_REST_API_URL = proxy.proxy + "/client";

class ClientService {

    addCars(car){
        console.log(car)
        return axios.post(USERS_REST_API_URL + "/add_car", car)
    }
    addOrder(order){
        return axios.post(USERS_REST_API_URL + "/add_order", order)
    }
    getServices(){
        return axios.get(USERS_REST_API_URL + "/get_services")
    }
    deleteOrder(order_id){
        return axios.post(USERS_REST_API_URL + "/delete_order", order_id)
    }
    deleteCar(car_id){
        return axios.post(USERS_REST_API_URL + "/delete_car", car_id)
    }
    
}

export default new ClientService();