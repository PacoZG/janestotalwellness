import { useTranslation } from 'react-i18next'

export const getAge = dateOfBirth => {
  const birthday = new Date(dateOfBirth)
  const today = new Date()
  var age = today.getFullYear() - birthday.getFullYear()
  var m = today.getMonth() - birthday.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--
  }
  return age
}

export const getBMI = (height, weight, t) => {
  const heightSquare = Math.pow(height / 100, 2)
  const bmi = Number(weight / heightSquare).toFixed(1)
  if (bmi < 18.5) {
    return bmi + t('helper.BMI.Under')
  }
  if (bmi >= 18.5 && bmi < 24.9) {
    return bmi + t('helper.BMI.Normal')
  }
  if (bmi >= 25 && bmi < 29.9) {
    return bmi + t('helper.BMI.Over')
  }
  if (bmi >= 30 && bmi < 34.9) {
    return bmi + t('helper.BMI.ObesityI')
  }
  if (bmi >= 35 && bmi < 39.9) {
    return bmi + t('helper.BMI.ObesityII')
  }
  if (bmi >= 40) {
    return bmi + t('helper.BMI.ObesityIII')
  }
}

export const getDate = objectDate => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const date = new Date(objectDate)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const time = hours + ':' + minutes + ':' + seconds
  const creationDate =
    weekDays[date.getDay()] + ', ' + day + '.' + months[date.getMonth()] + '.' + date.getFullYear() + ' @' + time
  return creationDate
}

export const getCountries = () => {
  const { t } = useTranslation()
  const countries = t('Countries')
  return countries.split(',')
}
