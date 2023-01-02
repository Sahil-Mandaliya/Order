import React,{Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

function UserComponent(args){
        // console.log("inside component");
         //console.log(args);
        return(
            <tr>
                <td>{args.userArg.firstName}</td>
                <td>{args.userArg.lastName}</td>
                <td>{args.userArg.email}</td>

                <td>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <Link className="btn btn-sm btn-dark" to={'/userExerList/'+args.userArg.email}>See All Orders </Link>
                    </div>
                </td>
            </tr>
        );
}
class UserList extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            users:[]
        }
        this.ListAllUsers=this.ListAllUsers.bind(this);
    }
    componentDidMount()
    {
        Axios.get('http://localhost:9080/users')
             .then(showExer=>{
                console.log("aaa = ",showExer);
                 this.setState({
                     users:showExer.data
                 })
             })
    }
    
    ListAllUsers()
    {
       return this.state.users.map(curUser=>{
         //   console.log(curExer)
            return (<UserComponent userArg={curUser} 
                                       key={curUser.id}/>)
        })
    }
    render()
    {
        return(
            <div>
                <h2>User Log</h2>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ListAllUsers()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserList;