import React from 'react'
import {useParams} from 'react-router-dom'


const PostPage = ({posts,handleDelete,editPost,setAndSave}) => {
  // console.log(posts)
  const {id} = useParams()
  
  
  const currentPost = posts.filter(post=>post.id==id)
  // console.log(currentPost)
  
  const {title,summary,body,date} = currentPost[0]
  // console.log(title,summary)

  
  

  return (
    <div className="post-container display-single-post">
      <h2>{title}</h2>
        <span className="sm-date color-grey">{date}</span>
       <p className="text-size">
        {body}
       </p>
       <div className="btn-container">
       <button className="btn delete" onClick={()=>handleDelete(id)}>delete</button>

       <button className="btn edit" onClick={()=>editPost(id)}>Edit</button>
       </div>
       
       

    </div>
  )
}

export default PostPage