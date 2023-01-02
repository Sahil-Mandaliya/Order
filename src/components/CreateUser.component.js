import React,{Component} from 'react';
import Axios from 'axios';
class CreateUser extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            email:'',
        }
        this.onChangeFirstname=this.onChangeFirstname.bind(this);
        this.onChangeLastname=this.onChangeLastname.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);

        this.onSubmit=this.onSubmit.bind(this);
    }
    onChangeFirstname(e)
    {
        this.setState({
            firstname:e.target.value
        })
    }
    onChangeLastname(e)
    {
        this.setState({
            lastname:e.target.value
        })
    }
    onChangeEmail(e)
    {
        this.setState({
            email:e.target.value
        })
    }
    onSubmit(e)
    {
        e.preventDefault();
        const user = {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email
        }
        console.log("new = ",user);
        Axios.post('http://localhost:9080/users',user)
             .then((res)=>alert("successfully created new user"))
             .catch(err=>alert("Error Already exist or :" + err)); 

        console.log(user);
        this.setState({
            username:''
        })
    }
    render()
    {
        return(
           <div>
               <h2>Create New User</h2>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                        <label>First Name : </label>
                        <input type="text" 
                               placeholder="First Name"
                               required
                               className="form-control"
                               value={this.state.firstname}
                               onChange={this.onChangeFirstname}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Last Name : </label>
                        <input type="text" 
                               placeholder="Last Name"
                               required
                               className="form-control"
                               value={this.state.lastname}
                               onChange={this.onChangeLastname}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input type="text" 
                               placeholder="Email"
                               required
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}>
                        </input>
                    </div>
                    <div className="form-group">
                    <button type="submit" 
                            className="btn btn-primary"
                            value="CreateUser">Create User
                    </button>
                    </div>
               </form>
           </div>
        )
    }
}

export default CreateUser;