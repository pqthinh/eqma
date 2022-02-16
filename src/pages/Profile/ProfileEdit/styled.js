import {
  BaseButton,
  BaseText,
  BaseIcon,
  BaseForm,
  BaseImage,
  BaseWrapper,
  BaseUploader
} from 'atoms'
import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 10px;
  display: block;
  height: calc(100vh - 180px);
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
  width: 100%;
`

export const Text = styled(BaseText)`
  color: ${props => props.theme.colors.gray[1]};
`
export const Button = styled(BaseButton)`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  svg {
    margin-left: 10px;
  }
`
export const Icon = styled(BaseIcon)``
export const Form = styled(BaseForm)`
  min-width: 300px;
`

export const AvatarImage = styled(BaseImage)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  padding: 5px;
  border: 2px solid ${props => props.theme.colors.primary};
`
export const FlexWrapper = styled.div`
  display: flex;
  div:first-child {
    margin-right: 20px;
    @media screen and (max-width: 480px) {
      margin: auto;
    }
  }
  @media screen and (max-width: 480px) {
    display: block;
  }
`
export const WrapperAvatar = styled(BaseWrapper)`
  margin: 20px auto;
  position: relative;
  text-align: center;
  width: 150px;
  height: 150px;
`
export const Uploader = styled(BaseUploader)`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextFooter = styled.p`
  position: absolute;
  bottom: 0;
  right: 0;
`
