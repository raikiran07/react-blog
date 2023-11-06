import React from 'react'
import 'react-toastify/dist/ReactToastify.css';



const NewPost = ({title,setTitle,summary,setSummary,body,setBody,addPost}) => {
  
  return (
    <div className="form-container">
      <form onSubmit={addPost}>
        <div>
        <label htmlFor="title">
          <input type="text" id="title" className="input-field color-grey" 
          placeholder="Enter title here"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
           />
        </label>
        </div>
        
        <div>
        <label htmlFor="summary">
          <input type="text" id="summary" className="input-field color-grey" 
          placeholder="Enter summary here..."
          value={summary}
          onChange={(e)=>setSummary(e.target.value)}
          required
           />
        </label>
        </div>
        <div>
        <label htmlFor="body">
          <textarea type="text" id="body" 
          style={{fontFamily:"sans-serif"}}
          className="input-field color-grey h-200" 
          placeholder="Enter body here..."
          value={body}
          onChange={(e)=>setBody(e.target.value)}
          required
           ></textarea>
        </label>

        </div>
        
        

        <button type="submit" className="submit-btn">
          submit
        </button>
        
      </form>
     
    </div>
  )
}

export default NewPost