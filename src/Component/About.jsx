import React from 'react'

const About = () => {
  const list = ['useState','useEffect','reactjs routing','prop drilling','fetch api']
  return (
    <div className="about-container">
        <h2>ReactJs Concepts used</h2>
        <ul>
          {
            list.map(item=>(
              <li className="color-grey">{item}</li>
            ))
          }
        </ul>

        <h2>Json server</h2>
        <span className="color-grey">Json server is a fake rest api, useful for frontend developers</span>

        <h2>LocalStorage</h2>
        <h2>Axios</h2>
        <span className="color-grey">
        Promise based HTTP client for the browser and node.js
        </span>

        <h2>Firebase datastore</h2>
        <span>firebase is a backend service provider, which is easy and simple to use, it provdies various services such as authentication, database , etc</span>
    </div>
  )
}

export default About