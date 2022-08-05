import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import styled from 'styled-components'

import Form from '../Form/Form'
import TodoItem from '../TodoItem/TodoItem'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { getTodo, deleteTodoAll } from '../../common/store/todos/actions'

const List = styled.section`
    width: 400px;
    height: auto;
    padding: 30px 20px;
    border-radius: 7px;
    background-color: white;
`

const Title = styled.h1`
    font-size: 30px;
`

const Footer = styled.footer`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`

const Loading = styled.div`
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    font-size: 20px;
`

const TodoList: React.FC = () => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector((store: any) => store.todos.todos)
    const loading = useAppSelector((store: any) => store.todos.loading)

    const fetchData = (): void => {
        dispatch(getTodo())
    }
    
    useEffect(() => {
        fetchData()
    },[])

    const handleDeleteAll = (): void => {
        dispatch(deleteTodoAll())
    }

    return (
        <List>
            <Title>
                Todo App
            </Title>
            <Form />
            {loading
                ? <Loading><CircularProgress /></Loading>
                : <>{todos.map((todo: any)=>(
                    <TodoItem key={todo.id} todo={todo}/>
                ))}</>
            }
            <Footer>
                <Text>
                    You have {todos.length} pending tasks
                </Text>
                <Button 
                    variant="contained" 
                    onClick={handleDeleteAll}
                >
                    Clear All
                </Button>
            </Footer>
        </List>
    )
}

export default TodoList
