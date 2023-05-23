import React, { useCallback } from 'react';

import styled from '@emotion/styled'

interface InputProps {
    value : string;
    setValue : any;
    onClick : () => void;
    isShow? : boolean;
}

const Form = styled.form`
   width: 90%;
   margin: 0 auto;
   display: grid;
   column-gap: 1rem;
   grid-template-columns: 85% 15%;
   & input {
      border: none;
      background-color: gray;
      border-radius: 20px;
      height: 25px;
      padding: 1rem;
      color: white;
   }
`

const Input : React.FC<InputProps> = ({
    setValue,
    value,
    onClick,
    isShow = true
}) => {

    const handleClick  = useCallback(() => {
        onClick()
    }, [onClick])

    if(!isShow) {
        return null
    }

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <input type='text' onChange={(e) => setValue(e.currentTarget.value)} value={value}/>
            <button onClick={handleClick} disabled={!value} >
                등록
            </button>
        </Form>
    );
};

export default Input;