import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Menu from "../Menu"
import classes from './EditIdea.module.css';
const EditIdea = () => {
    const { id } = useParams();
    let history = useHistory();
    const [idea, setIdea] = useState({
        ideatitle: "",
        ideator: "",
        lob:"",
        Application: "",
        status: "",
        problemstatement: "",
        proposedSolution: "",
        benefits: "",
        businessvalues: "",
        comments: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIdea({
            ...idea,
            [name]: value,
        });
    };
    useEffect(() => {
        loadIdea();
    }, []);

    const loadIdea = async () => {
        const response = await axios.get('http://localhost:8080/api/ideas/' + id)
        console.log(response.data.resultData[0].ideator);
        const myRepo = JSON.stringify(response.data.resultData);
        console.log("MyRepo" + myRepo);
        setIdea({
            ideatitle: response.data.resultData[0].ideatitle,
            ideator: response.data.resultData[0].ideator,
            lob: response.data.resultData[0].LOB,
            Application: response.data.resultData[0].Application,
            status: response.data.resultData[0].estimate,
            problemstatement: response.data.resultData[0].problemstatement,
            proposedSolution: response.data.resultData[0].proposedSolution,
            benefits: response.data.resultData[0].benefits,
            businessvalues: response.data.resultData[0].businessvalues,
            comments: response.data.resultData[0].comments
        })
    }
    var today = new Date()
    var a = localStorage.getItem('name');
    var b = JSON.parse(a);
    var c = localStorage.getItem('email');
    var d = JSON.parse(c);
    const updateIdea = (e) => {
        e.preventDefault();
        const datatobeUpdate = {
            id: id,
            ideatitle: idea.ideatitle,
            lob:idea.lob,
            Application: idea.Application,
            status: idea.status,
            problemstatement: idea.problemstatement,
            proposedSolution: idea.proposedSolution,
            benefits: idea.benefits,
            businessvalues: idea.businessvalues,
            comments: idea.businessvalues,
            Updtd_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours()+':'+today.getMinutes()+':'+today.getSeconds(),
            Updtd_by: b
        }

        axios.put('http://localhost:8080/api/ideas', datatobeUpdate)
            .then((result) => {
                console.log(result.data.resultData);
                if (result.statusText == 'Success') {
                    alert('Data is Updated Successfully');
                    history.push('/ideas')
                }
                else {
                    alert("Invalid")
                }
            })
    }

    const backbuttonHandler = () =>{
        history.push('/ideas')
    }
    return (
        <div>
            <Menu />
            <div className={`${classes.formdiv} container`}>
                <h1 className={classes.header}><i className="fa fa-lightbulb-o" >&nbsp;
                    EDIT IDEA</i></h1>
                <form onSubmit={updateIdea}>
                    <label>Idea Title</label>
                    <input className="form-control" type="text" name="ideatitle" placeholder="Idea Title" onChange={handleInputChange} value={idea.ideatitle} />

                    <label>Ideator</label>
                    <input className="form-control" type="text" name="ideatitle" placeholder="Idea Title" onChange={handleInputChange} value={idea.ideator} disabled />
                
                    <label>LOB</label>
                    <select name="lob" className="form-control"
                        id="lob" value={idea.lob} onChange={handleInputChange}>
                        <option value="" disabled> None</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Equipment">Equipment</option>
                    </select>
                
                    <label>Application</label>
                    <input className="form-control" type="text" name="Application" placeholder="Application" onChange={handleInputChange} value={idea.Application} />

                    <label>Status</label>
                    <select name="status" className="form-control"
                        id="status" value={idea.status} onChange={handleInputChange}>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="OnHold">OnHold</option>
                        <option value="POC Started">POC Started</option>
                        <option value="POC Finished">POC Finished</option>
                        <option value="Finalized">Finalized</option>
                    </select>
                    <label>Problem Statement</label>
                    <textarea className="form-control" name="problemstatement" placeholder="Problem Statment" onChange={handleInputChange} value={idea.problemstatement}></textarea>

                    <label>Proposed Solution</label>
                    <textarea className="form-control" name="proposedSolution" placeholder="Proposed Solution" onChange={handleInputChange} value={idea.proposedSolution}></textarea>

                    <label>Benefits</label>
                    <textarea className="form-control" name="benefits" placeholder="Benefits" onChange={handleInputChange} value={idea.benefits}></textarea>

                    <label>Business Values($)</label>
                    <textarea className="form-control" name="businessvalues" placeholder="Business Values" onChange={handleInputChange} value={idea.businessvalues}></textarea>

                    <label>Comments</label>
                    <textarea className="form-control" name="comments" placeholder="Comments" onChange={handleInputChange} value={idea.comments}></textarea>

                    <Button variant="contained" style={{marginTop:"10px"}} type="submit" >Save</Button>
                    <Button variant="contained" style={{marginLeft:"10px",marginTop:"10px"}} onClick={backbuttonHandler} >Back</Button>
                </form>
            </div>
        </div>
    )
}

export default EditIdea