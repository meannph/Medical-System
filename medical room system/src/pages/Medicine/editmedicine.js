import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Input } from "reactstrap";
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import CreateIcon from '@mui/icons-material/Create';



const EditItem = ({
  func,
  id,
  name_th,
  name_en,
  type,
  remark,
  status,
  num_largeUnit,
  subUnit,
  num_subUnit,
  detail,
  largeUnit
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ID, setID] = useState(id || '');
  const [Name_TH, setName_TH] = useState(name_th || '');
  const [Name_EN, setName_EN] = useState(name_en || '');
  const [Type, setType] = useState(type || '');
  const [Remark, setRemark] = useState(remark || '');
  const [Status, setStatus] = useState(status || '');
  const [Detail, setDetail] = useState(detail || '');
  const [largeunit, setlargeunit] = useState(largeUnit || '');
  const [subunit, setsubunit] = useState(subUnit || '');
  const [num_largeunit, setnum_largeunit] = useState(num_largeUnit || '');
  const [num_subunit, setnum_subunit] = useState(num_subUnit || '');
  const [updateDate] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
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
      'updateDate': updateDate
    };
    console.log(data);

    fetch("http://localhost:8090/api/medicine", {
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
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleChange = (event) => {
    setlargeunit(event.target.value);
  };
  const handleChangeNum = (event) => {
    setsubunit(event.target.value);
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
                    <h3 className="mb-5">Edit Medicine Item</h3>
                  </div>
                </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">ID: *</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="uname"
                          placeholder="ID"
                          value={ID}
                          disabled="disabled"
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
                          <label className="form-label">NameTH:</label>
                          <Input
                            type="text"
                            className="form-control"
                            name="fname"
                            placeholder="Name"
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
                            name="lname"
                            placeholder="NameEN"
                            value={Name_EN}
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
                        <label className="form-label">Detail:</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="lname"
                          placeholder="Detail"
                          value={Detail}
                          required
                          onChange={(e) => setDetail(e.target.value)}
                        />
                      </div>
                    </div>
                    <Col lg="6">
                    <Form.Group className="form-group">
                      <label>TypeItem: </label> 
                      <Input
                      className='mt-2'
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
                <label >Unit:</label>
                  <Col lg="4">
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
                        value={num_largeunit}
                        onChange={(e) => setnum_largeunit(e.target.value)}
                      />
                    </div>
                  </div>
                  <Col lg="4">
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
                        value={num_subunit}
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
                        required
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
    </>
  )
}

export default EditItem
