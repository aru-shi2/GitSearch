import { useState,useEffect } from 'react'
import './App.css'
import { FaXTwitter,FaLocationDot,FaLink,FaBuilding } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

function App() {
  const [Username, setUsername] = useState("")
  const [Details, setDetails] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [error, seterror] = useState("")

    const fetchData=async () => {
        if(Username){
          try{
            setLoading(true)
            const data=await fetch(`https://api.github.com/users/${Username}`)
          if(data.status===404){
            throw new Error("Not Found!!");
          }
          const res=await data.json()
          setDetails(res)
          setLoading(false)
          console.log(res)
        } catch (err) {
        seterror(err.message)
        setLoading(false)
      }
        }
         else{
        alert("Enter username!!")
    }
    }  

  return (
    <>
      <div className="box">
        <h1>GitSearch</h1>
        <div className="content">
          <div className="input">
            <input onChange={(e)=>setUsername(e.target.value)} value={Username} type="text" placeholder='Enter username...' />
            <button onClick={fetchData} >Search</button>
          </div>
          <div className="data">
            {Loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {Details && (
               <div>
                <div className="img">
                  <img src={Details.avatar_url} alt="" />
                </div>
                <div className="content">
                  <div className="name">
  <span id="name">{Details.name}</span>
  <a id='login' href={Details.html_url}>@{Details.login}</a>
  <span id="bio">{Details.bio}</span>
</div>

<div className="follow">
  <span><h4>Followers</h4> {Details.followers}</span>
  <span><h4>Following</h4> {Details.following}</span>
  <span><h4>Repos</h4> {Details.public_repos}</span>
</div>
                  <div className="bottom">
                  {Details.location &&  <span><FaLocationDot /> {Details.location}</span>}
                  {Details.email &&  <span><MdOutlineEmail /> {Details.email}</span>}
                  {Details.twitter_username &&  <span><FaXTwitter /> {Details.twitter_username}</span>}
                  {Details.blog &&  <span><FaLink/><a href={Details.blog}>{Details.blog}</a></span>}
                  {Details.company &&  <span><FaBuilding /> {Details.company}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
