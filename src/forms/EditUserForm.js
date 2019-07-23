import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { userId, value } = event.target

    setUser({ ...user, [userId]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>User Id</label>
      <input type="text" name="userId" value={user.userId} onChange={handleInputChange} />
      <label>Title</label>
      <input type="text" name="title" value={user.title} onChange={handleInputChange} />
      <label>Body</label>
      <input type="text" name="body" value={user.usernabodyme} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditUserForm
