import React from 'react'
import Post from './Post'


const Home = ({posts,loading,ToastContainer}) => {
  // console.log(posts)
  return (
    <div className="content-container">
      {
        !loading ? (
          posts.length ? ( posts.map((post)=>(
            <Post post={post} key={post.id} />
          ))) : <p>No post to show</p>
        ) : <p>Loading...</p>
      }
        
        <ToastContainer />
        
    </div>
  )
}

export default Home