import React from 'react'

const Form = ({searchText,setSearchText}) => {
  return (
    <form onSubmit={(e)=>e.preventDefault()}>
        <label style={{display:"none"}} htmlFor='search'>search</label>
        <input id="search"
        type="text"
         placeholder="search post.."
        value={searchText}
        autoFocus
        onChange={(e)=>setSearchText(e.target.value)}
        className="color-grey"
       
        />
    </form>
  )
}

export default Form