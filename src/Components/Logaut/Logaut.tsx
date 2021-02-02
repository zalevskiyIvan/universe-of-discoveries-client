import { Button } from 'antd'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Logaut = () => {
    const location = useLocation()
    const history = useHistory()
    console.log(location)
    if(location.pathname === '/') return null
    const logaut = () => {
        localStorage.clear()
        history.push('')
    }
    return(
            <Button onClick={logaut}>Выйти</Button>
    )
    

}
export default Logaut