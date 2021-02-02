import {Button, Form, Input, Radio} from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getTokenT } from '../../Reducers/autorizetReducer'
import style from './StartMenu.module.css'

type password = {
    password: string
}

const correctPassword = 'gost';

const Teatcher = () => {
    const history = useHistory()
    const [userPassword, setUserPassword] = useState('')
    const dispatch = useDispatch()
    const state = useSelector((state:any) => state.autorizetReducer)
    
    const setPassword = (v:password) => {
        setUserPassword(v.password)
        if(v.password === correctPassword) { 
            dispatch(getTokenT())
            history.push('/menu')
        }
    }
    return(
        <div>
            <Form  className={style.password} onFinish={setPassword} >
                <Form.Item hasFeedback={state.isAdmin? false : true}  validateStatus={state.isAdmin? '': 'error'} name='password'>
                    <Input/>
                </Form.Item>
            </Form>
        </div>
    )
}

const Student = () => {
    const history = useHistory()
    type klassType = {
        klass: string
    }
    const onFinish = (v:klassType) => {
        localStorage.klass = v.klass.toLowerCase()
        history.push('/menu')
    }
    
    return(
        <div>
            <Form onFinish={onFinish}>
                <Form.Item name='klass'>
                    <Input placeholder='введите свой класс в нижнем регистре'/>
                </Form.Item>
                <Button htmlType='submit'>продолжить</Button>
            </Form>
        </div>
    )
}

type displayerType = {
    display?:string
}
const StartScreen = () => {
    const history = useHistory()
    const location = useLocation()
    if(location.pathname === '/' && localStorage.klass || localStorage.auth){
        history.push('/menu')
    }
    const state = useSelector((state:any) => state.autorizetReducer)

    const [value, setValue] = useState(0)

    const  onValueChange = (e: any) => {
        setValue(e.target.value)
    }
    let displayStyle:displayerType = {
        display : 'none'
    }
    if(state.displayer === true) displayStyle = { display : 'none'}
    else displayStyle = {}
    return(
        <div style={displayStyle}>
            <div>
                <h1 className={style.world_ar}>Мир вокруг нас</h1>
                <p className={style.quot}>"Весь огромный мир вокруг Меня...полон неизведанных Тайн.
                    И я буду их открывать всю жизнь, потому что это самое интересное, самое увлекательное занятие в мире"</p>
            </div>
         <div className={style.radio}>
            <Radio.Group value={value} onChange={onValueChange}>
                <Radio value={1}><span className={style.radioText}>Учитель</span></Radio>
                <Radio value={2}><span className={style.radioText}>Ученик</span></Radio>
            </Radio.Group>
         </div>
         <div className={style.continue}>
            {value === 1 && <Teatcher />} 
            {value === 2 && <Student/> }
         </div>
        </div>
    )
}
export default StartScreen