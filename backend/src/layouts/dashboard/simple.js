import React, { useEffect,memo,Fragment } from 'react'


import SettingOffCanvas from '../../components/setting/SettingOffCanvas';

const Simple = memo((props) => {
    return (
        <Fragment>
            
            <SettingOffCanvas name={true}/>
        </Fragment>
    )
})

export default Simple
