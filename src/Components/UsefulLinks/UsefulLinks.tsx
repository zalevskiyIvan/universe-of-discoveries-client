import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsefulLinkT, userfulLinksType } from '../../Reducers/addNewPostReducer'
import { List, Typography, Divider } from 'antd';

const UserfulLink = () => {
    const state = useSelector((state: any) => state.addPostReducer.userfulLinks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsefulLinkT())
    }, [])
    return(
        <div style={{marginLeft: 50}}>
            <h1>Полезные ссылки</h1>
                         <List
                         dataSource={state}
                         renderItem={(item:any) => (
                           <List.Item>
                             <span>{item.description}</span> : <span>{item.link}</span>
                           </List.Item>
                         )}
                       />
        </div>
    )
}
export default UserfulLink