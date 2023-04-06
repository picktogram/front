import React from 'react'

export default function BoardModal({
    handleMoveEdit
} : {
    handleMoveEdit : React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <ul style={{
            display : "flex",
            flexDirection : "column" ,
            width : "100%",
            minHeight : "500px",
            listStyle : "none",
            borderRadius : '20px',
            padding : "20px",
            backgroundColor : "lightgray"
        }}>
        <li><button onClick={handleMoveEdit}>수정하기</button></li>
    </ul>
  )
}
