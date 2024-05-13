import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Input, FormText } from "reactstrap";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';

const Createunit = ({ func }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for duplicate ID before submitting
    const isDuplicateID = await checkDuplicateID(ID);

    if (isDuplicateID) {
      // Show alert for duplicate ID
      Swal.fire({
        icon: 'error',
        title: 'Duplicate ID',
        text: 'Please enter new ID.',
      });
      return;
    }

    const data = {
      'ID': ID,
      'Name_TH': Name_TH,
      'Name_EN': Name_EN,
      'Remark': Remark,
      'Status': Status,
    }
    try {
      const response = await fetch('http://localhost:8090/api/unit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        handleClose();
        func();
        Swal.fire({
          icon: 'success',
          title: 'Add!',
          text: `Data has been added.`,
          showConfirmButton: false,
          timer: 1000,
        });

      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to check duplicate ID
  const checkDuplicateID = async (id) => {
    const response = await fetch(`http://localhost:8090/api/unit/checkDuplicateID/` + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.isDuplicate;
  };


  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    setStatus('Active');
  }, []);
  const [Name_TH, setName_TH] = useState('');
  const [Name_EN, setName_EN] = useState('');
  const [Remark, setRemark] = useState('');
  const [ID, setID] = useState('');
  const [Status, setStatus] = useState('');



  return (
    <>
    <div>
      <Col sm="12" lg="12">
      <Button
            variant="primary"
            onClick={handleShow}
            style={{
              borderRadius: '50%', // This makes the button round
              width: '40px', // Adjust the width as needed
              height: '48px', // Adjust the height as needed
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AddIcon />
          </Button>
          <Modal show={show} onHide={handleClose}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title">

            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="col-11  mx-auto" closeButton>
                <div className="row" style={{ marginTop: '-20px' }}>
                  <div className="col-7">
                    <h3 className="mb-5">Add Medicine Unit</h3>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">ID:</label> <label className="form-label textmark"> *</label>
                        <Input
                          type="text"
                          className="form-control"
                          onChange={e => setID(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                  </div>
                  <div className="form-card text-start">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Name: </label> <label className="form-label textmark"> *</label>
                          <Input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName_TH(e.target.value)}
                            required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">NameEN:</label> <label className="form-label textmark"> *</label>
                          <Input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setName_EN(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <Form.Group>
                      <label htmlFor="validationTextarea" className="form-label">Remark:</label>
                      <Input
                        className="mb-3"
                        type="textarea"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={(e) => setRemark(e.target.value)}
                      />

                    </Form.Group>
                    <label className="mb-2">Status:</label>
                    <RadioGroup
                      className="mb-3"
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={Status}
                      onChange={handleStatusChange}
                      required
                    >
                      <FormControlLabel control={<Radio />} value="Active" label="Active" />
                      <FormControlLabel control={<Radio />} value="Inactive" label="Inactive" />
                    </RadioGroup>
                  </div>
                  </Modal.Body>
              <Modal.Footer style={{ marginRight: '30px' ,marginBottom : '20px' }}>
                <Button variant="btn btn-danger" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="btn btn-success">Save</Button>{' '}
              </ Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </div>
    </>
  )
}

export default Createunit
