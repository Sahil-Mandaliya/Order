import React,{Component} from 'react';
import Axios from 'axios';

function ExerciseComponent(args){
    //  console.log("inside component");
    //  console.log(args);
    return(
        <tr>
            <td>{args.exerciseArg.username}</td>
            <td>{args.exerciseArg.task}</td>
            <td>{args.exerciseArg.duration}</td>
            <td>{args.exerciseArg.date.substring(0,10)}</td>
            {/* <td>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <button className="btn btn-sm btn-dark" onClick={()=>args.deleteExerArg(args.exerciseArg)}>Delete</button>
                </div>
            </td> */}
        </tr>
    );
}
class SpecificUser extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            Activity:[],
        }
    }
    componentDidMount(e)
    {
        Axios.get('http://localhost:9080/orders')
             .then(showUser=>{
                console.log("Oresrs : ",showUser);
                this.setState({
                    Activity:showUser.data
                })
            })
    }
    ListAllExercises()
    {
        if(this.state.Activity==null) {
            return
        }
        return this.state.Activity.filter(abc=>abc.username===this.props.match.params.id)
                                  .map(curExer=>{ return (<ExerciseComponent exerciseArg={curExer} 
                                                                    key={curExer._id}/>)
                                                                })
            //    return this.state.Activity.map(curExer=>{

            //         if(curExer.username===this.props.match.params.id)
            //         {
            //             return (<ExerciseComponent exerciseArg={curExer} 
            //                                        key={curExer._id}/>)
            //         }
            //     })
    }

    render()
    {
        return (
            <div>
                <h2>{(this.props.match.params.id).toUpperCase()}'s Exercises </h2>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Task</th>
                            <th>Duration(Minutes)</th>
                            <th>Date</th>
                            {/* <th>Edit/Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.ListAllExercises()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SpecificUser;