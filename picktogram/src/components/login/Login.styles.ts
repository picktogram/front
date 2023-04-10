import styled from '@emotion/styled'

export const LoginPageContainer = styled.div`
    width: 1400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
`

export const LoginWrapper = styled.div`
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 27px 43px 43px -26px rgba(89,89,89,0.39);
`

export const About = styled.div`
    width: 700px;
    height: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    row-gap: 1rem;
    color : white;
    background-image:
    radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
`

export const Form = styled.form`
    width: 700px;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;

    & button {
        width: 280px;
        height: 50px;
        margin-bottom: 16px;
        background-color: #166caa;
        color : white;
        border: none;
        border-radius: 20px;
        font-size: 16px;
        cursor: pointer;
    }
`

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1rem;
`

export const Email = styled.input`
    width: 300px;
    height: 2rem;
    padding: 1rem;
    border: none;
    border-bottom: 1.5px solid black;
`

export const Password = styled(Email)``

export const LoginMenu = styled.div`
    display: flex;
    column-gap: 1rem;
`
