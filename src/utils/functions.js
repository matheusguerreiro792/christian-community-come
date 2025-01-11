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

export { handleError, handleLog }
