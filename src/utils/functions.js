const handleError = (error) => {
  if (import.meta.env.MODE === 'development') {
    console.error(error)
  }
}

const handleLog = (log) => {
  if (import.meta.env.MODE === 'development') {
    console.log(log)
  }
}

const generatePassword = () => {
  const chars = '0123456789'
  let password = ''
  for (let i = 0; i < 7; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

export { handleError, handleLog, generatePassword }
