import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
class CreateOrder extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            price:'',
            date:new Date(),
            users:[]
        }
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePrice=this.onChangePrice.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount()
    {
        Axios.get('http://localhost:9080/users')
             .then(res=>{
                console.log("resresres = ",res);
                 if(res.data.length>0)
                 {
                    this.setState({
                        users:res.data.map(usernames=>{
                            let nm = usernames.id+'_'+usernames.firstName+'_'+usernames.email;
                            return nm;
                        }),
                        username:res.data[0].id+'_'+res.data[0].firstName+'_'+res.data[0].email
                    })
                }
             })
             .catch(err=>console.log("cannot load users : Error : "+err));
    }
    onChangeUsername(e)
    {
        this.setState({
            username:e.target.value
        })
    }
    onChangePrice(e)
    {
        this.setState({
            price:e.target.value
        })
    }
    onChangeDate(date)
    {
        this.setState({
            date:date
        })
    }
    onSubmit(e)
    {
        console.log("uuuuuuuuuuuuuu");
        e.preventDefault();
        const newExercise={
            userid:this.state.username.split("_")[0],
            price:this.state.price,
            order_date:this.state.date
        }
        console.log(newExercise);
     //   window.location='/';
        Axios.post('http://localhost:9080/order',newExercise)
             .then(res=>alert("successfully created new Order"))
             .catch(err=>console.log("Error : "+err));

        this.setState({
            username:'',
            price:'',
            date:new Date()
        })

        // window.location='/';
    }
    render()
    {
        return(
            <div>
                <h2>Create New Order</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username : </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(users=>{
                                        return <option
                                            key={users}
                                            value={users}>{users}
                                        </option>
                                    })
                                }
                                
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Price : </label>
                        <input type="text"
                               required
                               placeholder="Price"
                               className="form-control"
                               value={this.state.price}
                               onChange={this.onChangePrice}></input>
                    </div>
                    <div className="form-group">
                        <label>Date : </label>
                        <div>
                            <DatePicker selected={this.state.date}
                                        onChange={this.onChangeDate}>

                            </DatePicker>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary"
                                value="Create Exercise">Create Order</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateOrder;