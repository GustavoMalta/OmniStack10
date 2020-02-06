import React,  {useState} from 'react'
import './styles.css';
//import api from "...";

function DevItem({dev, onDelete}){
  /*async function handleDev(data){
    const response = await api.post('/devs',data);


    setDevs([...devs,response.data])
    console.log(response.data);
*/
    async function handleDelete(_id){
      //e.preventDefault();
      console.log(_id)
      await onDelete({
        _id
      });
      
    }

  

    return(
        <li className="dev-item">
        <button className="del-button" onClick={handleDelete.bind(this, dev._id)}>Delete</button>
        <header>
          <img src={dev.avatar_url} alt={dev.name}/>
          <div className="user-info">
            <div className="d-flex">
            <strong>{dev.name}</strong>
            </div>
            <span>{dev.techs.join(',')}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github}`}>Perfil no Github</a>
      </li>
    );
}

export default DevItem;