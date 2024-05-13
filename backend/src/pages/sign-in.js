// import React, { useEffect, useState } from 'react'
// import { Button} from 'react-bootstrap'
// import { Input} from "reactstrap";

// import { useNavigate } from 'react-router-dom'
// // import { useHistory } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import {
//    MDBContainer,
//    MDBRow,
//    MDBCol,
//    MDBCard,
//    MDBCardBody,
//    MDBInput,
//    MDBCheckbox
//  }
//  from 'mdb-react-ui-kit';
// import { Label } from 'reactstrap';

// const SignIn = () => {
//    const [ID, setID] = useState("")
//    const [Password, setPassword] = useState("")
//    const navigate = useNavigate();
//    const [loading, setLoading] = useState(false);

//    //  const history = useHistory();

//    useEffect(() => {
//       if (localStorage.getItem('user-info') ) {
//          navigate('/user');
//       }
//    }, [])
  

//    const handleLogin = async e => {
//       e.preventDefault();

//       try {
//           setLoading(true);
  
//           // Send a POST request to the server's login API endpoint
//           const response = await fetch('http://localhost:8090/api/login', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ ID, Password }),
//           });
  
//           // Parse the response JSON
//           const data = await response.json();
  
//           if (response.ok) {
//             // Successful login
//             Swal.fire({
//                 icon: 'success',
//                 title: 'LogIn Successfully',
//                 showConfirmButton: false,
//                 timer: 1500,
//             });
        
//             // Store user information in local storage
//             localStorage.setItem("user-info", JSON.stringify(data));
//             localStorage.setItem("access_token", data.access_token);
        
//             // Redirect to the '/user' page
//             navigate('/user');
//         } else if (response.status === 401) {
//             // Unauthorized access
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Invalid username or password',
//                 showConfirmButton: true,
//             });
//         } else {
//             // Handle other error statuses
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: data.message || 'Something went wrong!',
//                 showConfirmButton: true,
//             });
//         }
        
//       } catch (error) {
//           // Handle errors, such as network issues or server errors
//           console.error('Error during login:', error);
//           Swal.fire({
//               icon: 'error',
//               title: 'Error!',
//               text: 'Network error or server issue.',
//               showConfirmButton: true,
//           });
//       } finally {
//           // Reset the loading state
//           setLoading(false);
//       }
//   };
  
    
//   return (
//    <MDBContainer fluid>

//      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
//        <MDBCol col='12'>

//          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
//            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

//              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
//              <p className="text-white-50 mb-3">Please enter your login and password!</p>
             
//              <Label>Username</Label>
//              <Input  type='text'  onChange={e => setID(e.target.value)}/>
//              <Label>Password</Label>
//              <Input  type='password'  onChange={(e) => setPassword(e.target.value)}/>

//              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

//              <Button size='lg' onClick = {handleLogin}>
//                Login
//              </Button>

//            </MDBCardBody>
//          </MDBCard>

//        </MDBCol>
//      </MDBRow>

//    </MDBContainer>
//  );
// }

// export default SignIn
