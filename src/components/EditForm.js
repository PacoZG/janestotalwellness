import React, { useState, useEffect } from 'react'
import localdb from '../utils/localdb'
import { updateUser } from '../reducers/userReducer'
import imageService from '../services/images'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import Modal from './Modal'

const EditForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users)
  //console.log('USER_EDIT_INFO: ', user)
  const loogedUser = localdb.loadUser()

  const [dropdown, setDropdown] = useState(false)
  const visibleDrop = { display: dropdown ? '' : 'none' }

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [title, setTitle] = useState('')

  const [imageMessage, setImageMessage] = useState(null)
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelecteFile] = useState('')
  const [imagePreview, setImagePreview] = useState()

  // data to change
  const healthInfo = useField('text')

  const address = useField('text')
  const mobileNumber = useField('text')
  const city = useField('text')
  const zipCode = useField('text')
  const [country, setCountry] = useState(null)

  const handleImageInput = (event) => {
    event.preventDefault()
    const image = event.target.files[0]
    if (image.size > 3000000) {
      setImageMessage('Image is larger than 3MB')
    } else {
      setImageMessage('PNG, JPG, JPEG up to 3MB')
    }
    setSelecteFile(image)
    previewImage(image)
  }

  const previewImage = (img) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
  }

  const handleCountry = (country) => {
    setCountry(country)
    setDropdown(!dropdown)
  }

  const editProfile = async (event) => {
    event.preventDefault()
    let image
    let updatedUser = {
      ...user
    }
    console.log('USER TO UPDATE: ', updatedUser)
    if (imagePreview && selectedFile.size < 3000000) {
      const data = new FormData()
      data.append('image', selectedFile)
      try {
        image = await imageService.postImage(data)
      } catch (error) {
        console.log('ERROR: ', error.response.data)
      }
      updatedUser = {
        ...updatedUser,
        imageURL: image.url,
        imageID: image.cloudinaryId
      }
      localdb.saveUser({ ...loogedUser, imageURL: image.url, imageID: image.cloudinaryId })
      if (user.imageID) {
        imageService.removeImage(user.imageID)
      }
      updateSignedInUser(updatedUser)
      setModalMessage('Your profile photo has been successfully updated, please refresh your webpage.')
      setTitle('Sucess')
      setShowModal(true)
    }
    if (healthInfo.params.value.length > 29 && healthInfo.params.value.length != 0) {
      updatedUser = {
        ...updatedUser,
        healthInfo: healthInfo.params.value
      }
      updateSignedInUser(updatedUser)
      setModalMessage('Your health information has been successfully updated.')
      setTitle('Sucess')
      setShowModal(true)
      healthInfo.reset()
    }
  }

  const editPersonalInfo = async () => {
    // debugger
    let userToUpdate = {
      ...user,
    }
    console.log('USER TO UPDATE: ', user)
    if (address.params.value !== user.address && address.params.value.length > 9) {
      userToUpdate = {
        ...userToUpdate,
        address: address.params.value,
      }
    }
    if (city.params.value !== user.city && city.params.value.length > 4) {
      userToUpdate = {
        ...userToUpdate,
        city: city.params.value,
      }
    }
    if (mobileNumber.params.value !== user.mobileNumber && mobileNumber.params.value.length > 7) {
      userToUpdate = {
        ...userToUpdate,
        mobileNumber: mobileNumber.params.value,
      }
    }
    if (zipCode.params.value !== user.zipCode && zipCode.params.value.length === 5) {
      userToUpdate = {
        ...userToUpdate,
        zipCode: zipCode.params.value,
      }
    }
    if (country !== user.country && country) {
      userToUpdate = {
        ...userToUpdate,
        country: country,
      }
    }


    if (Object.keys(user).length < Object.keys(userToUpdate).length ||
      user.country !== userToUpdate.country) {
      console.log('USER TO UPDATE: ', userToUpdate)
      updateSignedInUser(userToUpdate)
      setModalMessage('Your profile has been successfully updated.')
      setTitle('Sucess')
      setShowModal(true)
      address.reset()
      mobileNumber.reset()
      city.reset()
      zipCode.reset()
    }
  }

  const updateSignedInUser = (userToUpdate) => {
    try {
      dispatch(updateUser(userToUpdate))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen static pt-20">
        <div className="bg-white m-2 md:m-8 mb-1 shadow overflow-hidden rounded-lg" >
          <div >
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="pt-3 md:col-span-1">
                <div className="pt-2 px-4 sm:px-0">
                  <h3 className="text-xl font-medium leading-6 pt-3 text-gray-900">Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">This information will be shown only to the admins.</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form onSubmit={editProfile}>
                  <div className="shadow md:rounded-md md:overflow-hidden rounded-b-md">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6 ">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Health information
                        {healthInfo.params.value.length > 29 ?
                            <span className="pl-1 text-xs font-normal">{`(${healthInfo.params.value.length}/500)`}</span>
                            :
                            <span className="pl-1 text-xs font-normal">{`(${healthInfo.params.value.length}/30 characters minimum)`}</span>
                          }
                        </label>
                        <div className="mt-1">
                          <textarea id="about" name="about" rows="3" minLength="30" maxLength="500" placeholder="30 characters minimum" {...healthInfo.params}
                            className="shadow-sm focus:ring-indigo-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-200"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Medical background, chronical health issues, treatments, etc. If you have
                          any doctor's certificate please share it with me in person.
                        </p>
                      </div>
                      <div className="ml-6 md:ml-28">
                        <div className="flex flex-row items-center md:space-x-10">
                          {imagePreview ?
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">Photo</label>
                              <img src={imagePreview} alt="chosen"
                                className="inline-block rounded-full h-16 w-16 md:h-28 md:w-28 md:rounded-full overflow-hidden" />
                              <p className="text-xs text-gray-500 w-36 pt-2 md:pt-2">{imageMessage}</p>
                            </div>
                            :
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">Photo</label>
                              <span className="inline-block rounded-full h-16 w-16 md:h-28 md:w-28 md:rounded-full overflow-hidden bg-gray-100">
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                              <p className="text-xs text-gray-500 w-36 pt-2 md:pt-2">PNG, JPG, JPEG up to 3MB</p>
                            </div>
                          }
                          <div className="grid grid-row-3">
                            <label className="cursor-pointer bg-gray-500 hover:bg-gray-400 px-3 py-2 h-30 w-32 rounded-md
                            text-xs text-white md:w-auto md:text-base md:hover:bg-gray-300 focus-within:ring-offset-2 focus-within:ring-red-600">
                              <span>{selectedFile ? 'Change image' : 'Upload a picture'}</span>
                              <input type="file" name="image" accept="image/*" onChange={handleImageInput} value={fileInputState} className="sr-only"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right sm:px-6 rounded-b-md">
                      <button type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                        Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="md:block" aria-hidden="true">
            <div className="py-4">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="static mt-10 md:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-xl font-medium leading-6 text-gray-900">Edit Personal Information</h2>
                  <p className="mt-1 text-sm text-gray-600">Use an address where you live most of the year.</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form >
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="px-4 py-5 bg-white md:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">First name</label>
                          <div name="first_name" id="first_name" type="text"
                            className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md capitalize">
                            {user.firstName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">Last name</label>
                          <div name="last_name" id="last_name" type="text"
                            className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md capitalize">
                            {user.lastName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">Username</label>
                          <div name="username" id="username" type="text"
                            className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                            {user.username}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">Email address</label>
                          <div name="email_address" id="email_address" type="text"
                            className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                            {user.email}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">Street address</label>
                          <input name="street_address" id="street_address" autoComplete="street-address" {...address.params}
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                          <input name="postal_code" id="postal_code" autoComplete="postal-code" {...zipCode.params}
                            className=" focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input name="city" id="city" {...city.params}
                            className="focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Mobile number</label>
                          <input name="city" id="city" {...mobileNumber.params} placeholder="044123456"
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                        </div>
                        <div className="col-span-6">
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <div id="country" name="country" type="text"
                              className="relative block h-10 w-full px-3 border border-gray-300
                              ring-gray-500 bg-white rounded-md shadow-sm md:text-md text-left">
                              {country ?
                                <div className="text-gray-500 md:text-md">
                                  {country}<span onClick={() => setCountry(null)}
                                    className="absolute opacity-50 inset-y-0 right-11 pt-1 z-50 cursor-pointer ">x</span>
                                </div > :
                                <div className="opacity-25">Select country</div>
                              }
                              <span className="absolute right-0 inset-y-0 flex items-center pr-2 pl-1 border-l mt-2 mb-2 cursor-pointer"
                                onClick={() => setDropdown(!dropdown)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                            <div style={visibleDrop}
                              className="absolute border rounded-sm col-span-6 w-full bg-white z-50 inset-x-0 -top-36 ">
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry('Finland')}
                              >Finland</p>
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry('Norway')}
                              >Sweden</p>
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry('Sweden')}
                              >Norway</p>
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry('Estonia')}
                              >Estonia</p>
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry('Mexico')}
                              >Mexico</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button type="button" onClick={editPersonalInfo}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                        Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="md:block" aria-hidden="true">
            <div className="py-4">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} message={modalMessage} title={title} />
      </div>
    </div>
  )
}

export default EditForm