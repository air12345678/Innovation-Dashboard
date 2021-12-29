import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './Error.module.css'
const Error = () => {
    let history = useHistory();
    return(
        <div className={`${classes.section} ${classes.content}`}>
        <h1 className={classes.error}>404</h1>
        <div className={classes.page}>Ooops!!! The page you are looking for is not found</div>
        <Link to='/login' className={classes.backhome} >Back to Login</Link>
      </div>
    )
    }

export default Error