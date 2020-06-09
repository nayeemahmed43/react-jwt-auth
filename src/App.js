import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLogin,setIsLogin] = useState(false);
  console.log(email, password);

  const login = () => {
    const loginData = {email,password}
        fetch('https://admin.barikoi.xyz:8090/auth/login',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        })
        .then(res => {
          res.json().then((result => {
            console.warn("result",result);
            setIsLogin(result.success);
            if(!result.success)alert(result.message);
            localStorage.setItem('login',JSON.stringify({
              login: true,
              token: result.token
            }))
            
          }))
        })
  }
  return (
    <div className="App">
      <h1>React Authentication using JWT </h1>
      {
        !isLogin ? 
        <div>
           <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/> <br/><br/>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/> <br/><br/>
        <button onClick={login}>Login</button>
        </div>
        :
        <div>
         <h3 style={{color:"green"}}>Congratulations!!</h3>
         <h3 style={{color:"green"}}>Login Successfull</h3>
        </div>
      }
      
    </div>
  );
}

export default App;
