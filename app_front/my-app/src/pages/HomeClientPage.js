import React from 'react';
import TestService from '../services/TestService';
import withRouter from '../components/withRouter';
import HomeClientService from '../services/HomeClientService';
import ClientService from '../services/ClientService';

class HomeClientPage extends React.Component {
    constructor(props){
        super(props)
        this.lolemail = this.props.location.state.email
        this.state = {
            userName: "",
            birth_date: "",
            gender: "MALE",
            email: "",
            phone_number: "",
            password: "",
            cars: [],
            orders: [],
        };
        this.client = {
            full_name: "sebsbfdsbsf",
            birth_date: "2002-01-01",
            gender: "MALE",
            email: this.lolemail,
            phone_number: "+123456789",
            password: "sdvsv",
        };
        this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount(){
        console.log(this.client)
        HomeClientService.getClient(this.client).then((response) => {
            this.setState({ userName: response.data.full_name, birth_date: response.data.birth_date, gender: response.data.gender, email: response.data.email, phone_number: response.data.phone_number})
        });
        HomeClientService.getCars(this.client).then((response) => {
            this.setState({cars: response.data})
        });
        HomeClientService.getOrders(this.client).then((response) => {
            this.setState({orders: response.data})
            console.log("TEEEEEEST")
            console.log(response.data)
            console.log("TEEEEEEST")
        });
        
    }

    

    handleClick() {

        this.props.navigate("/client/add_car", {state:{email: this.props.location.state.email}});
    }
    

    

    render (){
        return (
            <div>
                <div class="row" style={{height:"100%"}}>
                    <div style={{padding:5, borderStyle:'solid', width: "25%", marginLeft:10}}>
                        <div >
                            <p style={{margin:0, fontWeight:"bold"}}>Client</p>
                            <p>{this.state.userName}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Birth date</p>
                            <p>{this.state.birth_date}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Gender</p>
                            <p>{this.state.gender}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Email</p>
                            <p>{this.state.email}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Phone number</p>
                            <p>{this.state.phone_number}</p>

                        </div>
                        <button className="btn btn-primary col-md-12" onClick={this.handleClick} style={{marginTop:10}}>Add car</button>
                        <button className="btn btn-danger col-md-12" onClick={() => this.props.navigate("/")} style={{marginTop:10}}>Exit</button>
                    </div>
                        <div style={{width:"70%", borderStyle:'solid', float:'left', display: 'table-cell'}}>
                            <div>
                            <h1 className = "text-center"> Your cars</h1>
                            <table className = "table table-striped">
                                <thead>
                                    <tr>
                                        <td> Year of release</td>
                                        <td>  Model</td>
                                        <td>  Colour</td>
                                        <td>  Add order</td>
                                        <td>  Delete car</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        this.state.cars.map(
                                            cars => 
                                            <tr key = {cars.id}>  
                                                 <td> {cars.year_of_release}</td>   
                                                 <td> {cars.model}</td>   
                                                 <td> {cars.colour}</td>
                                                 <td> <button className="btn btn-success col-md-12" onClick={() => this.props.navigate("/client/add_order", {state:{email: this.props.location.state.email, car: cars.id}})} >Add order</button></td>
                                                 <td> <button className="btn btn-success col-md-12" onClick={() => ClientService.deleteCar(cars.id).then(window.location.reload())} >Delete</button></td>
                                                    
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>

                            </div>
                    </div>
                </div>
                <div>
                <div style={{width:"96%"}}>
                    <h1 className = "text-center"> Your orders</h1>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                                <td> Service Name</td>
                                <td> Car Model</td>
                                <td> Datetime</td>
                                <td>  Status</td>
                                <td>  Start</td>
                                <td>  End</td>
                                <td>  Name of worker</td>
                                <td>  Delete order</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orders.map(
                                    orders => 
                                    <tr key = {orders.id}>  
                                        <td> {orders.service_id.nameService}</td>
                                        <td> {orders.carId.model}</td>
                                         <td> {orders.datetime_order}</td>   
                                         <td> {orders.status_order}</td>   
                                         <td> {orders.start_time}</td>
                                         <td> {orders.end_time}</td>
                                         <td> {orders.employeeId.full_name_employee}</td>
                                         <td> <button className="btn btn-success col-md-12" onClick={() => ClientService.deleteOrder(orders.id).then(window.location.reload())} >Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            

        )
    }
  }
  export default withRouter(HomeClientPage);