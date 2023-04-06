import React from 'react'
import styled from '@emotion/styled'

export default function NewCommentsModal({
    handleNewComments
} : {
    handleNewComments : any;
}) {
  return (
    <Container onClick={handleNewComments}>새로운 댓글이 있어용</Container>
  )
}


const Container = styled.div`
    margin: 0 auto;
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: white;
    border: 1px solid black;
    margin-bottom: 20px;
    border-radius : 20px;
    color : black;
`