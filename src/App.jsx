import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Component/Header'
import Nav from './Component/Nav'
import Footer from './Component/Footer'
import Home from './Component/Home'
import NewPost from './Component/NewPost'
import PostPage from './Component/PostPage'
import Missing from './Component/Missing'
import About from './Component/About'
import Edit from './Component/EditPost'
import {Route,Routes,useNavigate} from 'react-router-dom'
import dateFormat, { masks } from "dateformat";
import axios from 'axios'





function App() {

  const now = new Date()
  const time = dateFormat(now,"dd mmm,yyyy")
  
  const navigate = useNavigate()

  const API_URL = 'http://localhost:3500/posts'
  


  const [posts,setPosts] = useState([])

  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [body,setBody] = useState('')
  const [id,setId] = useState(1)

  const [searchText,setSearchText] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [loading,setLoading] = useState(true)

  

  

  //set and save functionality
  const setAndSave = (updatedPosts) => {
    setPosts(updatedPosts)
    localStorage.setItem('posts',JSON.stringify(updatedPosts))
}


  const addPost = async(e) => {
    e.preventDefault()
    const date = dateFormat(now,"dd mmm,yyyy")
    const id = posts.length ? posts[posts.length-1].id + 1 : 1
    const newPost = {
        id,
        title,
        date,
        summary,
        body
    }

    const updatedPosts = [...posts,newPost]
    // setPosts(updatedPosts)
    setAndSave(updatedPosts)
    const res = await axios.post(API_URL,newPost)
    setTitle('')
    setSummary('')
    setBody('')
    navigate('/')


  }

  

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(searchText.toLowerCase())
      || ((post.title).toLowerCase()).includes(searchText.toLowerCase()) || ((post.summary).toLowerCase()).includes(searchText.toLowerCase())) 

      // console.log(filteredResults)
      setSearchResults(filteredResults.reverse());

      

      


  }, [posts, searchText])

  useEffect(()=>{
      const fetchData = async (url) => {
        try {
          const res = await axios.get(url)
          const data = await res.data
          // console.log(data)
          localStorage.setItem('posts',JSON.stringify(data))
          setPosts(data)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }

      fetchData(API_URL)
  },[])

  const handleDelete = async(id) => {

    try {

      const updatedPosts = posts.filter(post=>post.id!=id)
      
      const res = await axios.delete(`${API_URL}/${id}`)
      setAndSave(updatedPosts)
      // console.log(res)
      navigate('/')
      
    } catch (error) {
      console.log(error.message)
    }
    
   

  }

  const editPost = (id) => {
      navigate(`/post/edit/${id}`)
    }

  
  return (
    <div className="container">
      <div className="sticky-container">
      <Header />
      <Nav 
      searchText = {searchText}
      setSearchText = {setSearchText}
      />
      </div>
      
      <Routes>
        <Route  path='/' element={<Home posts={searchResults}
         loading={loading}
        />}/>
        <Route exact path='/post' element={<NewPost
        
        title={title}
        setTitle={setTitle}
        summary={summary}
        setSummary={setSummary}
        body={body}
        setBody={setBody}
        addPost={addPost}
         />} />
         <Route exact path='/post/edit/:id' element={<Edit
         posts = {posts}
         editPost = {editPost}
         setPosts={setPosts}
         setAndSave={setAndSave}
         API_URL={API_URL}
         />}/>
        <Route exact path='/post/:id' element={<PostPage 
         posts = {posts}
         handleDelete={handleDelete}
        setAndSave={setAndSave}
         editPost = {editPost}
        />} />
        <Route exact path='/about' element={<About/>} />

        <Route path='*' element={<Missing/>} />

      </Routes>
        
     
      <Footer />
      
     
    </div>
  )
}

export default App
