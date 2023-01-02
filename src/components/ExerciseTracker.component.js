import React,{Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

function ExerciseTrackerComponent(args){
        // console.log("inside component");
        // console.log(args);
        return(
            <tr>
                <td>{args.exerciseArg.username}</td>
                <td>{args.exerciseArg.task}</td>
                <td>{args.exerciseArg.duration}</td>
                <td>{args.exerciseArg.date.substring(0,10)}</td>
                <td>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <Link className="btn btn-sm btn-primary" to={'/edit/'+args.exerciseArg._id}>Edit</Link>
                        <button className="btn btn-sm btn-warning" onClick={()=>args.deleteExerArg(args.exerciseArg)}>Delete</button>
                    </div>
                </td>
            </tr>
        );
}
class ExerciseTracker extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            exercises:[]
        }
        this.ListAllExercises=this.ListAllExercises.bind(this);
        this.deleteExercise=this.deleteExercise.bind(this);
    }
    componentDidMount()
    {
        Axios.get('http://localhost:5000/exercise/')
             .then(showExer=>{
                 this.setState({
                     exercises:showExer.data
                 })
             })
    }
    deleteExercise(exercise)
    {
        Axios.delete('http://localhost:5000/exercise/'+exercise._id)
             .then()
             .catch(err=>console.log("can't deleted :Error : "+err));

        this.setState({
            exercises:this.state.exercises.filter(de=>de._id!==exercise._id)
        })
    }
    ListAllExercises()
    {
       return this.state.exercises.map(curExer=>{
         //   console.log(curExer)
            return (<ExerciseTrackerComponent exerciseArg={curExer} 
                                       deleteExerArg={this.deleteExercise}
                                       key={curExer._id}/>)
        })
    }
    render()
    {
        return(
            <div>
                <h2>Order Log</h2>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Username</th>
                            <th>Task</th>
                            <th>Duration(Minutes)</th>
                            <th>Date</th>
                            <th>Edit/Delete</th>
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

export default ExerciseTracker;