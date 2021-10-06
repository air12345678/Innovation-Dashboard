import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import classes from './Dashboard.module.css';
import axios from "axios";

const Dashboard = () => {
  const baseURL = "https://jsonplaceholder.typicode.com/users";
  const [userList, setUSerList] = useState([]);
  let history = useHistory();
  const [selected, setSelected] = useState("");

  const dashboardHandler = () => {
    setSelected("btn1");
    history.push('/dashboard');
  };

  const teamHandler = () => {
    setSelected("btn2");

  }

  const innovationHandler = () => {
    setSelected("btn3");
  }

  const addIdeaHandler = () => {
    setSelected("btn4");
    history.push('/add-idea')
  }
  useEffect(() => {
    getData();
  }, [])
  const getData = () => {
    axios.get(baseURL)
      .then(res => {
        setUSerList(res.data)
        console.log(res.data);
      }).catch(err => console.log(err));
  }

  return (
    <div className="container">
      <button className={classes.dashboardButton}
        id="btn1"
        onClick={dashboardHandler}
        style={{ backgroundColor: "btn1" === selected ? "white" : "black", color: "btn1" === selected ? "black" : "white" }}
      >
        DASHBOARD
      </button>
      <button className={classes.teamsButton}
        id="btn2"
        onClick={teamHandler}
        style={{ backgroundColor: "btn2" === selected ? "white" : "black", color: "btn2" === selected ? "black" : "white" }}
      >
        TEAMS
      </button>
      <button className={classes.innovatonButton}
        id="btn3"
        onClick={innovationHandler}
        style={{ backgroundColor: "btn3" === selected ? "white" : "black", color: "btn3" === selected ? "black" : "white" }}
      >
        INNOVATION
      </button>
      <button
        id="btn4"
        style={{ backgroundColor: "btn4" === selected ? "white" : "black", color: "btn4" === selected ? "black" : "white" }}
        className={classes.addIdeaButton} onClick={addIdeaHandler}>ADD IDEA</button>

      <div className="container">
        <div className="row">
          <div className={classes.ideas}>
            <h2 className={classes.ideaHeader}>IDEAS</h2>
            <ul className={classes.ideaContent}>
             
              <li><Link to ='/ideas' className={classes.link}>TOTAL IDEAS:</Link>{userList.length}</li>
              <li>ACCEPTED</li>
              <li>PENDING/UNDER DISCUSSION</li>
              <li>POC Started</li>
            </ul>
          </div>
          <div className={classes.cheerboard}>
            <h2 className={classes.cheerboardHeader}>CHEERBOARD</h2>
          <div className={classes.header}>
            <img src="logo192.png" className={classes.imgcircle} />
            <div className={classes.wrapper}>
              <p className={classes.publishername}>Kaushal Agrawal</p>
              <div className={classes.postlocation}>
                Gurgaon
              </div>
              
            </div>
          </div>
          <div className={classes.header}>
            <img src="logo192.png" className={classes.imgcircle} />
            <div className={classes.wrapper}>
              <a href="user.html" className={classes.publishername}>Vikas</a>
              <div className={classes.postlocation}>
                Delhi
              </div>
              
            </div>
          </div>
          
        </div>
        <div className={classes.calender}>
          <h2>CALENDAR</h2>
        </div>
        <div className={classes.learningmaterial}>
          <h2>LEARNING MATERIAL</h2>
        </div>
      </div>
    </div>
    </div >
  );
}

export default Dashboard;