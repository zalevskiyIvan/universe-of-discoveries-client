import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEventT, getTaskT, getShortProjectT, getTaskWithFilterT, getShortProjectWithFilterT,
    getEventsWithFilterT, deleteEventT,deleteProjectT, deleteTaskT } from '../../Reducers/addNewPostReducer'
import style from './PostsRender.module.css'
import { RightOutlined,LeftOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd'

type propsType = {
    type: string
}
const PostsRender:React.FC<propsType> = (props) => {
    const state = useSelector((state: any) =>{
        switch(props.type){
            case 'events': return state.addPostReducer.events
            case 'tasks': return state.addPostReducer.tasks
            case 'projects': return state.addPostReducer.shortProjects
        }
    } )
    const dispatch = useDispatch()
    const history = useHistory()
    const openProject = (id:string) => {
      if( history.location.pathname === `/${localStorage.subject}/project`){
        history.push(`/${localStorage.subject}/project/${id}`)
      }
    }

    const [page, setPage] = useState(1)

    const forward = () => {
       setPage(page+1)
    }
    const back = () => {
       if(page !== 1) setPage(page-1)
    }

    useEffect(() => {
        switch(props.type){
            case 'events': dispatch(getEventT(page)); break
            case 'tasks': dispatch(getTaskT(page)); break
            case 'projects': dispatch(getShortProjectT(page)); break
        }
    }, [page])
    //posts:
    const [addMode, setAddMode] = useState(false)
    const openAddPost = () => {
        console.log('openAddPost')
        setAddMode(true)
        const subject = localStorage.subject
        history.push(`/${subject}/create-project`)
    }
    const [filterMod, setFilterMod] = useState(false)
    const addFilter = (e:any) => {
        console.log('addFilter')
        if(e.target.value){
        switch(props.type){
            case 'tasks': dispatch(getTaskWithFilterT(e.target.value)); break
            case 'events': dispatch(getEventsWithFilterT(e.target.value)); break
            case 'projects': dispatch(getShortProjectWithFilterT(e.target.value)); break
        }
        setFilterMod(true)
    }
    else switch(props.type){
        case 'events': dispatch(getEventT(page)); break
        case 'tasks': dispatch(getTaskT(page)); break
        case 'projects': dispatch(getShortProjectT(page)); break
    }
    setFilterMod(false)
}
    const deleteElement = (id:string) => {
        console.log('deleteElement')
        switch(props.type){
            case 'events': dispatch(deleteEventT(id)); break
            case 'tasks': dispatch(deleteTaskT(id)); break
            case 'projects': dispatch(deleteProjectT(id)); break
        }
    }
    return(
        <div>
             {props.type === 'projects' && <Button className={style.createProject} onClick={openAddPost}>Создать проект</Button>} 
            <Input className={style.filter}  onChange={(e) => addFilter(e)} suffix={<SearchOutlined />} placeholder='искать'/>
            <div className={style.pagination}>
              {page !== 1 && !filterMod && <LeftOutlined onClick={back} className={style.leftButton} style={{color:'white', fontSize:30}}/> }  
              {state.length === 4 && !filterMod && <RightOutlined onClick={forward} className={style.rightButton} style={{color:'white', fontSize:30}}/>} 
            </div>
            {state.map((item:any) => {
                return(
                    <div className={style.eventContainer} key={item._id}>
                       <div>
                           <h2 style={{color:'black', marginLeft: 40}}>{item.date}</h2>
                          {localStorage.auth && <DeleteOutlined className={style.delete} onClick={() => deleteElement(item._id)}/>} 
                       </div>
                       <div onClick={() => openProject(item._id)} className={style.headerContainer}>
                            <p className={style.header}>{item.header}</p>
                       </div>
                            {item.img && <img src={item.img}/>}
                       <div>
                           {props.type === 'projects'? <p className={style.body}>{item.shortDescription}</p>: <p className={style.body}>{item.body}</p>}
                       </div>
                    </div>
                )
            })}
            {state.length === 4 && 
             <div className={style.pagination}>
                <LeftOutlined onClick={back} className={style.leftButton} style={{color:'white', fontSize:30}}/>
                <RightOutlined onClick={forward} className={style.rightButton} style={{color:'white', fontSize:30}}/>
            </div>
            }
           
        </div>
    )
}
export default PostsRender