import axios from "axios";
import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import classes from './Ideas.module.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

const baseURL = "https://jsonplaceholder.typicode.com/users";

function Ideas() {
  const [userList, setUSerList] = useState([]);
  const { ExportCSVButton } = CSVExport;
var today = new Date();
 
  const columns = [
    // { dataField: 'id', text: 'Id' },
    { dataField: 'name', text: 'Ideator', sort: true},
    { dataField: 'username', text: 'Application Name', sort: true},
    { dataField: 'address.street', text: 'Status',sort: true },
    { dataField: 'email', text: 'Email', sort: true },
  ]

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 6,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('SizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('Page', page);
    }
  });
  React.useEffect(() => {
    getData();
  }, [])
 
    const MyExportToCSV = (props) =>{
       const handleClick =() =>{
         props.onExport();
       }
       return(
         <button onClick ={handleClick} className="ml-1 mb-2 btn btn-primary">Export to CSV</button>
       )
    }
  const getData = () => {
    axios.get(baseURL)
      .then(res => {
        
        setUSerList(res.data) 
        console.log(res.data.length);
      }).catch(err => console.log(err));
  }

  


  return (
    <div className="container">
      <div className={classes.resultGrid}>
        <h3>IDEAS</h3>
        <Link to='#' className={classes.link}>Total Ideas</Link>
        <Link to='#' className={classes.link}>On Hold</Link>
        <Link to='#' className={classes.link}>In Progress</Link>
        <Link to='#' className={classes.link}>POC Started</Link>
        <Link to='#' className={classes.link}>New</Link>
        <button className={`${classes.addIdeaNutton} btn btn-primary`}>ADD IDEA</button>
        <ToolkitProvider
         bootstrap4
          keyField="id"
          data = {userList}
          // data={userList.filter(value =>value.name === 'Ervin Howell')}    ---For Filter use
          columns={columns}
          exportCSV ={{
            fileName:'UserDetails.csv',
            noAutoBOM:false,
            exportAll:false
          }}
        >
         {
           props =>(
             <React.Fragment>
             <MyExportToCSV {...props.csvProps}/>
            <BootstrapTable
            headerClasses={classes.tableheader}
            // bootstrap4 keyField='id'
            // columns={columns}
            // data={userList}
            pagination={pagination}
            filter={filterFactory()} 
            {...props.baseProps}/>
            </React.Fragment>
           )
         }
        </ToolkitProvider>
      

        
      </div>

    </div>
  );
}

export default Ideas;