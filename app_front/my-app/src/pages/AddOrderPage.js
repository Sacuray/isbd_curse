import LoginClientService from '../services/LoginClientService';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientService from '../services/ClientService';
import withRouter from '../components/withRouter';

class AddOrderPage extends React.Component {
    constructor(props){
        super(props)
        this.lolemail = this.props.location.state.email
        this.lolcarid = this.props.location.state.car
        this.state = {
            car_id: this.lolcarid,
            service_name: "",
            service: [],
        };
        

        this.handleChange = (e) => {
            
            const value = e.target.value;
            this.setState({[e.target.name]: value })
            console.log(this.state.service_name)
        }
    }
    
    
    componentDidMount(){
        console.log("this.props.location.state.email")
        console.log(this.client)
        ClientService.getServices().then((response) => {
            this.setState({service: response.data})
            this.setState({service_name: response.data[0]})
            console.log(this.state.service)
            console.log(response.data[0])
        });
        console.log(this.state.service)
        console.log(this.state.service_name)
        
        
    }
    
    
    Add_Car (e){
        e.preventDefault();
        console.log("check")
        console.log(this.state.service_name)
        ClientService.addOrder(this.state)
            .then((res) => {
                this.props.navigate("/home_client", {state:{email: this.lolemail}})
                this.setState({
                    car_id: "",
                    service_name: "",
                })
            }).catch((error) => {
                console.log(error);
                this.props.navigate("/home_client", {state:{email: this.lolemail}})
            });
    }
    render() {
        return(
            <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center'>
                                Add Order
                            </div>
                            {<p className="fs-4 text-center text-success"></p>}
                            <div className='card-body'>
                                <form onSubmit={(e) => this.Add_Car(e)}>
                                    
                                    <div className='mb-3'>
                                        <label>Choose service</label>
                                        <select className='form-control'
                                            onChange={(e) => this.handleChange(e)}
                                            
                                            name="service_name">
                                            {this.state.service.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <button className="btn btn-primary col-md-12">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    };
}
export default withRouter(AddOrderPage);