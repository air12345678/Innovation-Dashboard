import { useState } from "react";
import axios from 'axios';
import classes from './AddIdea.module.css';
import { useHistory } from "react-router";
const AddIdea = () => {
    let history = useHistory();
    //Initial Values //
    const initialValues = {
        // ideator: "",
        // team: "",
        id:null,
        application: "",
        //status: "",
        problemstatement: "",
        currentdate: "",
        proposedSolution: "",
        pros: "",
        cons: "",
        comments: ""
    };
    const actions = [
        { label: "Add", value: 1 },
        { label: "Edit", value: 2 },
        { label: "Delete", value: 3 }
    ];

    const [values, setValues] = useState(initialValues);
    
    var today = new Date()
        // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //Handle Multiple Inputs//
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    
    const submitHandler = (e) => {
        e.preventDefault();
        const value = {
            // ideator: values.ideator,
            // team: values.team,
            application: values.application,
           // status: values.status,
            problemstatement: values.problemstatement,
            currentdate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            proposedSolution: values.proposedSolution,
            pros: values.pros,
            cons: values.cons,
            comments: values.comments
        }
       
        addData(values);
       setValues(initialValues)
       console.log(data);


    }
    const [ data, setData ] = useState([{id:1,application :"BD", problemstatement:"abc", proposedSolution:"demo",pros:"d",cons:"d",comments:"sd"}])
    const addData = idea => {
		idea.id = data.length + 1
		setData([ ...data, idea ])
	}
    
    const backButtonHandler = () => {
        //const kk = JSON.parse(localStorage.getItem('values'));
        //alert(kk.ideator);
        history.push('/dashboard')
    }
    return (

        
        <div>
            
            <form>
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="ideator">IDEATOR</label>
                            <input className={`${classes.inputControl} form-control`}
                                name="ideator"
                                id="ideator"
                                onChange={handleInputChange}
                                value={values.ideator} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="team">TEAM</label>
                            <input className={`${classes.inputControl} form-control`}
                                name="team"
                                id="team"
                                onChange={handleInputChange}
                                value={values.team} />
                        </div> */}
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="application">APPLICATION</label>
                            <input className={`${classes.inputControl} form-control`}
                                name="application"
                                id="application"
                                onChange={handleInputChange}
                                value={values.application} />
                        </div>
                        {/* <div className={`${classes.extradiv} col-lg-6 col-md-6 col-12`}>
                            <label htmlFor="status">Idea Status</label>
                            <select name="status" className={`${classes.inputControl} form-control`}
                                id="status"
                                onChange={handleInputChange}
                                value={values.status}>
                                <option value="">Select the Value</option>
                                {actions.map((value, key) => (
                                    <option key={key} value={value.label}>
                                        {value.label}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="Execution Time">Execution Time</label>
                            <p className={`${classes.datetext} form-control`}>{date}</p>
                        </div> */}
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="problemstatement">PROBLEM STATEMENT</label>
                            <textarea className={`${classes.inputControl} form-control`}
                                name="problemstatement"
                                id="problemstatement"
                                onChange={handleInputChange}
                                value={values.problemstatement}></textarea>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="proposedSolution">PROPOSED SOLUTION</label>
                            <textarea className={`${classes.inputControl} form-control`}
                                name="proposedSolution"
                                id="proposedSolution"
                                onChange={handleInputChange}
                                value={values.proposedSolution}></textarea>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="pros">PROS</label>
                            <textarea className={`${classes.inputControl} form-control`}
                                name="pros"
                                id="pros"
                                onChange={handleInputChange}
                                value={values.pros}></textarea>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <label htmlFor="cons">CONS</label>
                            <textarea className={`${classes.inputControl} form-control`}
                                name="cons"
                                id="cons"
                                onChange={handleInputChange}
                                value={values.cons}></textarea>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                            <label htmlFor="comments">Comments</label>
                            <textarea className={`${classes.inputControl} form-control`}
                                name="comments"
                                id="comments"
                                onChange={handleInputChange}
                                value={values.comments}></textarea>
                        </div>
                    </div>
                    {/* <div className ={classes.buttondiv}>
                
                </div> */}
                
                </div>
            </form>
            <div className={classes.buttondiv}>
                <button className="btn btn-primary" onClick={submitHandler}> Save </button>
                <button className={`${classes.btnExport} btn btn-primary`}> Export </button>
                <button className={`${classes.btnExport} btn btn-primary`} onClick={backButtonHandler}> Back </button>
            </div>                      
        </div>
       
    )
}

export default AddIdea;