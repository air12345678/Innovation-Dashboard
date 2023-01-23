import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Menu from "../Menu";
import classes from './AddIdea.module.css';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const AddIdea = () => {
    const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

    const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: background.paper;
    -webkit-tap-highlight-color: transparent;
  `;

    const style = {
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var history = useHistory();
    const initialValue = {
        title: ""
    }
    const { register, control, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();
    const [values, setValues] = useState(initialValue)
    var [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        alert(e.target.files.length)
        setFiles(e.target.files)

        // setFileName(e.target.files.name);
    };

    var a = localStorage.getItem('name');
    var b = JSON.parse(a);
    var c = localStorage.getItem('email');
    var d = JSON.parse(c);
    var today = new Date()
    console.log("Today" + today);
    const onSubmit = (data, e) => {

        e.preventDefault();
        const value = {
            id: 0,
            ideatitle: data.ideatitle,
            lob: data.lob,
            Application: data.Application,
            problemstatement: data.problemstatement,
            proposedSolution: data.proposedSolution,
            benefits: data.benefits,
            businessvalues: data.businessvalues,
            comments: data.comments,
            status: "New",
            ideator: b,
            email: d,
            crtd_time: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
            Crtd_by: b,
            Updtd_time: null,
            Updtd_by: null,

        }
        console.log(value);
        // axios.post('http://localhost:8080/api/ideas',value)
        //     .then((response)=>{
        //         console.log(response.data.resultData);
        //        if(response.statusText =="Success")
        //        {
        // const formData = new FormData();
        // formData.append("file", file);
        // formData.append("fileName", fileName);
        // formData.append("ideaId", response.data.resultData);
        // formData.append("crtd_by",b);
        // formData.append("crtdt_dt",today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
        // axios.post("http://localhost:8080/api/ideas/uploadfile", formData)
        // .then((result)=>{
        //     if(result.statusText == "Success"){
        //         alert('Submitted');
        //     }
        // })
        //alert('Data is successfully Submitted');
        confirmAlert({
            // title: 'Confirm to submit',
            message: 'Are you sure want to register idea',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post('http://localhost:8080/api/ideas', value)
                            .then((response) => {
                                console.log("ResultData" + response.data.resultData);
                                console.log(response.statusText);
                                if (response.statusText == "Success") {
                                    const formData = new FormData();
                                    console.log("Files" + files);
                                    for (let i = 0; i < files.length; i++) {

                                        formData.append('file', files[i]);
                                    }
                                    formData.append('idea_id', response.data.resultData)
                                    formData.append('crtd_by', b)
                                    formData.append('crtd_dt', today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())

                                    console.log(formData);
                                    axios.post("http://localhost:8080/api/uploadFile", formData)
                                        .then((result) => {
                                            if (result.statusText == "Success") {
                                                confirmAlert({
                                                    message: 'Idea is Successfully Registered', buttons: [{
                                                        label: 'Ok', onClick: () => history.push('/ideas')
                                                    }]
                                                })
                                            }
                                        })


                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })

        // }
        //})
        // e.target.reset();

    }
    const backButtonHandler = () => {
        history.push('/dashboard')
    }
  
    return (
        <div>
            <Menu />
            <div className={`${classes.formdiv} container`}>
                <h1 className={classes.header}><i className="fa fa-lightbulb-o" >&nbsp;
                    ADD IDEA</i></h1>
                {/* <h4>Special Instruction: Please Upload Idea Related File if any.This field is not Required</h4> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="ideatitle"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                id="ideatitle"
                                labelWidth={40}
                                helperText={errors.ideatitle ? errors.ideatitle.message : null}
                                variant="outlined"
                                label="Idea Title"
                                error={errors.ideatitle}

                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Idea Title is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,.()\s]+$/,
                            //     message: "TITLE is in invalid Format"
                            // }
                        }}
                    />
                    <br />

                    {/* <FormControl sx={{ m: 1, minWidth: '512px' }}> */}
                    {/* <InputLabel id="LOB">LOB</InputLabel> */}
                    <Controller

                        name="lob"
                        render={({ field }) => (
                            // <Select
                            //     id="LOB"
                            //     label="LOB"
                            //     labelId="LOB"
                            //     variant="outlined"
                            //     error={errors.lob}

                            // >
                            //     <MenuItem value="">
                            //         <em>None</em>
                            //     </MenuItem>
                            //     <MenuItem value="IT">IT</MenuItem>
                            //     <MenuItem value="Finance">Finance</MenuItem>
                            //     <MenuItem value="Equipment">Equipment</MenuItem>
                            // </Select>
                            <TextField select
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                id="LOB"
                                labelWidth={40}
                                helperText={errors.lob ? errors.lob.message : null}
                                variant="outlined"
                                label="LOB"
                                error={errors.lob}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                                <MenuItem value="Finance">Finance</MenuItem>
                                <MenuItem value="Equipment">Equipment</MenuItem>
                            </TextField>
                        )
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'LOB is required'
                        }}
                    />
                    {/* </FormControl> */}
                    <br />
                    <Controller
                        name="Application"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                id="Application"
                                labelWidth={40}
                                helperText={errors.Application ? errors.Application.message : null}
                                variant="outlined"
                                label="Application"
                                error={errors.Application}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Application is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,()\s]+$/,
                            //     message: "Application is in invalid Format"
                            // }
                        }}
                    />
                    <br />
                    <Controller
                        name="problemstatement"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                multiline
                                rows={5}
                                id="problemstatement"
                                labelWidth={40}
                                helperText={errors.problemstatement ? errors.problemstatement.message : null}
                                variant="outlined"
                                label="Problem Statement"
                                error={errors.problemstatement}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Problem Statement is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,.()\s]+$/,
                            //     message: "Problem Statement is in invalid Format"
                            // }
                        }} />

                    <br />
                    <Controller
                        name="proposedSolution"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                multiline
                                rows={5}
                                id="proposedSolution"
                                labelWidth={40}
                                helperText={errors.proposedSolution ? errors.proposedSolution.message : null}
                                variant="outlined"
                                label="Proposed Solution"
                                error={errors.proposedSolution}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Proposed Solution is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,()\s]+$/,
                            //     message: "Proposed Solution is in invalid format"
                            // }
                        }} />
                    <br />
                    <Controller
                        name="benefits"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                multiline
                                rows={5}
                                id="Benefits"
                                labelWidth={40}
                                helperText={errors.benefits ? errors.benefits.message : null}
                                variant="outlined"
                                label="Benefits"
                                error={errors.benefits}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Benefits is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,()\s]+$/,
                            //     message: "Benefits is in invalid format"
                            // }
                        }} />
                    <br />
                    <Controller
                        name="businessvalues"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                multiline
                                rows={5}
                                id="BUSINESSVALUES"
                                labelWidth={40}
                                helperText={errors.businessvalues ? errors.businessvalues.message : null}
                                variant="outlined"
                                label="Business Values($)"
                                error={errors.businessvalues}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Business Values is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,()\s]+$/,
                            //     message: "Business Values is in invalid format"
                            // }
                        }} />
                    <br />
                    <Controller
                        name="comments"
                        render={({ field }) => (
                            <TextField
                                sx={{ m: 1, width: '64ch' }}
                                {...field}
                                multiline
                                rows={5}
                                id="comments"
                                labelWidth={40}
                                helperText={errors.comments ? errors.comments.message : null}
                                variant="outlined"
                                label="Comments"
                                error={errors.comments}
                            />)
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Comments is required',
                            // pattern: {
                            //     value: /^(?!\s)[A-Za-z-0-9,()\s]+$/,
                            //     message: "Comments in invalid Format"
                            // }
                        }} />
                    <br />
                    <input type="file" className="form-control ml-2" multiple style={{ width: '64ch' }} onChange={saveFile} />
                    <Button variant="contained" type="submit">Save</Button>
                    <Button variant="contained" style={{ marginLeft: '10px' }} onClick={backButtonHandler}>Back</Button>
                    {/* <Button variant="contained" style={{marginLeft:"10px"}}  onClick={handleOpen}>
       Upload File
      </Button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Text in a modal</h2>
         <input type="file"/>
         <Button variant="contained" >Upload</Button>
        </Box>
      </StyledModal> */}
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}


export default AddIdea