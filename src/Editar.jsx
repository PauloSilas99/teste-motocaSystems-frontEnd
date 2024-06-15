import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/index.css';
import IconPlus from './assets/IconPlus.svg';
import IconAt from './assets/IconAtualizar.svg';

function Editar() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [cor, setCor] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Em estoque');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === Number(id));
      if (taskToEdit) {
        setName(taskToEdit.name);
        setCode(taskToEdit.code);
        setCor(taskToEdit.cor);
        setValor(taskToEdit.valor.toString());
        setStatus(taskToEdit.status);
      }
    }
  }, [id]);

  const formatCurrency = (value) => {
    const onlyNumbers = value.replace(/\D/g, '');
    const numberValue = parseFloat(onlyNumbers) / 100;
    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleValorChange = (e) => {
    const { value } = e.target;
    setValor(formatCurrency(value));
  };

  const handleSave = () => {
    const task = { id: id ? Number(id) : Date.now(), code, name, cor, valor, status };
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (id) {
      tasks = tasks.map((t) => (t.id === Number(id) ? task : t));
    } else {
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    navigate('/');
  };

  return (
    <div>
      <div className='DivTabelaBuscar'>
        <h3>{id ? 'Editar' : 'Registro de Motos'}</h3>
      </div>

      <h3 style={{ textAlign: 'center', color: 'rgba(231, 227, 252, 1)' }}>
        {id ? 'Edite as informações que preferir! 📝' : 'Preencha as informações abaixo para registrar uma Moto 🏍️'}
      </h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <fieldset>
          <legend>Código</legend>
          {id ? (
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} disabled />
          ) : (
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required placeholder='#' />
          )}
        </fieldset>  

        <fieldset>
          <legend>Modelo da Moto</legend>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </fieldset>
        
        <fieldset>
          <legend>Cor</legend>
          <input type="text" value={cor} onChange={(e) => setCor(e.target.value)} required />
        </fieldset>

        <fieldset>
          <legend>Valor</legend>
          <input type="text" value={valor} onChange={handleValorChange} required />
        </fieldset>

        <fieldset>
          <legend>Status:</legend>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Em estoque">Em estoque</option>
            <option value="Sem estoque">Sem estoque</option>
            <option value="Em trânsito">Em trânsito</option>
          </select>
        </fieldset>
        {id ? (
          <button className='btnAddEdit' type="submit">
            <img src={IconAt} alt="IconPlus" />Atualizar
          </button>
        ) : (
          <button className='btnAddEdit' type="submit">
            <img src={IconPlus} alt="IconPlus" /> Registrar
          </button>
        )}
      </form>
    </div>
  );
}

export default Editar;
