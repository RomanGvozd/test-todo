import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks'

import TextField from '@mui/material/TextField'

import styled from 'styled-components'

import { deleteTodo, updateTodo } from '../../common/store/todos/actions'

const Delete = styled.button`
    width: 70px;
    height: 100%;
    padding: 0 10px;
    background-color: red;
    color: #fff;
    transition: 0.3s;
    transform: translateX(100%);
    border: none;
    font-size: 18px;
    cursor: pointer;
`
const Save = styled.button`
    width: 70px;
    height: 100%;
    padding: 0 10px;
    background-color: green;
    color: #fff;
    border: none;
    font-size: 18px;
    cursor: pointer;
`
const Wrapper = styled.section`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #e4e4e4;
    cursor: pointer;
    overflow: hidden;

    &:hover ${Delete} {
        transform: translateX(0%);
    }
`
const Text = styled.p`
    font-size: 20px;
    margin-left: 10px;

`

const TextCompleted = styled.p`
    font-size: 20px;
    margin-left: 10px;
    text-decoration: line-through;
    opacity: 0.5;

`

const TodoItem: React.FC<{todo: any}> = ({todo}) => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((store: any) => store.todos.loading)

    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(todo.title)

    const handleDelete = (e: any): void => {
        e.stopPropagation()
        dispatch(deleteTodo(todo._id))
    }

    const handlSave = (): void => {
        dispatch(updateTodo({...todo, title:inputValue}))
        if(!loading){
            setShowEdit(false)
        }
    }

    let clicks: number = 0
    let timeout: any = null

    const handleUpdate = (): void => {
        clicks++

        if (clicks == 1) {
            timeout = setTimeout(function () {
                clicks = 0
                if (!showEdit) {
                    dispatch(updateTodo({...todo, completed:!todo.completed}))  
                }
            }, 250)
        } else {
            clearTimeout(timeout)
            setShowEdit(!showEdit)
            clicks = 0
        }
    }

    return (
        <Wrapper 
            onClick={handleUpdate}
        >
            {showEdit
                ?<TextField 
                    sx={{width: "80%"}}
                    label="Edit todo" 
                    variant="filled"
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                    autoFocus
                />
                :<>{todo.completed
                    ?<TextCompleted>
                        {todo.title}
                    </TextCompleted>
                    :<Text>
                        {todo.title}
                    </Text>
                }</>
            }

            {showEdit
                ?<Save onClick={handlSave}>
                    Save
                </Save>
                :<Delete 
                    type ="button" 
                    onClick={handleDelete}
                >
                    Delete
                </Delete>
            }

        </Wrapper>
    )
}

export default TodoItem