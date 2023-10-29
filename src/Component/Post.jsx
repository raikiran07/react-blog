import React from 'react'
import PostPage from './PostPage'
import {Link} from 'react-router-dom'

const Post = ({post}) => {
  const {id,title,summary,date,body} = post
  
  return (
    <div className="post-container">
        <h2>{title}</h2>
        <span className="sm-date color-grey">{date}</span>
        <Link to={`/post/${id}`} className="link-item color-grey"  element={<PostPage />}>
        <p>{`${summary}  ...read more`}</p>
        </Link>
        
        

    </div>
  )
}

export default Post