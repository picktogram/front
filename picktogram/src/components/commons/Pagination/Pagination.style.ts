import styled from "@emotion/styled"

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Arrow = styled.button`
    background-color: transparent;
    border: none;

    &:hover {
        scale: calc(1.2);
    }
`
export const Numbers = styled.div`
    display: flex;
    column-gap: 1rem;
`
export const Number = styled(Arrow)<{
    isCurrent : boolean
}>`
    color: ${(props) => props.isCurrent ? 'black' : 'lightgray'};
`