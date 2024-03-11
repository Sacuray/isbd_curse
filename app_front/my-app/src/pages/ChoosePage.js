import React from 'react';
import TestService from '../services/TestService';
import { Route, Routes, Link } from "react-router-dom"
import withRouter from '../components/withRouter';

class ChoosePage extends React.Component {
    constructor(props){
        super(props)
    }
    render (){
        return (
            <div className='main' style={{display:'flex', justifyContent:'center', alignItems:"center", height:700, }}>
                <div ><button className="btn btn-success col-md-12" onClick={() => {this.props.navigate("/login")}} style={{display:'flex', alignItems:'center', justifyContent:'center', width:200, height:200, borderColor:'black', borderStyle:'solid', margin:100}}>Client</button></div>
                <div ><button className="btn btn-success col-md-12" onClick={() => {this.props.navigate("/login_worker")}} style={{display:'flex', alignItems:'center', justifyContent:'center', width:200, height:200, borderColor:'black', borderStyle:'solid', margin:100}}>Worker</button></div>
            </div>

        )
    }
  }
export default withRouter(ChoosePage);