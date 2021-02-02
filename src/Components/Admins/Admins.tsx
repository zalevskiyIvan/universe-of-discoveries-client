import {  Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import style from './Admins.module.css'
import { Divider } from 'antd';
import { addEventT, addTaskT, addUsefulLinkT, arrType } from '../../Reducers/addNewPostReducer';
import { useHistory } from 'react-router-dom';


const { Option } = Select;

const Admins = () => {
    const history = useHistory()
    const dispatch = useDispatch()

        /////

    const [pollItem, setPollItem] = useState([{id:1, pollText: ''}, {id:2, pollText: ''}])
    const addItem = () => {
        
        setPollItem([...pollItem, {id: itemId+1, pollText: ''}])
        setItemId(itemId + 1)
    }
    const pollFieldChange = (e:any, id: number) => {
        pollItem.forEach(element => {
            if(element.id === id) element.pollText = e.target.value
        });
    }
        ////
    const add = (v:arrType) => {
        if(localStorage.auth) {
            switch(v.choise){
                case 'events': return dispatch(addEventT(v.klass.toLowerCase(), v.header, v.body, v.img))
                case 'task': return dispatch(addTaskT(v.klass.toLowerCase(), v.header, v.body, v.img))
                case 'links': return dispatch(addUsefulLinkT(v.link, v.description))
            }
        }
        else alert('У вас нет прав')
        
    }
    const [isPoll, setIsPoll] = useState(false)
    const setPoll = () => {
        setIsPoll(true)
    }
    const [itemId, setItemId] = useState(2)

    const [postsType, setPostsType] = useState('')

    const choisePostsTypeValue = (v:any) => {
        setPostsType(v)
    }
    if(!localStorage.auth){
        return(
            <div>
                <h1>У вас нет прав</h1>
            </div>
        )
    }
    if(localStorage.auth){
        return(
            <div className={style.adder}>
                  <Form onFinish={add}>
                        <Form.Item rules={[{ required: true, message: 'Введите номер и букву класса' }]} name='klass'>
                            <Input allowClear placeholder='Введите номер и букву класса'/>
                        </Form.Item>
                        <Form.Item name='choise'>
                          <Select onChange={(e) => choisePostsTypeValue(e)} placeholder='выберите тип поста'>
                            <Option value="events">Новое мероприятие</Option>
                            <Option value="task">Новое задание</Option>
                            <Option value="links">Добавить полезную ссылку</Option>
                          </Select>
                        </Form.Item>
                        {postsType === 'links' && <>
                        <Form.Item name='link'>
                            <Input placeholder='вставьте ссылку'/>
                        </Form.Item>
                        <Form.Item name='description'>
                            <Input placeholder='введите описание ссылку'/>
                        </Form.Item>
                        </>
                        }
                        {postsType !== 'links' && <>
                        <Form.Item rules={[{ required: true, message: 'Введите текст названия' }]} name='header'>
                            <Input placeholder='Введите название поста'/>
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Введите текст поста' }]} name='body'>
                            <Input.TextArea placeholder='Введите текст поста'/>
                        </Form.Item>
                        <Form.Item name='img'>
                            <Input placeholder='Введите ссылку на картинку'/>
                        </Form.Item>
                           {!isPoll && <Button onClick={setPoll} style={{marginBottom: 18}}>Добавить опрос</Button>} 
                           {isPoll && 
                           <div style={{marginLeft: 50}}>
                            <h2 style={{color:'white'}}>Опрос:</h2>
                            <Form.Item name='pollHeader'>
                                <Input placeholder='Заголовок опроса'/>
                            </Form.Item>
                                <ul style={{textDecoration: 'none'}}>
                                    <h3 style={{color:'white'}}>Варианты ответа:</h3>
                                    {pollItem.map((i:any) => {
                                        return(
                                                <Form.Item key={i.id} name='pollBody'>
                                                    <li><Input onChange={(e) => pollFieldChange(e, i.id)}/></li>
                                                </Form.Item>
                                        ) 
                                    })}
                                </ul>
                                <Button onClick={addItem} style={{marginBottom: 18, marginLeft: 40}}>Добавить вариант ответа</Button>
                            </div>
                           }
                        </>}
                        <Form.Item>
                            <Button htmlType='submit'>Добавить пост</Button>
                        </Form.Item>
                        <Divider/>
               
                  </Form>
                
            </div>
        )
    }
   
}

export default Admins