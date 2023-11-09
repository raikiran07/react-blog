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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {db} from './firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'








function App() {


  console.log(import.meta.env.VITE_API_KEY)
  const now = new Date()
  const time = dateFormat(now,"dd mmm,yyyy")
  
  const navigate = useNavigate()


  


  const [posts,setPosts] = useState([])

  const [title,setTitle] = useState('')
  const [summary,setSummary] = useState('')
  const [body,setBody] = useState('')
  const [id,setId] = useState(1)

  const [searchText,setSearchText] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [loading,setLoading] = useState(true)

  //setting firebase database
  const [dummyUsers,setDummyUsers] = useState([])

  const collectionRef = collection(db,"posts")

  


  //set and save functionality
  const setAndSave = (updatedPosts) => {
    setPosts(updatedPosts)
    // localStorage.setItem('posts',JSON.stringify(updatedPosts))
}


  const addPost = async(e) => {
    e.preventDefault()
    const date = dateFormat(now,"dd mmm,yyyy")
   
    const newPost = {
        
        title,
        date,
        summary,
        body
    }

    await addDoc(collectionRef,{...newPost})

    const updatedPosts = [...posts,newPost]
   
    setAndSave(updatedPosts)

    
      toast.success("successfully posted");
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
      const fetchData = async () => {
        try {
          const data = await getDocs(collectionRef)
        
          setPosts(data.docs.map(doc=>({...doc.data(),id:doc.id})))
          
          
        } catch (error) {
          console.log(error)
        }
        finally{
          setLoading(false)
        }
      }

      //firebase database
     fetchData()

  },[])

  const handleDelete = async(id) => {

    try {

      const updatedPosts = posts.filter(post=>post.id!=id)
      const currentDoc = doc(db,"posts",id)
      await deleteDoc(currentDoc)
      
      
     
        toast.success("Successfully deleted")
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
         ToastContainer={ToastContainer}
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
         collectionRef={collectionRef}
        db={db}
         
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
