import React from 'react';
import TestService from '../services/TestService';
import withRouter from '../components/withRouter';
import HomeClientService from '../services/HomeClientService';
import HomeWorkerService from '../services/HomeWorkerService';

class HomeWorkerPage extends React.Component {
    constructor(props){
        super(props)
        this.lolemail = this.props.location.state.email
        this.state = {
            full_name_employee: "",
            post: "",
            phone_number: "",
            email: "",
            passcode: "",
            car_dealership_id: "",
            autoparts: [],
            orders: [],
        };
        this.client = {
            full_name_employee: "",
            post: "MECHANIC",
            phone_number: "",
            email: this.lolemail,
            passcode: "",
            car_dealership_id: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount(){
        console.log("this.props.location.state.email")

        HomeWorkerService.getWorker(this.client).then((response) => {
            console.log(response.data)
            this.setState({full_name_employee: response.data.full_name_employee,
            post: response.data.post,
            phone_number: response.data.phone_number,
            email: response.data.email,
            passcode: response.data.passcode,
            car_dealership_id: response.data.car_dealership_id })
        });
        HomeWorkerService.getAutoparts(this.client).then((response) => {
            this.setState({autoparts: response.data})
        });
        HomeWorkerService.getOrders(this.client).then((response) => {
            console.log(response.data)
            this.setState({orders: response.data})
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
                            <p style={{margin:0, fontWeight:"bold"}}>Worker</p>
                            <p>{this.state.full_name_employee}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Post</p>
                            <p>{this.state.post}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Email</p>
                            <p>{this.state.email}</p>
                        </div>
                        <div>
                            <p style={{margin:0, fontWeight:"bold"}}>Phone number</p>
                            <p>{this.state.phone_number}</p>

                        </div>
                        
                        <button className="btn btn-danger col-md-12" onClick={() => this.props.navigate("/")} style={{marginTop:10}}>Exit</button>
                    </div>
                        <div style={{width:"70%", borderStyle:'solid', float:'left', display: 'table-cell'}}>
                            <div>
                            <h1 className = "text-center"> Your cars</h1>
                            <table className = "table table-striped">
                                <thead>
                                    <tr>
                                        <td> Autopart</td>
                                        <td> Description</td>
                                        <td>  Model</td>
                                        <td>  price</td>
                                        <td>  count</td>
                                        <td> Order Autopart</td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        this.state.autoparts.map(
                                            autopart => 
                                            <tr key = {autopart.id}>  
                                                 <td> {autopart.name_autopart}</td>
                                                 <td> {autopart.description_autopart}</td>     
                                                 <td> {autopart.model}</td>   
                                                 <td> {autopart.price}</td>
                                                 <td> {autopart.count}</td>
                                                 <td> <button className="btn btn-success col-md-12" onClick={() => {
                                                    this.props.navigate("/home_worker", {state:{email: this.props.location.state.email}});
                                                    HomeWorkerService.updateAutopart(autopart).then((response) => {
                                                        this.setState({autoparts: response.data})
                                                    });
                                                    }} > Order Autopart</button></td>
                                                    
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
                                         <td> {this.state.full_name_employee}</td>    
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
  export default withRouter(HomeWorkerPage);