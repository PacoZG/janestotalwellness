import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, deleteUser } from '../../reducers/usersReducer'
import imageService from '../../services/images'
import loginService from '../../services/login'
import { userLogin, userLogout } from '../../reducers/loginReducer'
import { useField } from '../../hooks/index'
import { setNotification } from '../../reducers/notificationReducer'

const EditFormFin = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedUser = useSelector(state => state.loggedUser)
  // console.log('LOGGED USER: ', loggedUser)
  const users = useSelector(state => state.users)
  // console.log('USERS: ', users)
  const user = users.find(user => user.id === loggedUser.id)
  // console.log('USER_EDIT_INFO: ', user)

  // countries menu visibility control
  const [dropdown, setDropdown] = useState(false)
  const visibleDrop = { display: dropdown ? '' : 'none' }

  // visibility control of remove profile confirmation modal
  const [showModal, setShowModal] = useState(false)
  const showConfirmationModal = { display: showModal ? '' : 'none' }

  // handle image and health info information
  const [imageMessage, setImageMessage] = useState(null)
  const [selectedFile, setSelecteFile] = useState('')
  const [imagePreview, setImagePreview] = useState()

  const healthInfo = useField('text')

  const handleImageInput = (event) => {
    event.preventDefault()
    const image = event.target.files[0]
    if (image.size > 3000000) {
      setImageMessage('Kuva on suurempi kuin 3 Mt')
    } else {
      setImageMessage('PNG, JPG, JPEG enintään 3 Mt.')
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

  const handleEditProfile = async (event) => {
    event.preventDefault()
    let image
    let updatedUser = {
      ...user
    }
    // console.log('USER TO UPDATE: ', updatedUser)
    if (imagePreview && selectedFile.size < 3000000) {
      const data = new FormData()
      data.append('image', selectedFile)
      // debugger
      try {
        image = await imageService.postImage(data)
        // console.log('IMAGE: ', image)
      } catch (error) {
        console.log('ERROR: ', error.response.data)
      }
      updatedUser = {
        ...updatedUser,
        imageURL: image.url,
        imageID: image.cloudinaryId
      }
      dispatch(userLogin({ ...loggedUser, imageURL: image.url, imageID: image.cloudinaryId }))
      // localdb.saveUser({ ...loggedUser, imageURL: image.url, imageID: image.cloudinaryId })
      if (user.imageID) {
        imageService.removeImage(user.imageID)
      }
      handleUpdateLoggedUser(updatedUser)
      dispatch(setNotification({
        message: 'Profiilikuvasi on päivitetty.',
        title: 'Menestys',
        show: true
      }))
    }
    if (healthInfo.params.value.length > 29 && healthInfo.params.value.length !== 0) {
      updatedUser = {
        ...updatedUser,
        healthInfo: healthInfo.params.value
      }
      handleUpdateLoggedUser(updatedUser)
      dispatch(setNotification({
        message: 'Terveystietosi on päivitetty onnistuneesti.',
        title: 'Menestys',
        show: true
      }))
      healthInfo.reset()
    }
  }

  // handle personal info update
  const address = useField('text')
  const mobileNumber = useField('text')
  const city = useField('text')
  const zipCode = useField('text')
  let userUpdated = false

  const [country, setCountry] = useState(null)
  const countries = [
    'Suomi', 'Ruotsi', 'Norja', 'Viro', 'Saksa', 'Espanja', 'Italia', 'Alankomaat', 'Sveitsi', 'Meksiko'
  ]

  const handleCountry = (country) => {
    setCountry(country)
    setDropdown(!dropdown)
  }

  const handletPersonalInfo = () => {
    // debugger
    let userToUpdate = {
      ...user,
    }
    // console.log('USER TO UPDATE: ', user)
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
      // console.log('USER TO UPDATE: ', userToUpdate)
      handleUpdateLoggedUser(userToUpdate)
      dispatch(setNotification({
        message: 'Profiilikuvasi on päivitetty.',
        title: 'Menestys',
        show: true
      }))
      userUpdated = false
      address.reset()
      mobileNumber.reset()
      city.reset()
      zipCode.reset()
      setCountry(null)
    }
  }

  const handleUpdateLoggedUser = (userToUpdate) => {
    try {
      dispatch(updateUser(userToUpdate))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  // password update
  const oldPassword = useField('password')
  const oldPasswordConfirm = useField('password')
  const newPassword = useField('password')

  // console.log('OLD PASSWORD: ', oldPassword.params.value)
  // console.log('OLD PASSWORD CONFIRM: ', oldPasswordConfirm.params.value)
  // console.log('NEW PASSWORD: ', newPassword.params.value)

  // handle password update
  const handlePasswordChange = async (event) => {
    event.preventDefault()
    const data = {
      user: user,
      oldPassword: oldPassword.params.value,
      newPassword: newPassword.params.value
    }
    if (oldPassword.params.value === oldPasswordConfirm.params.value) {
      try {
        const userupdate = await loginService.updatePassword(data)
        //console.log('UPDATED USER EDIT PROFILE:', userupdate)
        dispatch(setNotification({
          message: 'Salasanasi on päivitetty onnistuneesti, uusi salasanasi on voimassa seuraavan kerran, kun kirjaudut sisään',
          title: 'Menestys',
          show: true
        }))
        oldPassword.reset()
        oldPasswordConfirm.reset()
        newPassword.reset()
      } catch (error) {
        dispatch(setNotification({
          message: error.response.data.error,
          title: 'Virhe',
          show: true
        }))
      }
    }
  }

  // handle profile removal
  const handleProfileRemoval = () => {
    // console.log('profile erased')
    history.push('/fin/frontpage')
    setShowModal(!showModal)
    dispatch(deleteUser(user))
    dispatch(setNotification({
      message: 'Olemme surullisia nähdessämme sinun menevän, pitämällä itsesi aktiivisena ja terveenä.',
      title: 'Valitettava uutinen meille',
      show: true
    }))
    setTimeout(() => {
      dispatch(userLogout())
    }, 5000)
  }

  if (!user) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <p className="pr-2" >Ladataan...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen static">
        <div className="bg-white m-2 md:m-8 mb-1 shadow overflow-hidden rounded-lg" >
          <div >
            <div className="md:grid md:grid-cols-3 md:gap-6 bg-gray-100">
              <div className="md:pt-3 md:col-span-1">
                <div className="md:pt-2 px-4 sm:px-0">
                  <h3 className="text-xl font-medium leading-6 pt-3 text-gray-900">Profiili</h3>
                  <p className="mt-1 text-sm text-gray-600">Nämä tiedot näytetään vain järjestelmänvalvojille.</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:pt-7 md:col-span-2 ">
                <form onSubmit={handleEditProfile}>
                  <div className="shadow md:rounded-md md:overflow-hidden rounded-b-md ">
                    <div className="px-4 py-5 space-y-6 sm:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 pl-2">Health information
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
                          Lääketieteellinen tausta, krooniset terveysongelmat, hoidot jne. Jos sinulla on lääkärintodistus, jaa se minulle henkilökohtaisesti.
                        </p>
                      </div>
                      <div className="ml-6 md:ml-28">
                        <div className="flex flex-row items-center md:space-x-10">
                          {imagePreview ?
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">Kuva</label>
                              <img src={imagePreview} alt="chosen"
                                className="inline-block rounded-full h-16 w-16 md:h-28 md:w-28 md:rounded-full overflow-hidden" />
                              <p className="text-xs text-gray-500 w-36 pt-2 md:pt-2">{imageMessage}</p>
                            </div>
                            :
                            <div className="flex flex-col items-center">
                              <label className="text-sm font-medium text-gray-700">Kuva</label>
                              <span className="inline-block rounded-full h-16 w-16 md:h-28 md:w-28 md:rounded-full overflow-hidden bg-gray-100">
                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                              <p className="text-xs text-gray-500 w-36 pt-2 md:pt-2">PNG, JPG, JPEG enintään 3 Mt</p>
                            </div>
                          }
                          <div className="grid grid-row-3">
                            <label className="cursor-pointer bg-gray-500 hover:bg-gray-400 px-3 py-2 h-30 w-auto rounded-md
                            text-xs text-white md:w-auto md:text-base md:hover:bg-gray-300 focus-within:ring-offset-2 focus-within:ring-red-600">
                              <span>{selectedFile ? 'Vaihda kuvaa' : 'Lähetä kuva'}</span>
                              <input type="file" name="image" accept="image/*" onChange={handleImageInput} className="sr-only"
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
                        Tallentaa</button>
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
                  <h2 className="text-xl font-medium leading-6 text-gray-900">Muokkaa henkilökohtaisia tietoja</h2>
                  <p className="mt-1 text-sm text-gray-600">Käytä osoitetta, jossa asut suurimman osan vuodesta.</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form >
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="px-4 py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Etunimi</label>
                          <div name="first_name" id="first_name" type="text"
                            className="w-full shadow-sm md:text-sm border-gray-200 bg-transparent rounded-md capitalize">
                            {user.firstName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Sukunimi</label>
                          <div name="last_name" id="last_name" type="text"
                            className="w-full shadow-sm md:text-sm border-gray-200 bg-transparent rounded-md capitalize">
                            {user.lastName}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Käyttäjänimi</label>
                          <div name="username" id="username" type="text"
                            className="w-full shadow-sm md:text-sm border-gray-200 bg-transparent rounded-md" >
                            {user.username}
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Sähköpostiosoite</label>
                          <div name="email_address" id="email_address" type="text"
                            className="w-full shadow-sm md:text-sm border-gray-200 bg-transparent rounded-md">
                            {user.email}
                          </div>
                        </div>
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Katuosoite</label>
                          <input name="street_address" id="street_address" autoComplete="street-address" {...address.params}
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Postinumero</label>
                          <input name="postal_code" id="postal_code" autoComplete="postal-code" {...zipCode.params}
                            className=" focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Kaupunki</label>
                          <input name="city" id="city" {...city.params}
                            className="focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Matkapuhelinnumero</label>
                          <input name="mobile" id="mobile" {...mobileNumber.params} placeholder="044123456"
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                        </div>
                        <div className="col-span-6">
                          <div className="flex flex-col h-12">
                            <label className="block text-sm font-medium text-gray-700 pl-2">Maa</label>
                            <div id="country" name="country" type="text"
                              className="flex flex-row justify-between h-10 px-3 border border-gray-300 ring-gray-500 bg-white rounded-md shadow-sm md:text-md">
                              {country ?
                                <div className="text-gray-500 md:text-md">{country}</div > :
                                <div className="opacity-25">Valitse maa</div>
                              }
                              <div className="flex ">
                                {country ? <span onClick={() => setCountry(null)}
                                  className="text-md text-gray-300 pr-2 cursor-pointer ">X</span> : null}

                                <span className="inset-y-0 border-l pl-1 cursor-pointer"
                                  onClick={() => setDropdown(!dropdown)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div style={visibleDrop} className="border rounded-sm col-span-6 bg-white mt-4">
                            {countries.sort().map(country =>
                              <p className="p-1 pl-2 text-gray-700 hover:bg-gray-500 hover:text-white cursor-pointer"
                                onClick={() => handleCountry(country)} key={country}
                              >{country}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button type="button" onClick={handletPersonalInfo}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                        Tallentaa</button>
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
                  <h2 className="text-xl font-medium leading-6 text-gray-900">Vaihda salasana</h2>
                  <p className="mt-1 text-sm text-gray-600">Suosittelemme, että vaihdat salasanasi vähintään kaksi kertaa vuodessa.</p>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <form >
                  <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                    <div className="px-4 py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 md:col-span-4">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Vanha salasana</label>
                          <input name="oldPassword" id="oldPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" {...oldPassword.params}
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                        </div>
                        <div className="col-span-6 md:col-span-4">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Kirjoita vanha salasana uudelleen
                            <span className="text-sm text-gray-300 pl-2">{
                              oldPasswordConfirm.params.value === oldPassword.params.value && oldPasswordConfirm.params.value.length > 7 ? '(salasanat vastaavat)' : ''}</span></label>
                          <input name="oldPasswordConfirm" id="oldPasswordConfirm" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" {...oldPasswordConfirm.params}
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                        </div>
                        <div className="col-span-6 md:col-span-4">
                          <label className="block text-sm font-medium text-gray-700 pl-2">Uusi salasana<span className="text-sm text-gray-300 pl-2">
                            {oldPassword.params.value === newPassword.params.value && newPassword.params.value.length > 7 ?
                              '(Uusi salasana ei voi olla sama kuin vanha)' : ''}</span></label>
                          <input name="newPassword" id="newPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  {...newPassword.params}
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                      <button type="button" onClick={handlePasswordChange}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                        Tallentaa</button>
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
                  <h2 className="text-xl font-medium leading-6 text-gray-900">Poista profiilini</h2>
                </div>
              </div>
              <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
                <div className="shadow overflow-hidden md:rounded-md rounded-b-md">
                  <div className="px-4 py-5 md:p-6 bg-gradient-to-br from-gray-300 via-white to-gray-300 ">
                    <div className="grid grid-cols-6 gap-6">
                      <p className="col-span-6 mt-1 p-2 text-lg text-gray-600">
                        Varmista, että todella tarvitset tai haluat profiilisi poistettavan, kaikki tiedot menetetään sen tekemisen jälkeen.</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-400 text-right md:px-6">
                    <button type="button" onClick={() => setShowModal(!showModal)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:bg-gray-300 focus-within:outline-none focus-within:ring-1">
                      Poista</button>
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={showConfirmationModal}>
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <button className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(!showModal)}  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-start justify-between p-1 pl-4 pb-2 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-700">Poistetaan profiilia</h3>
                </div>
                <div className="relative pl-4 pr-4 pt-4 flex-auto">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 md:mx-0 md:h-10 md:w-10">
                    <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-center text-gray-500 text-md p-2 leading-relaxed">
                    Haluatko varmasti poistaa tilisi? Kaikki tietosi poistetaan pysyvästi. Tätä toimintoa ei voi kumota.
                  </p>
                </div>
                <div className="flex items-center justify-end p-3 pr-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-24 md:text-md"
                  type="button" onClick={() => setShowModal(!showModal)} >Peruuttaa</button>
                  <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-24 md:text-md"
                  type="button" onClick={() => handleProfileRemoval()} >Poista</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditFormFin