import React from 'react';
import TestService from '../services/TestService';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            test:[]
        }
    }
  
    componentDidMount(){
        TestService.getUsers().then((response) => {
            this.setState({ test: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td>  Id</td>
                            <td> year_of_release</td>
                            <td>  Last Name</td>
                            <td>  Email Id</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.test.map(
                                test => 
                                <tr key = {test.id}>
                                     <td> {test.id}</td>   
                                     <td> {test.year_of_release}</td>   
                                     <td> {test.model}</td>   
                                     <td> {test.colour}</td>   
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>

        )
    }
  }
  export default App;