import React, { useState } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { Input, FormText } from "reactstrap";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import CreateIcon from '@mui/icons-material/Create';

const EditUser = ({
  func,
  id,
  password,
  name_th,
  name_en,
  userType,
  locationFish,
  locationShrimp,
  remark,
  status
}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ID, setID] = useState(id || '');
  const [Password, setPassword] = useState(password || '');
  const [Name_TH, setName_TH] = useState(name_th || '')
  const [Name_EN, setName_EN] = useState(name_en || '');
  const [UserType, setUserType] = React.useState(userType || '');
  const [Remark, setRemark] = useState(remark || '');
  const [Status, setStatus] = useState(status || '');
  const [LocationShrimp, setLocationShrimp] = useState(locationShrimp || false);
  const [LocationFish, setLocationFish] = useState(locationFish || false);
  const [updateDate] = useState(false);

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      'ID': ID,
      'Password': Password,
      'Name_TH': Name_TH,
      'Name_EN': Name_EN,
      'UserType': UserType,
      'LocationShrimp': LocationShrimp ? 'โรงกุ้ง' : '',
      'LocationFish': LocationFish ? 'โรงปลา' : '',
      'Remark': Remark,
      'Status': Status,
      'updateDate': updateDate,
    };

    fetch("http://localhost:8090/api/user", {
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
                    <h3 className="mb-5">Edit User</h3>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Username:</label> <label className="form-label textmark">*</label>
                        <Input
                          type="text"
                          className="form-control"
                          disabled="disabled"
                          value={ID}
                          onChange={e => setID(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Password: </label>
                        <Input
                          type="password"
                          className="form-control"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormText>ค่าเริ่มต้น password</FormText>
                      </div>
                    </div>
                 
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">NameTH: </label>  <label className="form-label textmark">*</label>
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
                        <label className="form-label">NameEN: </label>  <label className="form-label textmark">*</label>
                        <Input
                          type="text"
                          className="form-control"
                          required
                          value={Name_EN}
                          onChange={(e) => setName_EN(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label for="exampleSelect">Type:</label>
                        <Input
                          className="mt-2"
                          type="select"
                          value={UserType}
                          onChange={handleChange}
                          required
                        >
                          <option value='' disabled>เลือก</option>
                          <option value="พยาบาล">พยาบาล</option>
                          <option value="เจ้าหน้าที่ จป.">เจ้าหน้าที่ จป.</option>
                          <option value="HR-Benefit">HR-Benefit</option>
                          <option value="หัวหน้างาน">หัวหน้างาน</option>
                          <option value="System Admin">System Admin</option>
                        </Input>
                        </div>
                    </div>

                    <Col>
                      <Form.Group className="form-group">
                        <div className="col-7">
                          <label className="mb-3">Location:</label>
                        </div>
                        <div>
                          <Form.Check className="mb-10" inline>
                            <Form.Check.Input
                              type="checkbox"
                              className="me-2"
                              id="flexCheckShrimp"
                              onChange={(e) => setLocationShrimp(e.target.checked)}
                              checked={LocationShrimp}
                            />
                            <Form.Check.Label htmlFor="flexCheckShrimp">โรงกุ้ง</Form.Check.Label>
                          </Form.Check>

                          <Form.Check inline>
                            <Form.Check.Input
                              type="checkbox"
                              className="me-2"
                              id="flexCheckFish"
                              checked={LocationFish}
                              onChange={(e) => setLocationFish(e.target.checked)}
                            />
                            <Form.Check.Label htmlFor="flexCheckFish">โรงปลา</Form.Check.Label>
                          </Form.Check>
                        </div>
                      </Form.Group>
                    </Col>
                  </div>
                  <Form.Group>
                    <label htmlFor="validationTextarea" className="form-label">Remark:</label>
                    <Input
                      className="mb-3"
                      type="textarea"
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
                    required
                  >
                    <FormControlLabel control={<Radio />} value="Active" label="Active" />
                    <FormControlLabel control={<Radio />} value="Inactive" label="Inactive" />
                  </RadioGroup>
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

export default EditUser
