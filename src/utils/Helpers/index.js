import { storage, firebase } from 'config/firebaseConfig.js'

const uploadImage = (bucket, file) => {
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

export { uploadImage }
