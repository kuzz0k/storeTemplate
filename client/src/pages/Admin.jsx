import React from 'react'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'

const Admin = () => {
  return (
    <div>
      <CreateType />
      <CreateBrand />
      <CreateDevice />
    </div>
  )
}

export default Admin