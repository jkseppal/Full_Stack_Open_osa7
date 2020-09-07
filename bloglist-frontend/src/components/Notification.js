import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  }

  if (notification === '') {
    return null
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification