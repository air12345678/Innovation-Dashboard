import * as React from 'react';
import { DataGrid, GridApi, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import classes from './Ideas.module.css';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Menu from "../Menu";
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { gridClasses } from '@mui/material';

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
export default function Ideas(props) {
  let history = useHistory();
  const { id } = useParams;
  const Class = useStyles();
  let query = new URLSearchParams(useLocation().search);
  const name = query.get('status')
  var today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const myData = [
    { id: 1, ideaname: 'Rail Cargo Management Solution', ideator: 'Kaushal', status: 'On Hold', applicationname: 'BD', date: date },
    { id: 2, ideaname: 'Traffic Management System', ideator: 'Vikas', status: 'In Progress', applicationname: 'Pipeline Manangement', date: date },
    { id: 3, ideaname: 'Enterprise Asset Management', ideator: 'Himanshu', status: 'POC Started', applicationname: 'Revenue Accounting', date: date },
    { id: 4, ideaname: 'Mobile Work Management Solutions', ideator: 'Harmeet', status: 'New', applicationname: 'CPC', date: date },
  ]
  const [ideasList, setIdeasList] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  React.useEffect(() => {
    getData();
  }, [])
  const getData = async () => {

    const response = await axios.get('http://localhost:8080/api/ideas')

    console.log(response.data.resultData);
    const myRepo = response.data.resultData;
    setIdeasList(myRepo)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport  />
      </GridToolbarContainer>
    );
  }
  const columns = [
    { field: 'ideatitle', headerName: 'IdeaName', headerAlign: 'center', width: 180, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'ideator', headerName: 'Ideator', headerAlign: 'center', width: 180, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'email_address', headerName: 'Email', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'estimate', headerName: 'Status', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'LOB', headerName: 'LOB', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'Application', headerName: 'Application Name', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
    { field: 'crtd_time', headerName: 'Date', width: 180, headerAlign: 'center', headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },

    {
      field: "Action",
      width: 190,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderCell: (cellValues) => {
        return (
          <div>
            <i class="fa fa-info-circle" aria-hidden="true" style={{ marginLeft: '40px', cursor: 'pointer' }} title="Details"
              onClick={() => detailsHandler(cellValues.id)}></i>
            <i className="fa fa-edit" style={{ marginLeft: '20px', cursor: 'pointer' }}
              onClick={() => editHandler(cellValues.id)} title="Edit"></i>
            <i className="fa fa-trash" aria-hidden="true" style={{ marginLeft: '20px', cursor: 'pointer' }} title="Delete"
              onClick={() => {
                confirmAlert({
                  // title: 'Confirm to submit',
                  message: 'Are you sure want to delete.',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => deleteIdeaHandler(cellValues.id)
                    },
                    {
                      label: 'No',
                      onClick: () => null
                    }
                  ]
                });
              }}></i>
            {/* <i class="fa fa-info-circle" aria-hidden="true" style={{ marginLeft: '20px', cursor: 'pointer' }} title="Details"
              onClick={() => detailsHandler(cellValues.id)}></i> */}


          </div>
        );
      }
    }
    // { field: 'id', headerName: 'ID', headerAlign: 'center', width: 180, headerClassName: 'super-app-theme--header', },
    // { field: 'body', headerName: 'Body', headerAlign: 'center', width: 180, headerClassName: 'super-app-theme--header', },
  ]

  const editHandler = (ideaId) => {
    history.push('/Edit-Idea/' + ideaId)
  }

  const detailsHandler = (ideaId) => {
    console.log();
    history.push('/IdeaDetails/' + ideaId)
  }

  const deleteIdeaHandler = (ideaId) => {
    axios.delete("http://localhost:8080/api/ideas/" + ideaId)
      .then((result) => {
        if (result.statusText == 'Success') {
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
        height: 200,
        // width: '89.74%',
        width: '100%',
        borderRadius:'10px'
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
        {name == null && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30]}
          pagination
          // componentsProps={{ toolbar: { csvOptions: { fields: ['ideatitle','ideator','Application', 'LOB','problemstatement','proposedSolution','benefits','businessvalues','comments'] } } }}
          components={{
            Toolbar: CustomToolbar,
          }}
      />}

        {name == 'onHold' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
        {name == 'INProgress' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
        {name == 'POC Started' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
        {name == 'New' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
        {name == 'POC Finished' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
        {name == 'Finalized' && <DataGrid autoHeight
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />}
      </div>

    </div>
  );
}

