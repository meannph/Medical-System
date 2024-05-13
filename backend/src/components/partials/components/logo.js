import React from 'react'
import img from '../../../assets/images/logo.png'
import {Image} from 'react-bootstrap'


const Logo = (props ) => {
    
    return (
        <>
          <Image className='logo' src={img} />
         </>
        )
    }
    
    export default Logo
   