import React from 'react'
import styled from 'styled-components'

import TodoList from './components/TodoList/TodoList'

import './App.css'

const Background = styled.main`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0;
`

function App() {
  return (
    <Background>
      <TodoList />
    </Background>
  )
}

export default App
