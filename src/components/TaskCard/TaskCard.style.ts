import styled from 'styled-components'

interface IDivCard {
  disabled: boolean
}

export const DivButtons = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 25px;
`

export const LastColumnButton = styled.div`
  padding-left: 0px;
`

export const ButtonFullWidth = styled.div`
  width: 100%;
`

export const DivCard = styled.div<IDivCard>`
  opacity: ${props => props.disabled ? '0.5' : '1'}
`
