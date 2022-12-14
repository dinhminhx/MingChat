import React from 'react'
import { useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const { dispatch } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)

  const searchUser = async () => {
    const q = query(collection(db,"users"),where("displayName","==",userName))
  try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setError(true)
    }
  } 
  
  const handleKeyDown = (e) => {
    e.code === "Enter" && searchUser();
  }

  const handleSelect = async () => {
    dispatch({type:"CHANGE_USER",payload: user })
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db,"chats",combinedId))
      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]})
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })

        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
      }
    } catch (error) {
    }
  setUser(null)
  setUserName('')
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user"
        onChange={(e) => { setUserName(e.target.value) }}
        onKeyDown={handleKeyDown}
        value={userName}
        />
      </div>
      {error && <span>User not found</span>}
      {user && <div className="userChats" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatsInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search