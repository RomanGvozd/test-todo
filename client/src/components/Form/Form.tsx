import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import styled from 'styled-components'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { addTodo } from '../../common/store/todos/actions';

const Wrapper = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const Form: React.FC = () => {

    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')

    const handleAdd = (): void => {
        dispatch(addTodo(inputValue))
    }

    return (
        <Wrapper>
            <TextField 
                sx={{width: '78%'}} 
                label="Add your new todo" 
                variant="outlined"
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
            />
            <Button 
                sx={{width: '20%', fontSize: 25}} 
                variant="contained"
                onClick={handleAdd}
            >
                +
            </Button>
        </Wrapper>
    )
}

export default Form