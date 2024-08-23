import "./style.css";
import { useEffect, useState, useRef } from "react";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // traz os usuarios
  async function getUsers() {
    const usersFromAPI = await api.get('/usuarios');

    setUsers(usersFromAPI.data);
   
  }

  // cadastra os usuarios
  async function createUsers() {
    await api.post('/usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,

    })
    getUsers()
   
  }


  //deleta usuarios

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`,{
    

    })
    getUsers()
   
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>Cadastro de Usuários</h1>
      <form>
        <input name="name" type="text" placeholder="Nome" ref={inputName} />
        <input name="age" type="number" placeholder="Idade"ref={inputAge} />
        <input name="email" type="email" placeholder="Email"ref={inputEmail} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={()=>deleteUsers(user.id)}>
              <img src={Trash} alt="Delete" />
            </button>
          </div>
        ))
      ) : (
        <p>Carregando usuários...</p>
      )}
    </div>
  );
}

export default Home;
