import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const loggedUser = useSelector(state => state.loggedUser)
  // console.log('LOGGED USER: ', loggedUser)
  const user = useSelector(state => state.users.find(user => user.id === loggedUser.id))
  // console.log('USER_PROFILE_INFO: ', user)

  const getAge = () => {
    const birthday = new Date(user.dateOfBirth)
    const today = new Date()
    var age = today.getFullYear() - birthday.getFullYear()
    var m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }
    return age
  }

  const getBMI = () => {
    const heightSquare = Math.pow(user.height / 100, 2)
    const bmi = Number(user.weight / heightSquare).toFixed(1)
    if (bmi < 18.5) {
      return bmi + ' (Bajo de peso)'
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return bmi + ' (Pero normal)'
    } else if (bmi >= 25 && bmi < 29.9) {
      return bmi + ' (Sobre peso)'
    } else if (bmi >= 30 && bmi < 34.9) {
      return bmi + ' (Obesidad clase I)'
    } else if (bmi >= 35 && bmi < 39.9) {
      return bmi + ' (Obesidad clase II)'
    } else if (bmi >= 40) {
      return bmi + ' (Obesidad clase III)'
    }
  }

  if (!user) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <p className="pr-2" >cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <h3 className="p-2 md:p-6 text-2xl text-center md:text-3xl font-medium text-gray-700 ">Perfil</h3>
        <div className="bg-white pb-2 m-2 mb-1 shadow overflow-hidden rounded-lg">
          <div className="p-3 md:p-1 md:pl-3">
            <h3 className="text-xl font-medium text-gray-900 pl-3 md:pl-6 md:py-3">Datos personales</h3>
          </div>
          <div className="border-t border-gray-300 border-b mb-3">
            <div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <div className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Nombre completo</div>
                <div className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.firstName} {user.lastName}</div>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Nombre de usuario</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.username}</dd>
              </div>

              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Email</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.email}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Dirección postal</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                  {user.address && user.zipCode && user.city ? user.address + ', ' + user.zipCode + ', ' + user.city : 'Not yet provided'}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">País</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.country}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Número móbil</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                  {user.mobileNumber ? user.mobileNumber : 'Not yet provided'}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Antecedentes</dt>
                <dd className="pr-4 pb-3 md:pt-4 text-lg text-justify">{user.background}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Metas</dt>
                <dd className="pr-4 pb-3 md:pt-4 text-lg text-justify">{user.goals}</dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white pb-2 m-2 mb-1 shadow overflow-hidden rounded-lg">
          <div className="p-3 md:p-1 md:pl-3 ">
            <h3 className="text-xl font-medium text-gray-900 pl-3 md:pl-6 md:py-3">Mis datos</h3>
          </div>
          <div className="border-t border-gray-300 border-b mb-3">
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Reporte de salud</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                {user.healthInfo ? user.healthInfo : 'Not yet provided'}</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Edad</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{getAge()} años</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Genero</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.gender}</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Altura</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.height} cm</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className=" pt-3 md:pt-4 text-lg font-medium text-gray-500">Peso</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.weight} kg</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">{'ICM aproximado (Indice de Masa Corporal)'}</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{getBMI()}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile