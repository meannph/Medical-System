import { Row, Col, Table} from "react-bootstrap";
import Card from "../../components/Card";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import "../../App.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from "reactstrap";
import Createunit from "./createunit";
import Editunit from "./editunit";
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

const UnitTable = () => {

  const [unit, setunit] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/unit');
      if (!response.ok) {
        console.error('Error fetching user data:', response.status);
        return;
      }
      const data = await response.json();
      setunit(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [Name_TH, setName_TH] = useState('');
  const [ID, setID] = useState('');
  const [Status, setStatus] = useState('');
  const [Name_EN, setName_EN] = useState('');


  const Search = async () => {
    console.log(unit);
    const newData = await fetch('http://localhost:8090/api/unit/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: ID, Name_TH: Name_TH, Name_EN: Name_EN, Status: Status
      })
    })
      .then(response => { return response.json() })
    console.log(newData);
    setunit(newData[0])
  }
  const setInputID = (e) => {
    setID(e.target.value);
  }
  const setInputName = (e) => {
    setName_TH(e.target.value);
  }
  const setInputNameEN = (e) => {
    setName_EN(e.target.value);
  }
  const setInputStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleClear = () => {
    setID('');
    setName_TH('');
    setName_EN('');
    setStatus('');
  };

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
        fetch('http://localhost:8090/api/unit', {
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
  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title" style={{ marginTop: '10px'}}>Medicine Unit</h4>
              </div>
               <Createunit func = {fetchData}/>
            </Card.Header>
              <div className="table-responsive" style={{ marginTop: '30px' }}>
                <table class="table table-striped">
                 
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NameTH</th>
                      <th>NameEN</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead> 
                  <thead>
                    <tr>
                      <th scope="col">
                        <Paper
                          sx={{ display: 'flex', width: 160 }}>
                          <Input type="text" className="form-control" placeholder="SearchID" value = {ID} onChange={setInputID} />
                        </Paper></th>
                      <th> 
                        <Paper
                        sx={{ display: 'flex', width: 200 }}>
                        <Input type="text" className="form-control" placeholder="SearchName" value = {Name_TH} onChange={setInputName} />
                      </Paper></th>
                      <th> 
                        <Paper
                        sx={{ display: 'flex', width: 200 }}>
                        <Input type="text" className="form-control" placeholder="SearchName" value = {Name_EN} onChange={setInputNameEN} />
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
                    {unit
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(unit => (
                        <tr key={unit.ID}>
                          <td>{unit.ID}</td>
                          <td>{unit.Name_TH}</td>
                          <td>{unit.Name_EN}</td>
                          <td> <span className="status" style={makeStyle(unit.Status)}>{unit.Status}</span></td>
                          <td>
                          <Editunit
                            func={fetchData}
                            id={unit.ID}
                            name_th={unit.Name_TH}
                            name_en={unit.Name_EN}
                            remark={unit.Remark}
                            status={unit.Status}
                           />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => Delete(unit.ID)}>
                             <DeleteIcon />
                            </button>
                          </td></tr>
                      ))}</tbody>
                </table>
              </div>
              <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component='div'
              count={unit.length}
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

export default UnitTable;