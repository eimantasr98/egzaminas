import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './CreatedClients.module.css';

const END_POINT = 'http://localhost:4000/clients';

export default function CreatedClients({action}) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get(END_POINT)
    .then((res) => {
      setClients(res.data);
    })
    .catch((err) => console.log(err))
  }, [])


  return (
    <div>
        {
          clients.map((client) => {
            return <form onSubmit={action} key={client._id} className={styles.createdClient}>
              <h4>{client.name + ' ' + client.surname}</h4>
              <p>{client.email}</p>
              <p>{client.phone}</p>
              <button type='submit'>Delete Client</button>
            </form>
          })
        }
        
          
    </div>
  )
}
