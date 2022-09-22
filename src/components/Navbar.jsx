import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const handleSignOut = () => {
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      showConfirmButton: false,
      timer: 1500
    })
    signOut(auth)
  }
  return (
    <div className="navbar">
      <div className="logo">Ming Chat</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleSignOut }> Logout </button >
      </div>
    </div>
  )
}

export default Navbar