import React, { useState, useEffect } from 'react'
import localdb from '../utils/localdb'
import { getUser, updateUser } from '../reducers/userReducer'
import imageService from '../services/images'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import Modal from './Modal'

const EditForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users)
  //console.log('USER_EDIT_INFO: ', user)
  const loogedUser = localdb.loadUser()

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [title, setTitle] = useState('')

  useEffect(async () => {
    if (loogedUser) {
      dispatch(getUser(loogedUser.id))
    }
  }, [dispatch])


  const [imageMessage, setImageMessage] = useState(null)
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelecteFile] = useState('')
  const [imagePreview, setImagePreview] = useState()

  // data to change
  const healthInfo = useField('text')

  const firstName = useField('text')
  const lastName = useField('text')
  const email = useField('email')
  const address = useField('text')
  const mobile = useField('text')
  const city = useField('text')
  const region = useField('text')
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

  const editProfile = async (event) => {
    event.preventDefault()

    let image
    if (imagePreview && selectedFile.size < 3000000) {
      const data = new FormData()
      data.append('image', selectedFile)
      try {
        image = await imageService.postImage(data)
      } catch (error) {
        console.log('ERROR: ', error.response.data)
      }
      const updatedUser = {
        ...user,
        imageURL: image.url
      }
      localdb.saveUser({ ...loogedUser, imageURL: image.url })
      updateSignedInUser(updatedUser)
    }
    //debugger
    if (healthInfo.params.value.length > 0) {
      const updatedUser = {
        ...user,
        healthInfo: healthInfo.params.value
      }
      updateSignedInUser(updatedUser)
      healthInfo.reset()
    }
  }

  const editPersonalInfo = async () => {

    let userToUpdate = {
      ...user,
    }
    console.log('USER TO UPDATE: ', user)
    if (firstName.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        firstName: firstName.params.value,
      }
    }
    if (lastName.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        lastName: lastName.params.value,
      }
    }
    if (email.params.value) {
      userToUpdate = {
        ...userToUpdate,
        email: email.params.value,
      }
    }
    if (address.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        address: address.params.value,
      }
    }
    if (city.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        city: city.params.value,
      }
    }
    if (mobile.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        mobileNumber: mobile.params.value,
      }
    }
    if (region.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        region: region.params.value,
      }
    }
    if (zipCode.params.value.length > 0) {
      userToUpdate = {
        ...userToUpdate,
        zipCode: zipCode.params.value,
      }
    }
    if (country) {
      userToUpdate = {
        ...userToUpdate,
        country: country,
      }
    }
    //console.log('USER TO UPDATE: ', userToUpdate)

    if (Object.keys(user).length < Object.keys(userToUpdate).length ||
      user.country !== userToUpdate.country) {
      updateSignedInUser(userToUpdate)
    }
    setModalMessage('Your profile has been successfuly updated.')
    setTitle('Sucess')
    setShowModal(true)
    firstName.reset()
    lastName.reset()
    email.reset()
    address.reset()
    mobile.reset()
    city.reset()
    region.reset()
    zipCode.reset()
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
      <div className="bg-white m-2 md:m-8 mb-1 shadow overflow-hidden rounded-lg" >
        <div >
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="pt-3 md:col-span-1">
              <div className="pt-2 px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 pt-3 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">This information will be show only to the admins.</p>
              </div>
            </div>
            <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
              <form onSubmit={editProfile}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Health information<span className="pl-1 text-xs font-normal">{`(${healthInfo.params.value.length}/500)`}</span>
                      </label>
                      <div className="mt-1">
                        <textarea id="about" name="about" rows="3" maxLength="500" {...healthInfo.params}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Share something that you believe is important to me.
                        Chronical health issues, medical treatments, etc.
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
                            text-xs text-white md:w-auto md:text-base md:hover:bg-red-600 focus-within:ring-offset-2 focus-within:ring-red-600">
                            <span>{selectedFile ? 'Change image' : 'Upload a picture'}</span>
                            <input type="file" name="image" accept="image/*" onChange={handleImageInput} value={fileInputState} className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:text-gray-600 hover:bg-red-600 focus-within:outline-none focus-within:ring-1">
                      Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Use an address where you live most of the year.</p>
              </div>
            </div>
            <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
              <form >
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">First name</label>
                        <input name="first_name" id="first_name" autoComplete="given-name" {...firstName.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Last name</label>
                        <input name="last_name" id="last_name" autoComplete="family-name" {...lastName.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input name="email_address" id="email_address" autoComplete="email" {...email.params} placeholder="jane@example.com"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Street address</label>
                        <input name="street_address" id="street_address" autoComplete="street-address" {...address.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Mobile number</label>
                        <input name="city" id="city" {...mobile.params} placeholder="044123456"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                      </div>
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input name="city" id="city" {...city.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Region / Province</label>
                        <input name="state" id="state" {...region.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                        <input name="postal_code" id="postal_code" autoComplete="postal-code" {...zipCode.params}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                      <div className="col-span-6 md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <select id="country" name="country" autoComplete="country" onChange={({ target }) => setCountry(target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="Finland" >Finland</option>
                          <option value="Sweden" >Sweden</option>
                          <option value="Norway" >Norway</option>
                          <option value="Estonia" >Estonia</option>
                          <option value="Mexico" >Mexico</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="button" onClick={editPersonalInfo}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:text-gray-600 hover:bg-red-600 focus-within:outline-none focus-within:ring-1">
                      Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="">
        <Modal showModal={showModal} setShowModal={setShowModal} message={modalMessage} title={title} />
      </div>
    </div>
  )
}

export default EditForm