import { Row, Col, Table} from "react-bootstrap";
import Card from "../../components/Card";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Input } from "reactstrap";
import "../../App.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CreateMasterStock from "./createmasterstock";
import EditMasterStock from "./editmasterstock";
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

const MasterStockTable = () => {

  const [masterstock, setmasterstock] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/masterstock');
      if (!response.ok) {
        console.error('Error fetching user data:', response.status);
        return;
      }
      const data = await response.json();
      setmasterstock(data);
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

  const Search = async () => {
    console.log(masterstock);
    const newData = await fetch('http://localhost:8090/api/masterstock/post', {
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
    setmasterstock(newData[0])
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
        fetch('http://localhost:8090/api/masterstock', {
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
                <h4 className="card-title"style={{ marginTop: '10px'}}>เหตุผลปรับ Stock</h4>
              </div>
                 <CreateMasterStock func = {fetchData}/>
            </Card.Header>
              <div className="table-responsive"style={{ marginTop: '30px' }}>
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
                          <input type="text" className="form-control" placeholder="SearchID" value={ID} onChange={setInputID} />
                        </Paper></th>
                      <th> <Paper
                        // component="form"
                        sx={{ display: 'flex', width: 200 }}>
                        <input type="text" className="form-control" placeholder="SearchName" value={Name_TH} onChange={setInputName} />
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
                          <option value="โอน Stock">โอน Stock</option>
                          <option value="เพิ่ม Stock">เพิ่ม Stock</option>
                          <option value="ลด Stock">ลด Stock</option>
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
                          required
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
                    {masterstock
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(masterstock => (
                        <tr key={masterstock.ID}>
                          <td>{masterstock.ID}</td>
                          <td>{masterstock.Name_TH}</td>
                          <td>{masterstock.Type}</td>
                          <td> <span className="status" style={makeStyle(masterstock.Status)}>{masterstock.Status}</span></td>
                          <td>
                            <EditMasterStock  
                            func={fetchData}
                            id={masterstock.ID}
                            name_th={masterstock.Name_TH}
                            name_en={masterstock.Name_TH}
                            type={masterstock.Type}
                            remark={masterstock.Remark}
                            status={masterstock.Status}
                           />
                           <button type="button" className="btn btn-danger btn-sm" onClick={() => Delete(masterstock.ID)}>
                             <DeleteIcon />
                            </button>
                          </td></tr>
                      ))}</tbody>
                </table>
              </div>
              <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={masterstock.length}
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

export default MasterStockTable;