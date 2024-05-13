import { Row, Col, Table } from "react-bootstrap";
import Card from "../../components/Card";
import SearchIcon from '@mui/icons-material/Search';
import "../../App.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from "reactstrap";
import IconButton from '@mui/material/IconButton';
import CreateItem from "./createmedicine";
import EditItem from "./editmedicine";
import DeleteIcon from '@mui/icons-material/Delete';


const makeStyle = (status) => {
  if (status === 'Active') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'Inactive') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

const ItemTable = () => {

  const [medicine, setmedicine] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/medicine');
      if (!response.ok) {
        console.error('Error fetching user data:', response.status);
        return;
      }
      const data = await response.json();
      setmedicine(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [Name_TH, setName_TH] = useState('');
  const [ID, setID] = useState('');
  const [Type, setType] = useState('');
  const [Status, setStatus] = useState('');
  // const[Detail,setDetail] = useState('')

  const Search = async () => {
    console.log(medicine);
    const newData = await fetch('http://localhost:8090/api/medicine/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: ID, Name_TH: Name_TH, Type: Type, Status: Status
      })
    })
      .then(response => { return response.json() })
    console.log(newData);
    setmedicine(newData[0])
  }
  const setInputID = (e) => {
    setID(e.target.value);
  }
  const setInputName = (e) => {
    setName_TH(e.target.value);
  }
  const setInputType = (e) => {
    setType(e.target.value);
  }
  const setInputStatus = (e) => {
    setStatus(e.target.value);
  }
  const Delete = ID => {
    Swal.fire({
      icon: 'warning',
      title: 'Delete',
      text: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: 'delete',
      cancelButtonText: 'cancel',
      confirmButtonColor: '#e60000',
    }).then(result => {
      if (result.value) {
        fetch('http://localhost:8090/api/medicine', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ID
          })
        }).then(res => res.json())
          .then(
            ((res) => {
              fetchData();
            })
          )
      }
    });
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClear = () => {
    setID('');
    setName_TH('');
    setType('');
    setStatus('');
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title" style={{ marginTop: '10px'}}>Medicine Item</h4>
              </div>
              <CreateItem func={fetchData} />
            </Card.Header>
              <div className="table-responsive" style={{ marginTop: '30px' }}>
                <table class="table table-striped">
                 
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col">
                        <Paper
                          sx={{ display: 'flex', width: 160 }}>
                          <Input type="text" className="form-control" placeholder="SearchID" value={ID} onChange={setInputID} />
                        </Paper></th>
                      <th> <Paper
                        sx={{ display: 'flex', width: 200 }}>
                        <Input type="text" className="form-control" placeholder="SearchName" value={Name_TH} onChange={setInputName} />
                      </Paper></th>
                      <th><Paper
                        component="form"
                        sx={{ display: 'flex', width: 140 }}>
                        <select
                          className="form-control"
                          id="exampleSelect"
                          value={Type}
                          onChange={setInputType}
                          required
                        >
                          <option value="">All</option>
                          <option value="ยารับประทาน">ยารับประทาน</option>
                          <option value="ยาภายนอก" >ยาภายนอก</option>
                          <option value="วัสดุทางการแพทย์">วัสดุทางการแพทย์</option>
                        </select>
                      </Paper></th>
                      <th><Paper
                        component="form"
                        sx={{ display: 'flex', width: 140 }}>
                        <select
                          className="form-control"
                          id="exampleSelect"
                          value={Status}
                          onChange={setInputStatus}
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </Paper></th>
                      <th>
                        <IconButton
                          onClick={Search}><SearchIcon style={{ fontSize: 23 }} /> 
                        </IconButton>{''}
                        <IconButton color="error" onClick={handleClear}>
                          <ClearIcon />
                        </IconButton></th>
                    </tr>
                  </thead>
                  <tbody >
                    {medicine
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(medicine => (
                        <tr key={medicine.ID}>
                          <td>{medicine.ID}</td>
                          <td>{medicine.Name_TH}</td>
                          <td>{medicine.Type}</td>
                          <td> <span className="status" style={makeStyle(medicine.Status)}>{medicine.Status}</span></td>
                          <td>
                          <EditItem
                            func={fetchData}
                            id={medicine.ID}
                            name_th={medicine.Name_TH}
                            name_en={medicine.Name_EN}
                            detail={medicine.Detail}
                            type={medicine.Type}
                            largeUnit = {medicine.largeunit}
                            subUnit = {medicine.subunit}
                            num_subUnit = {medicine.num_subunit}
                            num_largeUnit = {medicine.num_largeunit}
                            remark={medicine.Remark}
                            status={medicine.Status}
                           />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => Delete(medicine.ID)}>
                             <DeleteIcon />
                            </button>
                          </td></tr>
                      ))}</tbody>
                </table>
              </div>
              <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={medicine.length}
              component='div'
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ItemTable;