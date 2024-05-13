import { Row, Col } from 'react-bootstrap'
import Card from "../../components/Card";
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Input } from "reactstrap";
import "../../App.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TablePagination } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditUser from './edituser';
import Createuser from './createuser';
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

const UserTable = () => {

  const [users, setUsers] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/user');
      if (!response.ok) {
        console.error('Error fetching user data:', response.status);
        return;
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const [SName_TH, setSName_TH] = useState('');
  const [SID, setSID] = useState('');
  const [SUserType, setSUserType] = useState('');
  const [SStatus, setSStatus] = useState('');
  const [SLocationShrimp, setSLocationShrimp] = useState('');
  const [SLocationFish, setSLocationFish] = useState('');

  const setInputSID = (e) => {
    setSID(e.target.value);
  }

  const setInputSName = (e) => {
    setSName_TH(e.target.value);
  }

  const setInputSUserType = (e) => {
    setSUserType(e.target.value);
  }

  const setInputSStatus = (e) => {
    setSStatus(e.target.value);
  }

  const setInputSLocal = (e) => {
    const selectedValue = e.target.value;
    setSLocationFish(selectedValue);
    setSLocationShrimp(selectedValue);
  };

  const handleClear = () => {
    setSID('');
    setSName_TH('');
    setSUserType('');
    setSStatus('');
    setSLocationShrimp('');
    setSLocationFish('');
  };

  const Search = async () => {
    console.log(users);
    const Data = await fetch('http://localhost:8090/api/user/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: SID, Name_TH: SName_TH, UserType: SUserType, LocationShrimp: SLocationShrimp, LocationFish: SLocationFish, Status: SStatus
      })
    })
      .then(response => { return response.json() })
    console.log(Data);
    setUsers(Data[0])
  }

  const UserDelete = ID => {
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
        fetch('http://localhost:8090/api/user', {
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
              fetchData()
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
  };

 
  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title" style={{ marginTop: '10px'}}>User Account</h4>
              </div>
              <Createuser func={fetchData} />
            </ Card.Header>
           
              <div className="table-responsive" style={{ marginTop: '30px' }}>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>UserType</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th scope="col">
                        <Paper
                          sx={{ display: 'flex', width: 160 }}>
                          <Input type="text" className="form-control" placeholder="SearchID" value={SID} onChange={setInputSID} />
                        </Paper></th>
                      <th> <Paper
                        sx={{ display: 'flex', width: 200 }}>
                        <Input type="text" className="form-control" placeholder="SearchName" value={SName_TH} onChange={setInputSName} />
                      </Paper></th>
                      <th> <Paper
                        component="form"
                        sx={{ display: 'flex', width: 140 }}>
                        <select
                          className="form-control"
                          id="exampleSelect"
                          onChange={setInputSLocal}
                          value={SLocationFish}
                        >
                          <option value="">All</option>
                          <option value="โรงกุ้ง">โรงกุ้ง</option>
                          <option value="โรงปลา">โรงปลา</option>
                        </select>
                      </Paper></th>
                      <th><Paper
                        // component="form"
                        sx={{ display: 'flex', width: 160 }}>
                        <select
                          className="form-control"
                          id="exampleSelect"
                          value={SUserType}
                          onChange={setInputSUserType}
                        >
                          <option value="">All</option>
                          <option value="พยาบาล">พยาบาล</option>
                          <option value="เจ้าหน้าที่ จป.">เจ้าหน้าที่ จป.</option>
                          <option value="HR-Benefit">HR-Benefit</option>
                          <option value="หัวหน้างาน">หัวหน้างาน</option>
                          <option value="System Admin">System Admin</option>
                        </select>
                      </Paper></th>
                      <th><Paper
                        component="form"
                        sx={{ display: 'flex', width: 140 }}>
                        <select
                          className="form-control"
                          id="exampleSelect"
                          value={SStatus}
                          onChange={setInputSStatus}
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>

                      </Paper></th>
                      <th>
                        <IconButton
                          onClick={Search}><SearchIcon style={{ fontSize: 23 }} />
                        </IconButton>
                        <IconButton color="error" onClick={handleClear}>
                          <ClearIcon />
                        </IconButton></th>
                    </tr>
                  </thead>
                  <tbody >
                    {users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                        <tr key={user.ID}>
                          <td>{user.ID}</td>
                          <td>{user.Name_TH}</td>
                          <td><LocationOnIcon /> {user.LocationShrimp} {user.LocationFish}</td>
                          <td><Person2Icon /> {user.UserType}</td>
                          <td><span className="status" style={makeStyle(user.Status)}>{user.Status}</span></td>
                          <td>
                            <EditUser
                              func={fetchData}
                              id={user.ID}
                              password={user.Password}
                              name_th={user.Name_TH}
                              name_en={user.Name_EN}
                              userType={user.UserType}
                              locationShrimp={user.LocationShrimp}
                              locationFish={user.LocationFish}
                              remark={user.Remark}
                              status={user.Status}
                            />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => UserDelete(user.ID)}>
                             <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))}</tbody>
                      
                </table>
              </div>
              <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component='div'
              count={users.length}
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

export default UserTable;
