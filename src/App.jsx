import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';
import IconPlus from './assets/IconPlus.svg';
import IconExcluir from './assets/IconExcluir.svg';
import IconVisualizar from './assets/IconVisualizar.svg';
import IconCarregar from './assets/Carregando.svg';
import IconBuscar from './assets/IconeBuscar.svg';

function App() {
  const [tasks, setTasks] = useState([]);
  const [carregandoId, setCarregandoId] = useState(null);
  const [buscar, setBuscar] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const deleteTask = (id) => {
    setCarregandoId(id);
    setTimeout(() => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      setCarregandoId(false);
    }, 1500);
  };

  const handleSearch = (e) => {
    setBuscar(e.target.value);
  };

  const filtroListas = tasks.filter((task) => 
    task.code.toString().includes(buscar) ||
    task.name.toLowerCase().includes(buscar.toLowerCase()) ||
    task.cor.toLowerCase().includes(buscar.toLowerCase())
  );

  const getStatusClass = (status) => {
    console.log('status:',status);
    if (status === "Sem estoque") return "status-sem-estoque";
    if (status === "Em estoque") return "status-verde";
    if (status === "Em trânsito") return "status-transito";
    return "status-verde";
  };

  return (
    <>
      <div className='DivTabelaBuscar'>
        <h3>Tabela de Motos</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <img className='IconBuscar' src={IconBuscar} alt="IconBuscar" />
            <input
              type="text"
              className='inputBuscar'
              placeholder='Buscar por código, nome e cor'
              value={buscar}
              onChange={handleSearch}
              
            />
          </div>
          
          <Link to="/adicionar">
            <button className='btnAdd'>
              <img src={IconPlus} alt="IconPlus" />
              Novo Registro
            </button>
          </Link>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', padding: '25px 50px' }}>
        {filtroListas.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '80px', fontSize:'20px',color:'rgba(231, 227, 252, 1)'}}>A lista está vazia, adicione novas motos...</p>
        ) : (
          filtroListas.map((task) => (
            <div key={task.id} className='ItemMoto'>
              <div style={{ display: 'flex', alignItems: 'center', gap: '98px', background: 'rgba(49, 45, 75, 1)' }}>
                <div className='DivCodigo'>
                  <h3>#{task.code}</h3>
                </div>
                <div className='DivInfo'>
                  <div className='DivNomeStatus'>
                    <h4>{task.name}</h4>
                    <span className={getStatusClass(task.status)}>{task.status}</span>
                  </div>
                  <p>Valor: R$ {task.valor}</p>
                  <p>Cor: {task.cor.toUpperCase()}</p>
                </div>
              </div>
              <div className='DivBtns'>
                <button onClick={() => deleteTask(task.id)} className='btnExcluir'>
                  {carregandoId === task.id ? (
                    <img src={IconCarregar} alt="IconExcluir" className='efeitoIcon' />
                  ) : (
                    <img src={IconExcluir} alt="IconExcluir" />
                  )}
                </button>
                <div>
                  <Link className='linkEditar' to={`/editar/${task.id}`}>
                    <img src={IconVisualizar} alt="IconVisualizar" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
