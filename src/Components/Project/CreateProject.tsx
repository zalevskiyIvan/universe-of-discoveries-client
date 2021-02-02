import React, { useState } from 'react'
import {  Button, Form, Input, Select } from 'antd'
import { addProjectT } from '../../Reducers/addNewPostReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const CreateProject = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [img, setImg] = useState([{id:1, imgURL: ''}])
    const [itemId, setItemId] = useState(2)
    const addItem = () => {
        setImg([...img, {id: itemId+1, imgURL: ''}])
        setItemId(itemId + 1)
    }
    const pollFieldChange = (e:any, id: number) => {
        img.forEach(element => {
            if(element.id === id) element.imgURL = e.target.value
        });
    }
    const onFinish = (v:any) => {
        v.img = img
        v.date = new Date().toLocaleDateString()
        v.subject = localStorage.subject
        v.members = v.members.split(',')
        v.tasks = v.tasks.split(',')
        dispatch(addProjectT(v))
        history.push(`/${localStorage.subject}/project`)
    }
    return(
        <div>
            <Form onFinish={onFinish} style={{width:500, marginLeft:200, marginTop:50}}>
                <Form.Item rules={[{ required: true, message: 'Введите название проекта' }]} name='header'>
                    <Input placeholder='Название проекта'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите цели проекта' }]} name='purpose'>
                    <Input.TextArea placeholder='Цели проекта через запятую'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите задачи проекта' }]} name='tasks'>
                    <Input.TextArea placeholder='Задачи проекта'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите актуальность проекта' }]} name='relevance'>
                    <Input.TextArea placeholder='Актуальность проекта'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите выводы' }]} name='conclusions'>
                    <Input.TextArea placeholder='Выводы'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите результаты проекта' }]} name='results'>
                    <Input.TextArea placeholder='результаты проекта'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите краткое описание проекта' }]} name='shortDescription'>
                    <Input.TextArea placeholder='краткое описание проекта'/>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите участников проекта' }]} name='members'>
                    <Input placeholder='участники проекта через запятую'/>
                </Form.Item>
                <Button htmlType='submit'>создать проект</Button>
            </Form>
        </div>
    )
}

export default CreateProject