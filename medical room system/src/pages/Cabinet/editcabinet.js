import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Input, FormText } from "reactstrap";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import CreateIcon from '@mui/icons-material/Create';

const Editcabinet= ({
  func,
  id,
  name_th,
  name_en,
  local,
  remark,
  status
}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ID, setID] = useState(id || '');
  const [Name_TH, setName_TH] = useState(name_th || '');
  const [Name_EN, setName_EN] = useState(name_en || '');
  const [Local, setLocal] = useState(local || '');
  const [Remark, setRemark] = useState(remark || '');
  const [Status, setStatus] = useState(status || '');
  const [updateDate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      'ID': ID,
      'Name_TH': Name_TH,
      'Name_EN': Name_EN,
      'Local': Local,
      'Remark': Remark,
      'Status': Status,
      'updateDate': updateDate,

    };
    console.log(data);

    fetch("http://localhost:8090/api/cabinet", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    }).then((res) => {
      func();
      handleClose();
    }).catch((err) => {
      console.log(err.message)
    })
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `data has been updated.`,
      showConfirmButton: false,
      timer: 1000,
    });
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocal(event.target.value);
  };


  return (
    <>
      <Button className="btn btn-info btn-sm" onClick={handleShow}>
      <CreateIcon />
      </Button>{' '}
      <Modal show={show} onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
       
       <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="col-11  mx-auto" closeButton>
                <div className="row" style={{ marginTop: '-20px' }}>
                  <div className="col-7">
                    <h3 className="mb-5">Edit Medical Box</h3>
                  </div>
                </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">ID:</label>
                  <Input
                    type="text"
                    className="form-control"
                    value={ID}
                    disabled="disabled"
                    onChange={e => setID(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Col>
                <Form.Group className="form-group">
                  <label for="exampleSelect">Location:</label>
                  <Input
                    className="mt-2"
                    type="select"
                    value={Local}
                    onChange={handleLocationChange}
                    required
                  >
                    <option value=''disabled>เลือก</option>
                    <option value="โรงกุ้ง" >โรงกุ้ง</option>
                    <option value="โรงปลา">โรงปลา</option>
                  </Input>
                </Form.Group>
              </Col>
            </div>
            <div className="form-card text-start">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">NameTH:</label>
                    <Input
                      type="text"
                      className="form-control"
                      value={Name_TH}
                      onChange={(e) => setName_TH(e.target.value)}
                      required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">NameEN:</label>
                    <Input
                      type="text"
                      className="form-control"
                      required
                      value={Name_EN}
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
                  value={Remark}
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
    </>
  )
}

export default Editcabinet