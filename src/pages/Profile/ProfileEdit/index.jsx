import { withBoolean, withEmpty } from 'exp-value'
import { useUser } from 'hooks'
import { InputGroup } from 'molecules'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AvatarImage,
  Button,
  FlexWrapper,
  Form,
  Icon,
  Text,
  Uploader,
  Wrapper,
  WrapperAvatar,
  TextFooter
} from './styled'
import { useRequestManager, useAlert } from 'hooks'
import { profileModel } from './validation'
import { EndPoint } from 'config/api'

const ProfileEdit = ({ ...others }) => {
  const { user } = useUser()
  const [data, setData] = useState({
    avatar: '',
    lastName: '',
    fullName: '',
    firstName: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    last_sign_in_at: ''
  })
  const { onPostExecute } = useRequestManager()
  const { showSuccess } = useAlert()

  const [file, setFile] = useState(null)

  const _renderAvatar = useCallback(() => {
    if (!file) return <AvatarImage source={data.avatar} />
    return <AvatarImage source={URL.createObjectURL(file)} />
  }, [file, data.avatar])

  const onChangeData = useCallback(
    (field, value) => {
      setData(prev => ({ ...prev, [field]: value }))
    },
    [data]
  )
  const onSubmit = useCallback(() => {
    const input = {
      attribute: {
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        gender: data.gender,
        email: data.email,
        phone: data.phone
      }
    }
    if (file) ({ ...input, file: file })
    console.log(input)
    async function execute(data) {
      const result = await onPostExecute(EndPoint.CHANGE_PASSWORD, data)
      console.log(result, 'UPDATE_PROFILE')
      if (result) {
        showSuccess('Cập nhật thông tin thành công')
      }
    }
    execute(input)
  }, [data, file])

  useEffect(() => {
    const admin = JSON.parse(JSON.stringify(user))
    console.log(user, 'user')
    setData({
      avatar: withEmpty('avatar_url', admin),
      lastName: withEmpty('last_name', admin),
      fullName: withEmpty('full_name', admin),
      firstName: withEmpty('first_name', admin),
      address: withEmpty('address', admin),
      phone: withEmpty('phone', admin),
      email: withEmpty('email', admin),
      gender: withEmpty('gender', admin),
      last_sign_in_at:
        withEmpty('last_sign_in_at', admin) || new Date().toISOString()
    })
  }, [user])

  return (
    <Wrapper {...others}>
      <Text bold blue>
        {withEmpty('fullName', data)}
      </Text>
      <Form model={profileModel} fluid formValue={data} onSubmit={onSubmit}>
        <WrapperAvatar>
          {_renderAvatar()}
          <Uploader
            listType='picture'
            onChange={e => setFile(e[e.length - 1].blobFile)}
            autoUpload={false}
            fileListVisible={false}
            multiple={false}
            draggable={true}
          >
            <Icon name='feather-camera' size={10} strokeWidth={1} />
          </Uploader>
        </WrapperAvatar>

        <FlexWrapper>
          <InputGroup
            value={withEmpty('firstName', data)}
            label={'Tên'}
            placeholder={'Tên'}
            name={'firstName'}
            leftIcon={<Icon name={'feather-user'} />}
            onChange={value => onChangeData('firstName', value)}
          />
          <InputGroup
            value={withEmpty('lastName', data)}
            label={'Họ'}
            placeholder={'Họ và tên đệm'}
            name={'lastName'}
            leftIcon={<Icon name={'feather-user'} />}
            onChange={value => onChangeData('lastName', value)}
          />
        </FlexWrapper>

        <InputGroup
          value={withEmpty('email', data)}
          label={'Email'}
          placeholder={'Email'}
          name={'email'}
          leftIcon={<Icon name={'feather-mail'} />}
          disabled={withBoolean('email', data)}
          onChange={value => onChangeData('email', value)}
        />
        <InputGroup
          value={withEmpty('phone', data)}
          label={'Số điện thoại'}
          placeholder={'Sđt'}
          name={'phone'}
          leftIcon={<Icon name={'feather-phone'} />}
          disabled={withBoolean('phone', data)}
          onChange={value => onChangeData('phone', value)}
        />
        <InputGroup
          value={withEmpty('gender', data)}
          label={'Giới tính'}
          placeholder={'Giới tính'}
          leftIcon={<Icon name={''} />}
          name={'gender'}
          onChange={value => onChangeData('gender', value)}
        />

        <InputGroup
          value={withEmpty('address', data)}
          label={'Điạ chỉ'}
          placeholder={'Địa chỉ'}
          name={'address'}
          leftIcon={<Icon name={'feather-map-pin'} />}
          onChange={value => onChangeData('address', value)}
        />

        <Button type={'submit'}>
          Cập nhật
          <Icon name='feather-refresh-cw' />
        </Button>

        <TextFooter>
          Đăng nhập lần cuối lúc:{' '}
          {withEmpty('last_sign_in_at', data).toDateTime() || 'Không xác định'}
        </TextFooter>
      </Form>
    </Wrapper>
  )
}

export default React.memo(ProfileEdit)
