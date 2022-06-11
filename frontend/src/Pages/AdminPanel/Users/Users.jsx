import "./users.scss"
import React from 'react'

import useGetUsers from '../../../hooks/queries/useGetUsers'

function Users() {

  // fetch and cache all users
  const {data: users} = useGetUsers()
  console.log(users);

  return (
    <div>Users</div>
  )
}

export default Users