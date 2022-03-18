import { EndPoint } from 'config/api'
import { withBoolean, withEmpty } from 'exp-value'
import { useAlert, useRequestManager, useToken, useUser } from 'hooks'
import jwtDecode from 'jwt-decode'
import { InputGroup } from 'molecules'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AvatarImage,
  Button,
  FlexWrapper,
  Form,
  Icon,
  Text,
  TextFooter,
  Uploader,
  Wrapper,
  WrapperAvatar
} from './styled'
import { profileModel } from './validation'

const ProfileEdit = ({ ...others }) => {
  const { user } = useUser()
  const { token } = useToken()
  const [data, setData] = useState({
    role: withEmpty('role', user),
    avatar: '',
    name: '',
    address: '',
    phone_number: '',
    email: '',
    gender: '',
    department_id: '',
    is_manager: ''
  })
  const { onPostExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const [file, setFile] = useState(null)
  const [lastLogin, setLastLogin] = useState()

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
        name: data.name,
        address: data.address,
        gender: data.gender,
        email: data.email,
        phone_number: data.phone_number,
        avatar: data.avatar
      }
    }
    if (file) ({ ...input, file: file })
    async function execute(data) {
      const result = await onPostExecute(
        data.role.toLowerCase() == 'admin' ? EndPoint.update_admin : EndPoint.update_admin,
        data
      )
      if (result) {
        showSuccess('Cập nhật thông tin thành công')
      }
    }
    execute(input)
  }, [data, file])

  useEffect(() => {
    const admin = JSON.parse(JSON.stringify(user))
    const lg = jwtDecode(token)
    setLastLogin(new Date(lg?.iat * 1000).toLocaleDateString())
    setData({
      role: withEmpty('role', user),
      avatar: withEmpty('avatar_url', admin),
      name: withEmpty('name', admin) || withEmpty('user_name', admin),
      address: withEmpty('address', admin),
      phone_number: withEmpty('phone_number', admin),
      email: withEmpty('email', admin),
      gender: withEmpty('gender', admin),
      department_id: withEmpty('department_id', admin),
      is_manager: withEmpty('is_manager', admin)
    })
  }, [user])

  return (
    <Wrapper {...others}>
      <Text bold blue style={{ position: 'absolute', top: 10, left: 10 }}>
        {(withEmpty('name', data) || withEmpty('user_name', data)) +" ___ "+
          withEmpty('email', data)}
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
            value={withEmpty('name', data)}
            label={'Họ tên'}
            placeholder={'Họ tên'}
            name={'name'}
            leftIcon={<Icon name={'feather-user'} />}
            onChange={value => onChangeData('name', value)}
          />
          <InputGroup
            value={withEmpty('gender', data)}
            label={'GT'}
            placeholder={'Giớ tính'}
            name={'gender'}
            leftIcon={<Icon name={'feather-type'} />}
            onChange={value => onChangeData('gender', value)}
          />
        </FlexWrapper>

        {data.role != 'Admin' ? (
          <FlexWrapper>
            <InputGroup
              value={withEmpty('department_id', data)}
              label={'Phòng'}
              placeholder={'Phòng'}
              name={'department_id'}
              leftIcon={<Icon name={'feather-box'} />}
              onChange={value => onChangeData('department_id', value)}
            />
            <InputGroup
              value={withEmpty('is_manager', data)}
              label={'QL'}
              placeholder={'QL'}
              name={'is_manager'}
              leftIcon={<Icon name={'feather-type'} />}
              onChange={value => onChangeData('is_manager', value)}
            />
          </FlexWrapper>
        ) : null}

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
          value={withEmpty('phone_number', data)}
          label={'Số điện thoại'}
          placeholder={'Sđt'}
          name={'phone_number'}
          leftIcon={<Icon name={'feather-phone'} />}
          disabled={withBoolean('phone_number', data)}
          onChange={value => onChangeData('phone_number', value)}
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
      </Form>
      <TextFooter>
        Đăng nhập lần cuối lúc:{' '}
        {lastLogin ? lastLogin.toString() : 'Không xác định'}
      </TextFooter>
    </Wrapper>
  )
}

export default React.memo(ProfileEdit)
