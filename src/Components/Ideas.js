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
import { useHistory, useLocation } from "react-router";
const baseURL = "https://jsonplaceholder.typicode.com/users";

function Ideas() {
  var today = new Date();
  const myData = [
    { ideaname: 'Style Savor', ideator: 'Kaushal', status: 'On Hold', applicationname: 'BD', date: today.getDate() },
    { ideaname: 'Health Harbor', ideator: 'Vikas', status: 'In Progress', applicationname: 'Pipeline Manangement', date: today.getDate() },
    { ideaname: 'Jump And Rise', ideator: 'Himanshu', status: 'POC Started', applicationname: 'Revenue Accounting', date: today.getDate() },
    { ideaname: 'Web Wise', ideator: 'Harmeet', status: 'New', applicationname: 'CPC', date: today.getDate() },
  ]
  const [userList, setUSerList] = useState(myData);
  const { ExportCSVButton } = CSVExport;

  let history = useHistory();
  let query = new URLSearchParams(useLocation().search);
  const name = query.get('status')
  console.log(name);
  const columns = [
    { dataField: 'ideaname', text: 'Idea Name' },
    { dataField: 'ideator', text: 'Ideator' },
    { dataField: 'status', text: 'Status' },
    { dataField: 'applicationname', text: 'Application Name' },
    { dataField: 'date', text: 'Date' },
  ]

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 4,
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

  // const MyExportToCSV = (props) =>{
  //    const handleClick =() =>{
  //      props.onExport();
  //    }
  //    return(
  //      <button onClick ={handleClick} className="ml-1 mb-2 btn btn-primary">Export to CSV</button>
  //    )
  // }
  const getData = () => {
    // axios.get(baseURL)
    //   .then(res => {

    setUSerList(myData)
    //   console.log(res.data.length);
    // }).catch(err => console.log(err));
  }


  return (
    <div className="container">
      <div className={classes.Ideas}><Link to='/dashboard' className={classes.idealink}> Ideas</Link></div>
      <div className={classes.resultGrid}>
        <div className={classes.linkgrid}>
        <Link to='/ideas' className={classes.link}>Total Ideas</Link>
        <Link to='/ideas?status=onHold' className={classes.link}>On Hold</Link>
        <Link to='/ideas?status=INProgress' className={classes.link}>In Progress</Link>
        <Link to='/ideas?status=POC Started' className={classes.link}>POC Started</Link>
        <Link to='/ideas?status=New' className={classes.link}>New</Link>
        </div>
        {/* <button className={`${classes.addIdeaNutton} btn btn-primary`}>ADD IDEA</button> */}


        {name == null &&
          <BootstrapTable
            headerClasses={classes.tableheader}
            keyField="id"
            data={userList}
            columns={columns}
            pagination={pagination}
            exportCSV={{
              fileName: 'UserDetails.csv',
              noAutoBOM: false,
              exportAll: false
            }}
          />


        }

        {name == 'onHold' &&
          <BootstrapTable
            headerClasses={classes.tableheader}
            keyField="id"
            data={userList.filter(value => value.status === 'On Hold')}
            columns={columns}
            pagination={pagination}
            exportCSV={{
              fileName: 'UserDetails.csv',
              noAutoBOM: false,
              exportAll: false
            }}
          />


        }

        {name == 'INProgress' &&
          <BootstrapTable
            headerClasses={classes.tableheader}
            keyField="id"
            data={userList.filter(value => value.status === 'In Progress')}
            columns={columns}
            pagination={pagination}
            exportCSV={{
              fileName: 'UserDetails.csv',
              noAutoBOM: false,
              exportAll: false
            }}
          />


        }

        {name == 'POC Started' &&
          <BootstrapTable
            headerClasses={classes.tableheader}
            keyField="id"
            data={userList.filter(value => value.status === 'POC Started')}
            columns={columns}
            pagination={pagination}
            exportCSV={{
              fileName: 'UserDetails.csv',
              noAutoBOM: false,
              exportAll: false
            }}
          />


        }

        {name == 'New' &&
          <BootstrapTable
            headerClasses={classes.tableheader}
            keyField="id"
            data={userList.filter(value => value.status === 'New')}
            columns={columns}
            pagination={pagination}
            exportCSV={{
              fileName: 'UserDetails.csv',
              noAutoBOM: false,
              exportAll: false
            }}
          />


        }

      </div>

    </div>
  );
}

export default Ideas;