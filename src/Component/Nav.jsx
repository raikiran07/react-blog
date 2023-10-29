import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Form from './Form'

const Nav = ({searchText,setSearchText}) => {
    
  return (
    <nav>
        <Form 
        searchText = {searchText}
        setSearchText={setSearchText}
         />
        <ul className="list-container">
            <li className="listItem">
                <Link  className="link-item"  to="/">Home</Link>
            </li>
            <li className="listItem">
                <Link className="link-item"  to='/post'>Post</Link>
            </li>
            <li className="listItem">
                <Link className="link-item" to="about">About</Link>
            </li>

        </ul>
    </nav>
  )
}

export default Nav