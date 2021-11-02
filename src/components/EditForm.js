import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from '@tailwindui/react'
import { useTranslation } from 'react-i18next'
import { updateUser, deleteUser } from '../reducers/usersReducer'
import imageService from '../services/images'
import loginService from '../services/login'
import { userLogin, userLogout } from '../reducers/loginReducer'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { getCountries, RenderAvatar } from '../utils/helper'
import { ReactComponent as SelectorIcon } from '../assets/selector-icon.svg'
import { ReactComponent as WarningIcon } from '../assets/warning-icon.svg'
import { ReactComponent as XIcon } from '../assets/x-icon.svg'

import localdb from '../utils/localdb'
import LoadingPage from '../utils/LoadingPage'

const EditForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === loggedUser.id)

  // countries menu visibility control
  const [dropdown, setDropdown] = useState(false)
  const countries = getCountries()

  // visibility control of remove profile confirmation modal
  const [showModal, setShowModal] = useState(false)
  const showConfirmationModal = { display: showModal ? '' : 'none' }

  // handle image and health info information
  const [imageMessage, setImageMessage] = useState(null)
  const [selectedFile, setSelecteFile] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  const healthInfo = useField('text')

  const handleImageInput = event => {
    event.preventDefault()
    const image = event.target.files[0]
    if (image && image.size > 3000000) {
      setImageMessage(t('EditForm.ImageWarning'))
    } else {
      setImageMessage(t('EditForm.ImageRequirement'))
    }
    setSelecteFile(image)
    image && previewImage(image)
  }

  const previewImage = img => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
  }

  const handleEditProfile = async event => {
    event.preventDefault()
    let image
    let updatedUser = {
      ...user,
    }
    if (imagePreview && selectedFile.size < 2000000) {
      const data = new FormData()
      data.append('image', selectedFile)
      try {
        if (loggedUser.imageID) {
          imageService.removeImage(loggedUser.imageID)
        }
        image = await imageService.postImage(data)
      } catch (error) {
        console.log('ERROR: ', error.response.data.error)
      }
      updatedUser = {
        ...updatedUser,
        imageURL: image.url,
        imageID: image.cloudinaryId,
      }
      dispatch(
        userLogin({
          ...loggedUser,
          imageURL: image.url,
          imageID: image.cloudinaryId,
        })
      )
      handleUpdateLoggedUser(updatedUser)
      setImagePreview(null)
      dispatch(
        setNotification({
          message: t('EditForm.ImageSaved'),
          title: 'Sucess',
          show: true,
        })
      )
    }
    if (healthInfo.params.value.length > 29 && healthInfo.params.value.length !== 0) {
      updatedUser = {
        ...updatedUser,
        healthInfo: healthInfo.params.value,
      }
      handleUpdateLoggedUser(updatedUser)
      dispatch(
        setNotification({
          message: t('EditForm.InfoUpdate'),
          title: 'Sucess',
          show: true,
        })
      )
      healthInfo.reset()
    }
  }

  // handle profile picture removal
  const handleDeleteImage = () => {
    if (loggedUser.imageID) {
      let updatedUser = {
        ...user,
        imageURL: '',
        imageID: '',
      }
      imageService.removeImage(loggedUser.imageID)
      dispatch(
        userLogin({
          ...loggedUser,
          imageURL: '',
          imageID: '',
        })
      )
      handleUpdateLoggedUser(updatedUser)
    }
  }

  // handle personal info update
  const address = useField('text')
  const mobileNumber = useField('text')
  const city = useField('text')
  const zipCode = useField('text')
  let userUpdated = false

  const [country, setCountry] = useState(null)

  const handleCountry = country => {
    setCountry(country)
    setDropdown(!dropdown)
  }

  const handletPersonalInfo = () => {
    let userToUpdate = {
      ...user,
    }
    if (address.params.value !== user.address && address.params.value.length > 9) {
      userToUpdate = {
        ...userToUpdate,
        address: address.params.value,
      }
      userUpdated = true
    }
    if (city.params.value !== user.city && city.params.value.length > 4) {
      userToUpdate = {
        ...userToUpdate,
        city: city.params.value,
      }
      userUpdated = true
    }
    if (mobileNumber.params.value !== user.mobileNumber && mobileNumber.params.value.length > 7) {
      userToUpdate = {
        ...userToUpdate,
        mobileNumber: mobileNumber.params.value,
      }
      userUpdated = true
    }
    if (zipCode.params.value !== user.zipCode && zipCode.params.value.length === 5) {
      userToUpdate = {
        ...userToUpdate,
        zipCode: zipCode.params.value,
      }
      userUpdated = true
    }
    if (country !== user.country && country) {
      userToUpdate = { ...userToUpdate, country: country }
      userUpdated = true
    }

    if (userUpdated) {
      handleUpdateLoggedUser(userToUpdate)
      dispatch(
        setNotification({
          message: t('Client.InfoUpdate'),
          title: 'Sucess',
          show: true,
        })
      )
      userUpdated = false
      address.reset()
      mobileNumber.reset()
      city.reset()
      zipCode.reset()
      setCountry(null)
    }
  }

  const handleUpdateLoggedUser = userToUpdate => {
    try {
      dispatch(updateUser(userToUpdate))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const oldPassword = useField('password')
  const oldPasswordConfirm = useField('password')
  const newPassword = useField('password')

  // handle password update
  const handlePasswordChange = async event => {
    event.preventDefault()
    const data = {
      user: user,
      oldPassword: oldPassword.params.value,
      newPassword: newPassword.params.value,
    }
    if (oldPassword.params.value === oldPasswordConfirm.params.value) {
      try {
        await loginService.updatePassword(data)
        dispatch(
          setNotification({
            message: t('EditForm.PasswordUpdate'),
            title: 'Sucess',
            show: true,
          })
        )
        oldPassword.reset()
        oldPasswordConfirm.reset()
        newPassword.reset()
      } catch (error) {
        dispatch(
          setNotification({
            message: error.response.data.error,
            title: 'Error',
            show: true,
          })
        )
      }
    }
  }

  // handle profile removal
  const handleProfileRemoval = () => {
    history.push('/home')
    setShowModal(!showModal)
    if (loggedUser.imageID) {
      imageService.removeImage(loggedUser.imageID)
    }
    dispatch(deleteUser(user))
    dispatch(
      setNotification({
        message: t('EditForm.ProfileDeleted'),
        title: t('EditForm.DeletedTitle'),
        show: true,
      })
    )
    setTimeout(() => {
      dispatch(userLogout())
    }, 5000)
  }

  if (!user) {
    return <LoadingPage />
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-22 static">
        <div className="bg-white m-2 md:m-8 mb-1 shadow overflow-hidden rounded-lg">
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-100">
              <div className="md:pt-3 md:col-span-1">
                <div className="md:pt-2 px-4 sm:px-0">
                  <h3 className="text-xl font-medium leading-6 pt-3 text-gray-900">{t('MainMenu.ProfileLabel')}</h3>
                  <p className="mt-1 text-sm text-gray-600">{t('EditForm.ProfileLegend')}</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:pt-7 md:col-span-2 ">
                <form onSubmit={handleEditProfile}>
                  <div className="shadow md:rounded-md md:overflow-hidden rounded-b-md ">
                    <div className="p-4 space-y-5 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div>
                        <label className="edit-form-label md:pl-3">
                          {t('Client.Health')}
                          {healthInfo.params.value.length > 29 ? (
                            <span className="pl-1 text-xs text-gray-500 font-normal">{`(${healthInfo.params.value.length}/500)`}</span>
                          ) : (
                            <span className="pl-1 text-xs text-red-400 font-normal">{`(${healthInfo.params.value.length}/30 min)`}</span>
                          )}
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="health-report"
                            name="about"
                            rows="3"
                            minLength="30"
                            maxLength="500"
                            placeholder="30 characters minimum"
                            {...healthInfo.params}
                            className="h-24 md:h-32 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md p-2 text-sm placeholder-gray-200"
                          />
                        </div>
                        <p className="mt-2 p-1 text-sm text-gray-500">{t('EditForm.HealthLegend')}</p>
                      </div>
                      <div className="ml-2 md:ml-24">
                        <div className="flex flex-row items-center justify-center w-full gap-3 md:space-x-10">
                          {imagePreview ? (
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">{t('EditForm.PhotoLabel')}</label>
                              <img
                                src={imagePreview}
                                alt="chosen"
                                className="inline-block rounded-full h-16 w-16 md:h-28 md:w-28 md:rounded-full overflow-hidden"
                              />
                              <p className=" text-xs text-center text-gray-600 w-36 pt-2 md:pt-2">{imageMessage}</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">{t('EditForm.PhotoLabel')}</label>
                              <span className="inline-block rounded-full h-16 w-16 md:h-32 md:w-32 md:rounded-full overflow-hidden bg-gray-400">
                                {RenderAvatar(user.gender)}
                              </span>
                              <p className="text-xs text-center text-gray-500 w-auto pt-2 md:pt-2">
                                {t('EditForm.ImageRequirement')}
                              </p>
                            </div>
                          )}
                          <div className="flex flex-col md:flex-row md:gap-6">
                            <div className="grid grid-row-3">
                              <label
                                className="transition duration-500 cursor-pointer bg-gray-500 hover:bg-gray-400 px-3 py-2.5 h-8 w-32 rounded-md
                              text-xs text-center text-white md:w-36 md:h-10 md:text-sm md:hover:bg-gray-400 focus-within:ring-offset-2 focus-within:ring-red-600"
                              >
                                <span>{selectedFile ? t('EditForm.ImgBtnLabel_2') : t('EditForm.ImgBtnLabel_1')}</span>
                                <input
                                  id="image-input"
                                  type="file"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleImageInput}
                                  className="sr-only"
                                />
                              </label>
                            </div>
                            <button
                              id="delete-profile-picture"
                              onClick={handleDeleteImage}
                              className="transition duration-500 cursor-pointer bg-gray-500 hover:bg-gray-400 h-8 w-32 rounded-md
                              text-xs text-white md:h-10 md:w-32 md:text-sm md:hover:bg-gray-400"
                            >
                              {t('ButtonLabel.Delete')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right sm:px-6 rounded-b-md">
                      <button id="save-health-button" type="submit" className="buttons-web">
                        {t('ButtonLabel.Save')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="md:block" aria-hidden="true">
            <div className="py-4 bg-gray-100">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="static">
            <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-100">
              <div className="md:col-span-1">
                <div className="px-4 md:px-0">
                  <h2 className="text-xl font-medium leading-6 text-gray-900">{t('EditForm.EditPerInfo')}</h2>
                  <p className="mt-1 text-sm text-gray-600">{t('EditForm.AddressLegend')}</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form>
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="px-4 pb-5 pt-4 md:py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 md:col-span-3">
                          <label className="edit-form-label">{t('EditForm.Firstname')}</label>
                          <div
                            name="first_name"
                            id="first_name"
                            type="text"
                            className="bg-transparent border-transparent shadow-md rounded-sm w-full h-8 text-sm pl-2capitalize"
                          >
                            {user.firstName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="edit-form-label">{t('EditForm.Lastname')}</label>
                          <div
                            name="last_name"
                            id="last_name"
                            type="text"
                            className="bg-transparent border-transparent shadow-md rounded-sm w-full h-8 text-sm pl-2capitalize"
                          >
                            {user.lastName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="edit-form-label">{t('EditForm.Username')}</label>
                          <div
                            name="username"
                            id="username"
                            type="text"
                            className="bg-transparent border-transparent shadow-md rounded-sm w-full h-8 text-sm pl-2"
                          >
                            {user.username}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="edit-form-label">{t('EditForm.Email')}</label>
                          <div
                            name="email_address"
                            id="email_address"
                            type="text"
                            className="bg-transparent border-transparent shadow-md rounded-sm w-full h-8 text-sm pl-2"
                          >
                            {user.email}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <label className="edit-form-label">{t('EditForm.Address')}</label>
                          <input
                            name="street_address"
                            id="street-address"
                            autoComplete="street-address"
                            {...address.params}
                            className="editform-input"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="edit-form-label">{t('EditForm.PostalCode')}</label>
                          <input
                            name="postal_code"
                            id="postal-code"
                            autoComplete="postal-code"
                            {...zipCode.params}
                            className="editform-input"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="edit-form-label">{t('EditForm.City')}</label>
                          <input name="city" id="city" {...city.params} className="editform-input" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="edit-form-label">{t('EditForm.Mobile')}</label>
                          <input
                            name="mobile"
                            id="mobile"
                            {...mobileNumber.params}
                            placeholder="044123456"
                            className="editform-input placeholder-gray-200"
                          />
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-12">
                            <label className="edit-form-label">{t('EditForm.Country')}</label>
                            <div
                              id="country"
                              name="country"
                              type="text"
                              className="flex flex-row justify-between border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white rounded-sm p-2 pl-2 w-full"
                            >
                              {country ? (
                                <div className="text-gray-500 md:text-base pl-1">{country}</div>
                              ) : (
                                <div className="opacity-25 text-base pl-1">{t('EditForm.SelectCountry')}</div>
                              )}
                              <div className="flex ">
                                {country ? (
                                  <span
                                    onClick={() => setCountry(null)}
                                    className="text-base text-gray-300 pr-2 cursor-pointer "
                                  >
                                    X
                                  </span>
                                ) : null}
                                <span
                                  className="inset-y-0 border-l pl-1 pt-1 cursor-pointer"
                                  onClick={() => setDropdown(!dropdown)}
                                >
                                  <SelectorIcon className="h-5 w-5" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <Transition
                            show={dropdown}
                            enter="transition ease-out duration-150"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <div className="absolute border rounded-sm bg-white mt-4 divide-y divide-gray-50 w-1/2 ">
                              {countries.sort().map(country => (
                                <p
                                  id={`${country}`}
                                  className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                  onClick={() => handleCountry(country)}
                                  key={country}
                                >
                                  {country}
                                </p>
                              ))}
                            </div>
                          </Transition>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button
                        id="save-personal-info-button"
                        type="button"
                        onClick={handletPersonalInfo}
                        className="buttons-web"
                      >
                        {t('ButtonLabel.Save')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="md:block">
            <div className="py-4 bg-gray-100">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="static">
            <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-100">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-xl font-medium leading-6 text-gray-900">{t('EditForm.ChangePassword')}</h2>
                  <p className="mt-1 text-sm text-gray-600">{t('EditForm.PasswordLegend')}</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form>
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="px-4 pb-5 pt-4 md:py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 md:col-span-4">
                          <label className="edit-form-label">{t('EditForm.OldPassword')}</label>
                          <input
                            name="oldPassword"
                            id="oldPassword"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            {...oldPassword.params}
                            className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md h-8 pl-2 text-sm"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-4">
                          <label className="edit-form-label">
                            {t('EditForm.OldPasswordConfirm')}
                            {oldPasswordConfirm.params.value === oldPassword.params.value &&
                            oldPasswordConfirm.params.value.length > 7 ? (
                              <span className="text-sm text-gray-300 pl-2">{t('EditForm.PasswordMatched')}</span>
                            ) : (
                              <span className="text-sm text-red-300 pl-2">{t('EditForm.PasswordWarning')}</span>
                            )}
                          </label>
                          <input
                            name="oldPasswordConfirm"
                            id="oldPasswordConfirm"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            {...oldPasswordConfirm.params}
                            className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md h-8 pl-2 text-sm"
                          />
                        </div>
                        <div className="col-span-6 md:col-span-4">
                          <label className="edit-form-label">
                            {t('EditForm.NewPassword')}
                            <span className="text-sm text-gray-300 pl-2">
                              {oldPassword.params.value === newPassword.params.value &&
                              newPassword.params.value.length > 7
                                ? '(New password cannot be the same as the old one)'
                                : ''}
                            </span>
                          </label>
                          <input
                            name="newPassword"
                            id="newPassword"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            {...newPassword.params}
                            className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md h-8 pl-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button
                        id="save-updated-password-button"
                        type="button"
                        onClick={handlePasswordChange}
                        className="buttons-web"
                      >
                        {t('ButtonLabel.Save')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="md:block" aria-hidden="true">
            <div className="py-4 bg-gray-100">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="static">
            <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-100">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h2 className="text-xl font-medium leading-6 text-gray-900">{t('EditForm.EraseProfile')}</h2>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                  <div className="px-4 py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                    <div className="grid grid-cols-6 gap-6">
                      <p className="col-span-6 mt-1 p-2 text-lg text-gray-600">{t('EditForm.EraseLegend')}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-400 text-right md:px-6 space-x-2">
                    <button type="button" onClick={() => localdb.forgetSettings(user.username)} className="buttons-web">
                      {t('ButtonLabel.Forget')}
                    </button>
                    <button type="button" onClick={() => setShowModal(!showModal)} className="buttons-web">
                      {t('ButtonLabel.Remove')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:block" aria-hidden="true">
            <div className="py-4 bg-gray-100">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          {/* Warning modal for profile removal */}
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={showConfirmationModal}
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <button
                  className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(!showModal)}
                >
                  <XIcon className="h-5 w-5 opacity-50" />
                </button>
                <div className="flex items-start justify-between p-1 pl-4 pb-2 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-700">{t('EditForm.RemovingTitle')}</h3>
                </div>
                <div className="relative pl-4 pr-4 pt-4 flex-auto">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 md:mx-0 md:h-10 md:w-10">
                    <WarningIcon />
                  </div>
                  <p className="text-center text-gray-500 text-base p-2 leading-relaxed">
                    {t('EditForm.RemovingConfirmation')}
                  </p>
                </div>
                <div className="flex items-center justify-end p-3 pr-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-24 md:text-base"
                    type="button"
                    onClick={() => setShowModal(!showModal)}
                  >
                    {t('ButtonLabel.Cancel')}
                  </button>
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-24 md:text-base"
                    type="button"
                    onClick={() => handleProfileRemoval()}
                  >
                    {t('ButtonLabel.Remove')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm
