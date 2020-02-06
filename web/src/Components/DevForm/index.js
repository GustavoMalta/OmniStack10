import React, {useState, useEffect} from 'react';
import './styles.css'

function DevForm({ onSubmit }){
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github, setgGithub] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() =>{ //recebe duas funções, {}qual função executar e []quando executar 
    navigator.geolocation.getCurrentPosition(
    (position) =>{ //caso retorne sucesso
      let {latitude, longitude} = position.coords;
      console.log(latitude +' '+ longitude);
      
      //document.getElementById('Lat').value = latitude; //programação decalrativa
      
      setLatitude(Number((latitude).toFixed(11))); //programação imperativa
      setLongitude(longitude.toString().substring(0,11));
    },
    (err) =>{ //caso retorne erro
      console.log(err);
    },
    {
      timeout:3000, //passa parametros apra o getcurrentposition
    }
  )
  },[]);

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
      github,
      techs,
      latitude,
      longitude,
    });
    
    setgGithub('');
    setTechs('');

  }


  return(
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="GitName">Usuario do Github</label>
        <input 
          name="GitName" 
          id="GitName" 
          required
          value={github}
          onChange={g=>setgGithub(g.target.value)}/>
      </div>
      <div className="input-block">
        <label htmlFor="Techs">Tecnologias</label>
        <input 
          name="Techs" 
          id="Techs" 
          required
          value={techs}
          onChange={t=>setTechs(t.target.value)}/>
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="Lat">Latitude</label>
          <input 
            //type="number" 
            name="Lat" 
            id="Lat" 
            required 
            value={latitude}
            onChange={l=>setLatitude(l.target.value)}/> 
        </div>
        <div className="input-block">
          <label htmlFor="Lon">Longitude</label>
          <input 
            //type="number" 
            max="20"
            name="Lon" 
            id="Lon" 
            required 
            value={longitude}
            onChange={l=>setLongitude(l.target.value)}/> 
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;