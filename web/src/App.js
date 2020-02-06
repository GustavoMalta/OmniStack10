import React,{ useState, useEffect }from 'react';
import logo from './logo.svg';
import './App.css';
import './global.css';
import './sidebar.css';
import './main.css';
import Header from './Header';
import api from "./services/api";
import DevItem from "./Components/DevItem"
import DevForm from "./Components/DevForm";



// Componente = função retornando HTML
// Propriedade = Atributos como em HTML passando por parametros
// Estado = informações mantidas pelo componente (imutabilidade)


function App() {
  return (
    <>
      <Header title="Dashboard" />
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}
function NovoApp(){
  
  const [devs, setDevs] = useState([]);

    useEffect(() =>{
      async function loadDevs(){
        const response = await api.get('/devs');
        setDevs(response.data);
      } 
      loadDevs();
    },[]);

  async function handleDev(data){
    const response = await api.post('/devs',data);

    setDevs([...devs,response.data])
    console.log(response.data);
  }

  async function handleDelete(data){
    console.log(data._id)
    const response = await api.delete('/devs/'+data._id);
    
    if(response.status==200){
      const response = await api.get('/devs');
      setDevs(response.data);

      console.log(response.data);
    }
    console.log(response.status);
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleDev}/>
      </aside>
    <main>
      <ul>
        {devs.map(dev =>(
          <DevItem onDelete={handleDelete} key={dev._id} dev={dev} />
        ))}
        
      </ul>
    </main>
    </div>
  )

}
export default NovoApp;
