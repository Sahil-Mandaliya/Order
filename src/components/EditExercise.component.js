import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';

class EditExercise extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            task:'',
            duration:0,
            date:new Date(),
            users:[]
        }
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeTask=this.onChangeTask.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount()
    {
        Axios.get('http://localhost:5000/exercise/'+this.props.match.params.id)
             .then(res=>{
                 this.setState({
                     username:res.data.username,
                     task:res.data.task,
                     duration:res.data.duration,
                     date:new Date(res.data.date)
                 })
             })
             .catch(err=>console.log("Error :=> "+err));

        Axios.get('http://localhost:5000/user')
             .then(res=>{
                 if(res.data.length>0)
                 {
                    this.setState({
                        users:res.data.map(usernames=>usernames.username),
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
    onChangeTask(e)
    {
        this.setState({
            task:e.target.value
        })
    }
    onChangeDuration(e)
    {
        this.setState({
            duration:e.target.value
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
        e.preventDefault();
        const updatedExercise={
            username:this.state.username,
            task:this.state.task,
            duration:this.state.duration,
            date:this.state.date
        }

        Axios.post('http://localhost:5000/exercise/update/'+this.props.match.params.id,updatedExercise)
             .then(res=>console.log(res.data))
             .catch(err=>console.log("ErrorInPost : "+err));
        
        window.location='/';
    }

    render()
    {
        return(
            <div>
                <h2>Edit Exercise</h2>
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
                        <label>Task : </label>
                        <input type="text"
                               required
                               placeholder="task"
                               className="form-control"
                               value={this.state.task}
                               onChange={this.onChangeTask}></input>
                    </div>
                    <div className="form-group">
                        <label>Duration(In minutes) : </label>
                        <input type="number"
                               required
                               className="form-control"
                               value={this.state.duration}
                               onChange={this.onChangeDuration}></input>
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
                                value="Edit Exercise">Edit Exercise</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise;    