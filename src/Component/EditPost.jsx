import React from 'react'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDoc, getDocs, doc } from 'firebase/firestore'

const EditPost = ({posts,setPosts,collectionRef,db}) => {

  // console.log(posts)

const navigate = useNavigate()

const {id} = useParams()
const post = posts.filter(post=>post.id==id)
// console.log(post)
const {title,summary,body,date} = post[0]

const [editTitle,setEditTitle] = useState(title)
const [editSummary,setEditSummary] = useState(summary)
const [editBody,setEditBody] = useState(body)

const updatePost = async(e,id) => {
    e.preventDefault()
    const newData = {
        title:editTitle,
        date,
        summary:editSummary,
        body:editBody
    }

    // const res = await axios.put(`${API_URL}/${id}`,newData)
    const currentPost = doc(db,"posts",id)

    await updateDoc(currentPost,{...newData})
    
    const data = await getDocs(collectionRef)
        
    setPosts(data.docs.map(doc=>({...doc.data(),id:doc.id})))
   
    
    toast.success("Successfully edited")
    // const response = await axios.get(API_URL)

    navigate('/')
   
    
   
}




// console.log(id)
  return (
    <div className="form-container">
      <form onSubmit={(e)=>updatePost(e,id)}>
        <div>
        <label htmlFor="title">
          <input type="text" id="title" className="input-field color-grey" 
          placeholder="Enter title here"
          value={editTitle}
          onChange={(e)=>setEditTitle(e.target.value)}
          required
           />
        </label>
        </div>
        
        <div>
        <label htmlFor="summary">
          <input type="text" id="summary" className="input-field color-grey" 
          placeholder="Enter summary here..."
          value={editSummary}
          onChange={(e)=>setEditSummary(e.target.value)}
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
          value={editBody}
          onChange={(e)=>setEditBody(e.target.value)}
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

export default EditPost