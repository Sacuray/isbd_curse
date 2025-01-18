import React from 'react';
import TestService from '../services/TestService';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: [],
            error: null,  // Добавил состояние для ошибок
        };
    }

    componentDidMount() {
        TestService.getUsers()
            .then((response) => {
                this.setState({ test: response.data });
            })
            .catch((error) => {
                this.setState({ error: error.message });  // Обработка ошибки
            });
    }

    render() {
        const { test, error } = this.state;

        return (
            <div>
                <h1 className="text-center">Users List</h1>

                {error && <p className="text-center text-danger">{`Error: ${error}`}</p>}  {/* Показ ошибки */}

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Year of Release</th>
                        <th>Model</th>
                        <th>Colour</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        test.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.year_of_release}</td>
                                <td>{user.model}</td>
                                <td>{user.colour}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
