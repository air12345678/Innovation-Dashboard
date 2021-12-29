import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import classes from './MyIdeas.module.css';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Menu from "../Menu";
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDataGrid-row:nth-child(even)': {
      backgroundColor: 'white',
      fontSize: 15,
      textAlign: 'center'
    },
    '& .MuiDataGrid-row:nth-child(odd)': {
      backgroundColor: 'silver',
      fontSize: 15,
      textAlign: 'center'
    },
    "& .styledrows": {
      backgroundColor: "green",

    }
  }
}));
export default function MyIdeas(props) {
  let history = useHistory();
  const Class = useStyles();
  let query = new URLSearchParams(useLocation().search);
  const name = query.get('status')
  const [ideasList, setIdeasList] = React.useState([]);
  React.useEffect(() => {
    getData();
  }, [])
  const getData = async () => {
    var c = localStorage.getItem('email');
    var d = JSON.parse(c);
    console.log(d);
    //const response = await axios.get('http://localhost:8080/api/ideas' + d);
    const response = await axios.get('http://localhost:8080/api/ideas')
    console.log(response.data.resultData.filter(value =>value.email_address === d));
   // const myRepo = response.data.resultData;
   const myRepo = response.data.resultData.filter(value =>value.email_address === d);
    setIdeasList(myRepo)
  }
  const columns = [
    { field: 'ideatitle', headerName: 'IdeaName', headerAlign: 'center', width: 180, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'ideator', headerName: 'Ideator', headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'email_address', headerName: 'Email', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'estimate', headerName: 'Status', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'Application', headerName: 'Application Name', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },

    {
      field: "Action",
      width: 180,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return (
          <div>           
            <i className="fa fa-edit" style={{ marginLeft: '40px',cursor:'pointer' }}
             onClick = {() =>editHandler(cellValues.id)} title="Edit"></i>
            <i className="fa fa-trash" aria-hidden="true" style={{ marginLeft: '20px',cursor:'pointer' }} title="Delete" 
            onClick={ () => {
              const confirmBox = window.confirm(
                "Do you really want to delete "
              )
              if (confirmBox === true) {               
               deleteIdeaHandler(cellValues.id)
              }
            }}></i>
            <i class="fa fa-info-circle" aria-hidden="true" style={{ marginLeft: '20px',cursor:'pointer' }} title="Details" 
            onClick={() =>detailsHandler(cellValues.id)}></i>
           
          
          </div>  
        );
      }
    }
    ]

const editHandler =(ideaId) =>{
  history.push('/Edit-Idea/'+ideaId)
}

const detailsHandler =(ideaId) =>{
console.log();
history.push('/IdeaDetails/'+ideaId)
}

  const deleteIdeaHandler = (ideaId) => {
    axios.delete("http://localhost:8080/api/ideas/" + ideaId)
      .then((result) => {
        if (result.statusText === 'Success') {
          getData();
        }
        else {
          getData();
        }
      })
  }
  return (
    <div>
      <Menu />
      <div style={{
        height: 490,
        width: '82.26%',
        
      }}
        className={`${classes.resultGrid1} container`}>
        <div>         
            <Link to='/ideas' className={classes.link}>Total Ideas</Link>
            <Link to='/ideas?status=New' className={classes.link}>New</Link>   
            <Link to='/ideas?status=INProgress' className={classes.link}>In Progress</Link>
            <Link to='/ideas?status=onHold' className={classes.link}>On Hold</Link>            
            <Link to='/ideas?status=POC Started' className={classes.link}>POC Started</Link>
            <Link to='/ideas?status=POC Finished' className={classes.link}>POC Finished</Link>
            <Link to='/ideas?status=Finalized' className={classes.link}>Finalized</Link>      
            <Link to='/add-idea' className={classes.link}>Create Idea</Link>
        </div>
        {name == null && <DataGrid
          className={Class.root}
          rows={ideasList}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(cellValues) => `styledrows`}
          columns={columns}

        />}

        {name === 'onHold' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'OnHold')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
        {name === 'INProgress' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'In Progress')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
         {name === 'POC Started' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'POC Started')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
        {name === 'New' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'New')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
         {name === 'POC Finished' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'POC Finished')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
        {name === 'Finalized' && <DataGrid
          className={Class.root}
          rows={ideasList.filter(value => value.estimate === 'Finalized')}
          sx={{
            border: 'solid black 1px',
            '& .super-app-theme--header': {
              backgroundColor: 'black',
              color: 'white',
              fontSize: 20,
            },
            '& .super-app-theme--cell': {

              textAlign: 'center'
            },
          }}
          getRowClassName={(params) => `styledrows`}
          columns={columns}

        />}
      </div>

    </div>
  );
}

