import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import classes from './Dashboard.module.css';
import axios from "axios";
import Menu from "../Menu";
import {  Card } from "react-bootstrap";
import cardimg from '../../Images/alloc_dashboard.png'

const Dashboard = () => {
  let history = useHistory();

  const ideasHandler = () => {
    history.push('/ideas')
  }

  const addIdeaHandler = () => {
    history.push('/add-idea')
  }

  return (
    <div>
      <Menu />
      <h1 className={classes.headers}>Welcome to Innovation Dashboard !</h1>
      <h3 className={classes.headers}>Choose any option</h3>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card className={classes.card} onClick={addIdeaHandler}>
              <Card.Img variant="top" src={cardimg} />
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Create Ideas</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card onClick={ideasHandler} className={classes.card}>
              <Card.Img variant="top" src={cardimg} />
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Ideas</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card >
              <Card.Img variant="top" src={cardimg} />
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;