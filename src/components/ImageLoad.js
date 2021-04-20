import React, { useState } from 'react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react'
var cloudinary = require('cloudinary-core') // If your code is for ES5
import { Cloudinary } from 'cloudinary-core'

const ImageLoad = () => {
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelecteFile] = useState('')
  const [previewImageSource, setPreviewImageSource] = useState()

  const handleImageInput = (event) => {
    event.preventDefault()
    const image = event.target.files[0]
    console.log('LOADED IMAGE: ', image)
    setSelecteFile(image)
    console.log('SELECTED FILE', selectedFile)
    previewImage(image)
  }

  const previewImage = (img) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setPreviewImageSource(reader.result)
    }
  }

  const uploadImage = () => {
    if (!selectedFile || selectedFile.size > 3000000) { window.alert('Image is need to be smaller than 3MB') }
    console.log('SELECTED FILE', selectedFile)
  }

  return (
    
    <div className="flex flex-col">
      {previewImageSource && <img src={previewImageSource} alt="chosen" className="h-32 w-32 md:h-36 md:w-36 rounded-lg" />}
      <label className="relative cursor-pointer bg-gray-500 hover:bg-gray-400 px-3 py-2 ml-20 mt-1 h-30 w-32 rounded-md
        text-xs text-white md:w-40 md:text-base md:hover:bg-red-600 focus-within:ring-offset-2 focus-within:ring-red-600">
        <span>Upload a picture</span>
        <input type="file" name="image" accept="image/*" onChange={handleImageInput} value={fileInputState} className="sr-only"
        />
      </label>
      <span className="pl-3 ">{selectedFile.name}</span>
      <button className="" type="button" onClick={uploadImage} >Submit</button>
    </div>
  )
}

export default ImageLoad