import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  border: 1px solid black;
`

export const Input = styled.textarea`
    position: relative;
    padding: 2rem;
    width: 100%;
    height: 500px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
    resize: none;

    &:focus {
      border: 1px solid gray
    }
`