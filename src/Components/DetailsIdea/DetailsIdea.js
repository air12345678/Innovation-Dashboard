import { useHistory, useParams } from "react-router-dom"
import classes from './DetailsIdea.module.css';
import Menu from "../Menu";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';



const DetailsIdea = () => {
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
    let history = useHistory();
    const { id } = useParams();
    const [idea, setIdea] = useState([]);

    useEffect(() => {
        loadIdea();
    }, []);

    const loadIdea = async () => {
        const response = await axios.get('http://localhost:8080/api/ideas/' + id)
        console.log(response.data.resultData);
        const myRepo = response.data.resultData;
        setIdea(myRepo)
    }
    const EditIdeaHandler = () => {
        history.push('/Edit-Idea/' + id);
    }

    const backButtonHandler = () => {
        history.push('/ideas');
    }
    return (
        <div>
            <Menu />
            <div className="container">
            {idea.map((value) =>
        <div className="row mt-4">
            
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Basic Details</Card.Title>
                <hr/>
                <Card.Text className={classes.basicDetailsData}>
                <ul type="none">
                    <li className={classes.contentBasicData}><span style={{fontWeight:"bold",fontSize:"20px"}}>Title :</span> {value.ideatitle}</li>
                  <br/>  <li className={classes.contentBasicData}><span style={{fontWeight:"bold",fontSize:"20px"}}>Application Name : </span> {value.Application}</li>
                  <br/>  <li className={classes.contentBasicData}><span style={{fontWeight:"bold",fontSize:"20px"}}>Ideator : </span>{value.ideator}</li>
                  <br/>  <li className={classes.contentBasicData}><span style={{fontWeight:"bold",fontSize:"20px"}}>Email : </span>{value.email_address}</li>
                   <br/> <li className={classes.contentBasicData}><span style={{fontWeight:"bold",fontSize:"20px"}}>Status : </span>{value.estimate}</li>
                </ul>
                </Card.Text>
                {/* <Button variant="primary"></Button> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Problem Statement</Card.Title>
                <hr/>
                <Card.Text className={classes.contentData}>
                  {value.problemstatement}
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Proposed Solution</Card.Title>
                <hr/>
                <Card.Text className={classes.contentData}>
                 {value.proposedSolution}
                   </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12 mt-3">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Benefits</Card.Title>
                <hr/>
                <Card.Text className={classes.contentData}>
                 {value.benefits}
                   </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12 mt-3">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Business Values</Card.Title>
                <hr/>
                <Card.Text className={classes.contentData}>
                  {value.businessvalues}
                 </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-sm-6 col-sm-12 mt-3">
            <Card className={classes.card}>
              {/* <Card.Img variant="top" src={cardimg} /> */}
              <Card.Body>
                <Card.Title className={classes.cardTitle}>Comments</Card.Title>
                <hr/>
                <Card.Text className={classes.contentData}>
                   {value.comments}
                   </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
          </div>
           )}
           <Button style={{marginTop:"10px"}} onClick={EditIdeaHandler}>Edit</Button>
           <Button style={{marginTop:"10px",marginLeft:"10px"}} onClick={backButtonHandler}>Back</Button>
           {/* <Button  style={{marginTop:"10px",marginLeft:"10px"}}  onClick={handleOpen}>
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
          <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
         <input type="file"/>
         <Button>Submit</Button>
        </Box>
      </StyledModal> */}
        </div>
        
        </div>
    )
}


export default DetailsIdea