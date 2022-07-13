const Notification = ({ notification }) => {
  const { message, status } = notification
  if (message === null) {
    return null
  }
  console.log(`message: ${message}, status: ${status}`)
  return (
    <div className={`notification ${status}`}>{message}</div>
  )
}

export default Notification