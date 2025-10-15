import React, { useEffect } from 'react'
import { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import banner from '../../../public/background_banner.jpg'
import { login, signup } from '../../../firebase'
import spinner from '../../assets/netflix_spinner.gif'
import { useSign } from '../../../context/signContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { signedIn, setSignedIn } = useSign()
  const navigate = useNavigate()
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (signState === 'Sign In') {
        let logged = await login(email, password)
        if (logged) setSignedIn(true)
      } else if (signState === 'Sign Up') {
        let signed = await signup(name, email, password)
        console.log(signed)
        if (signed) {
          setSignState('Sign In')
          setLoading(false)
          setEmail('')
          setPassword('')
          setName('')
        } else {
          setLoading(false)
        }
      }
    }catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  }
  useEffect(() => {
    if (signedIn) { 
      setLoading(false)
      navigate('/home')
    }
  }, [signedIn, navigate])
  if (loading) {
    return (
      <div className='loading-screen h-[100vh] w-full flex items-center justify-center'>
        <img src={spinner} alt='loading' className='w-30' />
      </div>
    )
  }
   return (
     <div className='login h-full  py-5 px-[8%]' style={{ backgroundImage: `linear-gradient(#0000007e,#0000007e),url(${banner})` }}>
      <img src={logo} className='w-38 ' />
      <div className='login-form w-full  max-w-113 bg-[rgba(0,0,0,0.75)] rounded p-15 m-auto '>
        <h1 className='text-3xl font-[500] mb-7'>{signState}</h1>
        <form className=''>
           {signState == 'Sign Up' ?  (
             <input type="text" onChange={(e) => { setName(e.target.value) }}
               placeholder='Your name'
               className='w-full bg-[#333] h-12 text-white my-3 mx-0 border-0 rounded py-4 px-5 text-lg  font-[500] placeholder:font-[500] placeholder:text-lg' />) : null}
           <input type="email" placeholder='Email Only' onChange={(e) => { setEmail(e.target.value) }}
             className='w-full bg-[#333] h-12 text-white my-3 mx-0 border-0 rounded py-4 px-5 text-lg  font-[500]' />
           <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}
             className='w-full bg-[#333] h-12 text-white my-3 mx-0 border-0 rounded py-4 px-5 text-lg  font-[500]' />
          <button onClick={handleSubmit} type='submit' className='w-full p-4 bg-[#e50914] text-white rounded text-lg font-[500] mt-4 cursor-pointer'>{signState}</button>
          <div className="form-help flex items-center justify-between text-[#b3b3b3] text-sm ">
            <div className="remember flex items-center gap-2">
              <input type="checkbox" id='remember' />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
         </form>
         <div className="form-switch mt-10 text-[#737373]">
           {signState==='Sign In'?(<p>New to Netflix? <span className='ml-2 text-white font-[500] cursor-pointer' onClick={()=>setSignState('Sign Up')}>Sign Up Now</span></p>):null}
           {signState==='Sign Up'?(<p>Already have account? <span className='ml-2 text-white font-[500] cursor-pointer' onClick={()=>setSignState('Sign In')}>Sign In Now</span></p>):null}         </div>
      </div>
    </div>
  )
}
export default Login
