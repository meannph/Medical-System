import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, FormGroup } from 'react-bootstrap'
import { Input, FormText } from "reactstrap";
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';


const CreateItem = ({ func }) => {
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
      'Detail': Detail,
      'Type': Type,
      'Remark': Remark,
      'Status': Status,
      'num_largeunit': num_largeunit,
      'largeunit': largeunit,
      'num_subunit': num_subunit,
      'subunit': subunit,

    };
 
    try {
      const response = await fetch('http://localhost:8090/api/medicine', {
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
    const response = await fetch(`http://localhost:8090/api/medicine/checkDuplicateID/` + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result.isDuplicate;
  };
  const [Name_TH, setName_TH] = useState('');
  const [Name_EN, setName_EN] = useState('');
  const [Remark, setRemark] = useState('');
  const [Detail, setDetail] = useState('');
  const [Type, setType] = useState('');
  const [ID, setID] = useState('');
  const [Status, setStatus] = useState('');
  const [largeunit, setlargeunit] = useState('');
  const [subunit, setsubunit] = useState('');
  const [num_largeunit, setnum_largeunit] = useState('');
  const [num_subunit, setnum_subunit] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setlargeunit(event.target.value);
  };
  const handleChangeNum = (event) => {
    setsubunit(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setStatus("Active");
  }, []);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

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
                    <h3 className="mb-5">Add Medicine Item</h3>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">ID: </label> <label className="form-label textmark"> *</label>
                        <Input
                          type="text"
                          className="form-control"
                          value={ID}
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
                        <label className="form-label">NameTH:</label> <label className="form-label textmark"> *</label>
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Detail: </label> <label className="form-label textmark"> *</label>
                      <Input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => setDetail(e.target.value)}
                      />
                    </div>
                  </div>
                  <Col lg="6">
                    <Form.Group className="form-group">
                      <label>Type: </label> <label className="form-label textmark"> *</label>
                      <Input
                          type="select"
                        value={Type}
                        onChange={handleTypeChange}
                        required
                      >
                        <option disabled value="">เลือก</option>
                        <option value="ยารับประทาน">ยารับประทาน</option>
                        <option value="ยาภายนอก" >ยาภายนอก</option>
                        <option value="วัสดุทางการแพทย์">วัสดุทางการแพทย์</option>
                      </Input>
                    </Form.Group>
                  </Col>
                </div>
                <div className="row">
                <label >Unit: <label className="form-label textmark"> *</label></label>
                  <Col >
                    <Form.Group className="form-group mt-2">
                      <Input
                        type="select"
                        value={largeunit}
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="">เลือก</option>
                        <option value='กล่อง'>กล่อง</option>
                        <option value='แพ็ค'>แพ็ค</option>
                        <option value='โหล'>โหล</option>
                        <option value='เม็ด'>เม็ด</option>
                        <option value='ซอง'>ซอง</option>
                        <option value='แผ่น'>แผ่น</option>
                        <option value='กรัม'>กรัม</option>
                        <option value='ม้วน'>ม้วน</option>
                        <option value='ก้อน'>ก้อน</option>
                        <option value='ก้าน'>ก้าน</option>
                        <option value='ใบ'>ใบ</option>
                        <option value='ขวด'>ขวด</option>
                        <option value='cc'>cc</option>
                        </Input>
                    </Form.Group>
                  </Col>
                  <div className="col-md-2">
                    <div className="form-group mt-2">
                      <Input
                        type="number"
                        className="form-control"
                        name="lname"
                        required
                        onChange={(e) => setnum_largeunit(e.target.value)}
                      />
                    </div>
                  </div>
                  <Col >
                    <Form.Group className="form-group mt-2">
                      <Input
                        type="select"
                        value={subunit}
                        onChange={handleChangeNum}
                        required
                      >
                        <option disabled value="">เลือก</option>
                        <option value='กล่อง'>กล่อง</option>
                        <option value='แพ็ค'>แพ็ค</option>
                        <option value='โหล'>โหล</option>
                        <option value='เม็ด'>เม็ด</option>
                        <option value='ซอง'>ซอง</option>
                        <option value='แผ่น'>แผ่น</option>
                        <option value='กรัม'>กรัม</option>
                        <option value='ม้วน'>ม้วน</option>
                        <option value='ก้อน'>ก้อน</option>
                        <option value='ก้าน'>ก้าน</option>
                        <option value='ใบ'>ใบ</option>
                        <option value='ขวด'>ขวด</option>
                        <option value='cc'>cc</option>
                      </Input>
                    </Form.Group>
                  </Col>

                  <div className="col-md-2">
                    <div className="form-group mt-2">
                      <Input
                        type="number"
                        className="form-control"
                        name="lname"
                        required
                        onChange={(e) => setnum_subunit(e.target.value)} />
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

export default CreateItem
