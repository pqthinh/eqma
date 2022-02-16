import { BaseImage, BaseText, BaseWrapper } from 'atoms'
import styled from 'styled-components'
export const Wrapper = styled(BaseWrapper)`
  flex: 1;
  align-items: center;
  display: flex;
  padding-vertical: 15px;
  width: 100%;
`

export const Title = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
export const SubTitle = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
  font-size: 16px;
  font-weight: bold;
  padding: 10px 0;
  text-align: center;
`

export const LogoWrapper = styled(BaseWrapper)`
  img {
    height: 100px;
    margin: 0 auto;
  }
`
export const TitleWrapper = styled(BaseWrapper)``
export const Image = styled(BaseImage)``
export const SubTitleWrapper = styled(BaseWrapper)`
  margin: 10px;
  width: 100%;
`
