import React from 'react';
import styles from './Form.module.css';



export default function Form({action, userName, setUserName, password, setPassword}) {

  return (
    <form onSubmit={action} className={styles.loginForm}>
        <label htmlFor="userName">User Name:</label>
        <br />
        <input type="text" id='userName' value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <br />
        <button type='submit'>Login</button>
    </form>
  )
}


