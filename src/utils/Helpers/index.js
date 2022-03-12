import { storage, firebase } from 'config/firebaseConfig.js'
import Sizer from 'react-image-file-resizer'

const uploadImage = (bucket='/', file) => {
  const uploadPromise = new Promise((resolve, reject) => {
    var uploadTask = storage.ref().child(bucket).put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running')
            break
        }
      },
      error => {
        console.log(error)
        reject(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
  return uploadPromise
}

const makeid = length => {
  let result = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const resizeImage = (file)=> {
  if(!file) return null
  const img = new Promise((resolve) => {
    Sizer.imageFileResizer(
      file,
      1200,
      1200,
      ['BLOB', 'JPEG', 'PNG'],
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      50,
      50
    )
  })
  return img
}
export { uploadImage, makeid , resizeImage}
