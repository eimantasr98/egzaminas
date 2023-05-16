import React from 'react';
import styles from '../Form/Form.module.css';


export default function NewClient({action, name, setName, surname, setSurname, email, setEmail, phone, setPhone}) {
  return (
    <form onSubmit={action} className={styles.loginForm}>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
        <br />
        <label htmlFor="surname">Surname:</label>
        <br />
        <input type="text" id='surname' value={surname} onChange={(e) => {setSurname(e.target.value)}}/>
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <br />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <br />
        <input type="text" id='phoneNumber' value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
        <br />
        <button type='submit'>Add Client</button>
    </form>
    
    
  )
}
