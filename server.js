const express = require('express')
const app = express()
const sign = require('jwt-encode')
var cors = require('cors')
const jwt = require('express-jwt')
app.use(cors())
// const secret = process.env.ENCRYPTION_KEY || 'marketplace-default'
const secret = 'l72hgMI0aDjwDD1epYaaIz7N8X9T61iDblL45lD1'

app.use(express.json({ limit: '64mb' }))
app.use(express.urlencoded({ limit: '64mb', extended: true }))

app.use(
  jwt({
    secret: secret,
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        console.log(req.headers.authorization, 'authorization')
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        console.log(req.query.token, 'req.query.token')
        return req.query.token
      }
      return null
    }
  })
)

app.get('/', (req, res) => {
  res.json({ send: 'Welcome to my app' })
})

app.get('/hello', (req, res) => {
  res.status(200).json({ data: 'Hello world' })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  if (password !== 'Thinhpq@11')
    res.status(200).json({ data: null, message: 'Sai mat khau' })

  const data = {
    iss: 'https://securetoken.google.com/wemarket-a8540',
    aud: 'wemarket-a8540',
    auth_time: 1635175478,
    iat: new Date().getTime(),
    exp: new Date().getTime() + 100000000,
    email: email,
    email_verified: false,
    firebase: {
      identities: {
        email: [email]
      },
      sign_in_provider: 'password'
    }
  }
  const jwt = sign(data, secret, { algorithm: 'HS256' })

  res.status(200).json({ data: { user: data, token: jwt }, message: null })
})

app.post('/admin', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const jwt = sign(token, secret)

  res
    .status(200)
    .json({ data: { user: data, token: jwt }, token: token, message: null })
})

app.listen(4000, () => {
  console.log('Server started on port 4000')
})
