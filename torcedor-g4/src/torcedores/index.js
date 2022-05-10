import React from "react";
import { Table } from "reactstrap";
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import '../login'
import jwt from "jwt-decode"
import { useNavigate } from "react-router-dom";



function Torcida(){
 
    const Torcedores = ({ torcedores }) => {
      return (
        <div className='divTable'>
  
          <Table hover borderless responsive className='teste'>
  
            <thead> 
              <tr>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Nome
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Idade
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Sexo
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px","borderRightWidth": "1px", "borderRightRadius": "10px", 'borderBottomColor': "#666666",'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Faixa Etaria
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Associação
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Actions
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666", "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                  Prioridade
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666","borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666",'borderStyle': 'solid' }}>
                  Time Do Coração 1º
                </th>
                <th style={{ "borderBottomWidth": "1px", "borderBottomRadius": "10px", 'borderBottomColor': "#666666",'borderStyle': 'solid' }}>
                  Time Do Coração 2º
                </th>    
              </tr>
            </thead>

            <tbody>
              {torcedores.map((torcedor, key) => {
                return (<tr key={key}>
                  <td style={{ "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                    {torcedor.name}
                  </td>
                  <td style={{ "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                    {torcedor.idade}
                  </td>
                  <td style={{ "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                    {torcedor.sexo}
                  </td>
                  <td style={{ "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666","borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                    {torcedor.faixa_etaria}
                   </td>
                  <td style={{ "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid' }}>
                    {torcedor.socio_torcedor ?
                      <button className='Positivo'> Positivo </button> :
                      <button className='Negativo'> Negativo </button>}
                  </td>     
                  <td style={{  "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid'}}>
                    <button disabled={user.cargo != "admin" && user.cargo != "diretor" ? true : false} className='Negativo' onClick={() => deleteTorcedor(torcedor)}> Delete </button>
                    <button disabled={user.cargo != "admin" && user.cargo != "diretor" ? true : false} id="Edit" className='modal-button' onClick={() => handelEditTorcedor(torcedor)}> Edit </button>
                  </td>
                  <td style={{  "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid'}}>
                    {torcedor.premium_torcedor ?  
                     <button className='Positivo'> Positivo </button> :
                     <button className='Negativo'> Negativo </button>}
                   </td>
                   <td style={{  "borderRightWidth": "1px", "borderRightRadius": "10px", 'borderRightColor': "#666666", 'borderStyle': 'solid'}}>
                    {torcedor.time_of_hearth[0]}  
                   </td>   
                   <td>
                   {torcedor.time_of_hearth[1]}
                   </td>
                </tr>)
              })}
            </tbody>
          </Table>     
        </div>
      )
    }
   
    const [user, setUser] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false)
  
    function handleOpenModal() {
      setIsOpen(true)
    }
    function handleCloseModal() {
      setIsOpen(false)
    }
  
    const initialValue = {
      name: '',
      cpf: '',
      idade: 0,
      sexo: '',
      socio_torcedor: false,
      premium_torcedor:false,
      faixa_etaria: '',
      time_of_hearth: ['','']   
    }
  
    const [values, setValues] = useState(initialValue);
  
    function onChange(ev) {
      const { name, value } = ev.target;
      setValues({ ...values, [name]: value });
    }
  
    function onChangeTimeOfKokoro(value,index) {
      let time_of_hearth = values.time_of_hearth
      time_of_hearth[index] = value
      setValues({ ...values,time_of_hearth});
    }
  
    function onSubmit(ev) {
      values.idade = parseInt(values.idade)
      console.log(values)
      axios.post("http://localhost:3333/torcedores", values)
    }
  
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false)
  
    function handleOpenModalEdit() {
      setIsOpenEdit(true)
    }
  
    function handleCloseModalEdit() {
      setIsOpenEdit(false)
    }
  
    const [modalIsOpenRelatorio, setIsOpenRelatorio] = useState(false)
  
    function handleOpenModalRelatorio() {
      setIsOpenRelatorio(true)
    }
  
    function handleCloseModalRelatorio() {
      setIsOpenRelatorio(false)
    }

    
    let navigate = useNavigate();
   
    function handleLogout() {
      localStorage.removeItem("token"); // quando sair o token vai deslogar
      axios.defaults.headers.token = undefined;
      navigate("/"); // quando deslogar vai para pagWeb do login
      console.log(navigate)
    }
  
    async function getTorcedores() {
      const response = await axios.get("http://localhost:3333/torcedores")
      setTorcedores(response.data);
    };
  
    function setNumberOfPartnerFans() {
      const partnerFans = torcedores.filter((torcedor) => {
        return torcedor.socio_torcedor === true
      })
      setNumberOfPartner(partnerFans.length)
    }
  
  
  
    function setMasculineFans() {
      const masculineFans = torcedores.filter((torcedor) => {
        return torcedor.sexo === "Masculino"
      })
      setNumberOfMasculineFans(masculineFans.length)
  
    }
  
    function setWomenFans() {
      const womenFans = torcedores.filter((torcedor) => {
        return torcedor.sexo === "Feminino"
      })
      setNumberOfWomenfans(womenFans.length)
    }
  
    function setChildFans() {
      const ChildFans = torcedores.filter((torcedor) => {
        return torcedor.faixa_etaria === "Criança"
      })
      setNumberOfChildsFans(ChildFans.length)
    }
  
    function setTeenagerFans() {
      const tennagerFans = torcedores.filter((torcedor) => {
        return torcedor.faixa_etaria === "Adolescente"
      })
      setNumberOfTennager(tennagerFans.length)
    }
  
    function setAdultsFans() {
      const adultsFans = torcedores.filter((torcedor) => {
        return torcedor.faixa_etaria === "Adulto"
      })
      setNumberOfAdults(adultsFans.length)
    }
  
    function setElderlyFans() {
      const elderlyFans = torcedores.filter((torcedor) => {
        return torcedor.faixa_etaria === "Idoso"
      })
      setNumberOfElderly(elderlyFans.length)
    }
  
    function setLgbtFans() {
      const lgbtFans = torcedores.filter((torcedor) => {
        return torcedor.sexo === "LGBTQIA+"
      })
      setNumberOfLgbt(lgbtFans.length)
    }
  
    function setPremiumFans() {
      const premiumFans = torcedores.filter((torcedor) => {
        return torcedor.premium_torcedor === true
      })
      setNumberOfPremium(premiumFans.length)
    }
  
   
    function handelEditTorcedor(torcedor) {
      setSelectedTorcedor(torcedor);
      handleOpenModalEdit();
    }
  
    async function myFunction() {
      const response = await axios.get(`http://localhost:3333/${nameOfTeamFilter}/CountOfHearth`)
       setCountFavoritesTeams(response.data)
      console.log(countFavoritesTeams[0].timecoluna1) 
    }
  
    async function loginFunction() {
      const response = await axios.post("http://localhost:3333/authenticate", {
        name:"",
        senha:"",
        cargo:"",
      })
    }
  
    async function editTorcedor() {
      console.log(axios.defaults.headers.token)
      const response = await axios.put("http://localhost:3333/torcedores", {
        id: selectedTorcedor.id,
        name: selectedTorcedor.name,
        idade: parseInt(selectedTorcedor.idade),
        sexo: selectedTorcedor.sexo,
        socio_torcedor: selectedTorcedor.socio_torcedor,
        premium_torcedor: selectedTorcedor.premium_torcedor,
        time_of_hearth: selectedTorcedor.time_of_hearth,
      })
      setSelectedTorcedor({});
      getTorcedores();
    };
  
    async function deleteTorcedor(torcedor) {
      const response = await axios.delete(`http://localhost:3333/torcedores/${torcedor.id}`);
      getTorcedores();
    }
  
    const [torcedores, setTorcedores] = useState([]);
    const [selectedTorcedor, setSelectedTorcedor] = useState({});
    const [numberOfPartner, setNumberOfPartner] = useState(0);
    const [numberOfMasculineFans, setNumberOfMasculineFans] = useState(0);
    const [numberOfWomenFans, setNumberOfWomenfans] = useState(0);
    const [numberOfChildFans, setNumberOfChildsFans] = useState(0);
    const [numberOfTennager, setNumberOfTennager] = useState(0);
    const [numberOfAdults, setNumberOfAdults] = useState(0);
    const [numberOfLgbt, setNumberOfLgbt] = useState(0);
    const [numberOfElderly, setNumberOfElderly] = useState(0);
    const [numberOfPremium, setNumberOfPremium] = useState(0);
    const [nameOfTeamFilter, setNameOfTeamFilter] = useState("");
    const [countFavoritesTeams, setCountFavoritesTeams] = useState("")

    useEffect(() => {
      const token = localStorage.getItem("token")
      axios.defaults.headers.token = JSON.parse(token);
      setUser(jwt(token));
      console.log(jwt(localStorage.getItem("token")))
      getTorcedores();
    }, [])
    useEffect(() => {
      const token = localStorage.getItem("token")
      axios.defaults.headers.token = JSON.parse(token);
      setUser(jwt(token));
      setNumberOfPartnerFans();
      setMasculineFans();
      setWomenFans();
      setAdultsFans();
      setElderlyFans();
      setChildFans();
      setLgbtFans();
      setTeenagerFans();
      setPremiumFans();
    }, [torcedores])
  
    return (
      <div className="App">
        <header className="container">
      
          <Torcedores torcedores={torcedores}></Torcedores>
          <div className='sideTable'>
            <button onClick={handleLogout}>Sair</button>
            <button disabled={user.cargo != "admin" ? true : false} className='modal-button' onClick={handleOpenModal}> + Adicionar Torcedor </button>
            <Modal isOpen={modalIsOpen}
              onRequestClose={handleCloseModal} >
              <div className="CreateInputName">
                <form onSubmit={onSubmit} className="FormuCreate">
                  <div className='InputCreate'>
                    <div className="CreateInputName">
                      <label htmlFor="title">Name:</label>
                      <input id="name" name="name" type="text" onChange={onChange} />
                    </div>
                    <div className="CreateInputCpf">
                      <label htmlFor="title">CPF:</label>
                      <input pattern="\d{3}.\d{3}.\d{3}-\d{2}" id="cpf" name="cpf" type="text" onChange={onChange} />
                    </div>
                    <div className="CreateInputSexo">
                      <label htmlFor="title">Sexo:</label>
                      <input list='sexos' id="sexo" name="sexo" type="text" onChange={onChange} />
                      <datalist id='sexos'>
                        <option value='Masculino'/>
                        <option value='Feminino'/>
                        <option value='LGBTQIA+'/>
                      </datalist>
                    </div>
                    <div className="CreateInputIdade">
                      <label htmlFor="title">Idade:</label>
                      <input id="idade" name="idade" type="number" onChange={onChange} />
                    </div>
                    <div className="CreateInputSocioTorcedor">
                      <label className='labelCreateSocio' htmlFor="title">SocioTorcedor</label>
                      <input checked={values.socio_torcedor} id="socio_torcedor" name="socio_torcedor" type="checkbox" onChange={() => { setValues({ ...values, socio_torcedor: !values.socio_torcedor}) }}/>
                    </div>
                    <div className="CreateInput">
                      <label className='labelCreatePremium' htmlFor="title">Premium</label>
                      <input checked={values.premium_torcedor} id="premium_torcedor" name="premium_torcedor" type="checkbox" onChange={() => { setValues({ ...values, premium_torcedor: !values.premium_torcedor}) }}/>
                    </div>
               
                    <div className="CreateInputTimeDoKokoro">
                      <label className='labelTimeDoCoração' htmlFor="title">Time do Coração 1º:</label>
                      <input list='times' id="time_of_hearth" name="time_of_hearth" type="text" onChange={(ev) => onChangeTimeOfKokoro(ev.target.value,0)}/>
                      <datalist id="times">
                        <option value="Flamengo"/>
                        <option value="São Paulo"/>
                        <option value="Real Madrid"/>
                        <option value="Santos"/>
                        <option value="Ceara"/>
                        <option value="Fortaleza"/>
                        <option value="Atletico Mineiro"/>
                        <option value="Atletico Paranaese"/>
                        <option value="Palmeiras"/>
                        <option value="Internacional"/>
                        <option value="Sport"/>
                        <option value="Bahia"/>
                        <option value="Juventude"/>
                        <option value="Juventus"/>
                        <option value="Barcelona"/>
                        <option value="PSG"/>
                        <option value="Baya de Munique"/>
                        <option value="Chelsa"/>
                        <option value="Bragantino"/>
                        <option value="America Mineiro"/>
                        <option value="Atletico Goianense"/>
                        <option value="Avai"/>
                        <option value="Botafogo"/>
                        <option value="Corinthians"/>
                        <option value="Coritiba"/>
                        <option value="Cuiabá"/>
                        <option value="Fluminense"/>
                        <option value="Goiás"/>
                        <option value="Brasil"/>
                        <option value="Argentina"/>
                        <option value="Alemanha"/>
                        <option value="França"/>
                        <option value="Portugal"/>
                      </datalist>
                      <label className='labelTimeDoCoração' htmlFor="title">Time do Coração 2º:</label>
                      <input list='times' id="time_of_life" name="time_of_hearth" type="text" onChange={(ev) => onChangeTimeOfKokoro(ev.target.value,1)}/>
   
                    </div>
                
                  </div>
                  <div>
                    <button className='buttonCreateModal' type="submit">Salvar</button>
                  </div>
                </form>
              </div>
            </Modal>
  
            <Modal isOpen={modalIsOpenEdit}
              onRequestClose={handleCloseModalEdit}  >
              <div className="Conten">
                <form className="FormuEdit">
                  <div className='EditInput'>
                    <div id='EditInputName'>
                      <label>Name:</label><br />
                      <input
                        type="text" value={selectedTorcedor.name} onChange={(event) => { setSelectedTorcedor({ ...selectedTorcedor, name: event.target.value }) }}>
                      </input>
                    </div>
                    <div id='EditInputSexo'>
                      <label>Sexo:</label><br />
                      <input
                        list='sexos' value={selectedTorcedor.sexo} onChange={(event) => { setSelectedTorcedor({ ...selectedTorcedor, sexo: event.target.value }) }}></input>
                        <datalist id='sexos'>
                        <option value='Masculino'/>
                        <option value='Feminino'/>
                        <option value='LGBTQIA+'/>
                      </datalist>
                    </div>
                    <div id='EditInputIdade'>
                      <label>Idade:</label><br />
                      <input
                        value={selectedTorcedor.idade} onChange={(event) => { setSelectedTorcedor({ ...selectedTorcedor, idade: event.target.value }) }}>
                      </input>
                    </div>
                    <div id='EditInputSocioTorcedor'>
                      <label className='labelSocioTorcedor'>SocioTorcedor</label><br />
                      <input
                        type="checkbox" checked={selectedTorcedor.socio_torcedor} onChange={(event) => {
                          console.log(event.target.value)
                          setSelectedTorcedor({ ...selectedTorcedor, socio_torcedor: !selectedTorcedor.socio_torcedor })
                        }}>
                      </input>
                    </div>
                    <div id='EditInputSocioTorcedor'>
                      <label className='labelSocioTorcedor'>Premium</label><br />
                      <input
                        type="checkbox" checked={selectedTorcedor.premium_torcedor} onChange={(event) => {
                          console.log(event.target.value)
                          setSelectedTorcedor({ ...selectedTorcedor, premium_torcedor: !selectedTorcedor.premium_torcedor })
                        }}>
                      </input>
                    </div>
                    <div id='EditTimeDoKokoro'>
                    <label>Time 1º</label><br />
                      <input
                        list='times' value={selectedTorcedor.time_of_hearth ? selectedTorcedor.time_of_hearth[0] : ''}  onChange={(event) => { 
                          const time_of_hearth = selectedTorcedor.time_of_hearth
                          time_of_hearth[0] = event.target.value
                          setSelectedTorcedor({ ...selectedTorcedor, time_of_hearth}) }}>
                      </input>
                      <datalist id="times">
                        <option value="Flamengo"/>
                        <option value="São Paulo"/>
                        <option value="Real Madrid"/>
                        <option value="Santos"/>
                        <option value="Ceara"/>
                        <option value="Fortaleza"/>
                        <option value="Atletico Mineiro"/>
                        <option value="Atletico Paranaese"/>
                        <option value="Palmeiras"/>
                        <option value="Internacional"/>
                        <option value="Sport"/>
                        <option value="Bahia"/>
                        <option value="Juventude"/>
                        <option value="Juventus"/>
                        <option value="Barcelona"/>
                        <option value="PSG"/>
                        <option value="Baya de Munique"/>
                        <option value="Chelsa"/>
                        <option value="Bragantino"/>
                        <option value="America Mineiro"/>
                        <option value="Atletico Goianense"/>
                        <option value="Avai"/>
                        <option value="Botafogo"/>
                        <option value="Corinthians"/>
                        <option value="Coritiba"/>
                        <option value="Cuiabá"/>
                        <option value="Fluminense"/>
                        <option value="Goiás"/>
                        <option value="Brasil"/>
                        <option value="Argentina"/>
                        <option value="Alemanha"/>
                        <option value="França"/>
                        <option value="Portugal"/>
                      </datalist>
                    </div>
                    <div id='EditTimeOfHearth'>
                      <label>Time 2º</label><br />
                      <input
                        list='times' value={selectedTorcedor.time_of_hearth ? selectedTorcedor.time_of_hearth[1] : ''} onChange={(event) => { 
                          const time_of_hearth = selectedTorcedor.time_of_hearth
                          time_of_hearth[1] = event.target.value
                          setSelectedTorcedor({ ...selectedTorcedor, time_of_hearth}) }}>
                      </input>
                    </div>
                  </div>
                  <button disabled={user.cargo != "admin" && user.cargo != "diretor" ? true : false} className='buttonEditModal' onClick={editTorcedor}>Salvar</button>
                </form>
              </div>
            </Modal>
            <div className='relatorios'>
              <div className='relatorio'>
                <p className='titleRelatorio'>Socio Torcedor</p>
                <h3 className='valueRelatorio'>{numberOfPartner}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Masculinos</p>
                <h3 className='valueRelatorio'>{numberOfMasculineFans}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Femininos</p>
                <h3 className='valueRelatorio'>{numberOfWomenFans}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Crianças</p>
                <h3 className='valueRelatorio'>{numberOfChildFans}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Adolecentes</p>
                <h3 className='valueRelatorio'>{numberOfTennager}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Adultos</p>
                <h3 className='valueRelatorio'>{numberOfAdults}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Idosos</p>
                <h3 className='valueRelatorio'>{numberOfElderly}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores LGBTQIA+</p>
                <h3 className='valueRelatorio'>{numberOfLgbt}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'>Torcedores Premium</p>
                <h3 className='valueRelatorio'>{numberOfPremium}</h3>
              </div>
            </div>
            <button className='modal-button' onClick={handleOpenModalRelatorio}> + Relatorios </button>
            <Modal isOpen={modalIsOpenRelatorio}
              onRequestClose={handleCloseModalRelatorio}>
                 <div className='relatorio'>
                <p className='titleRelatorio'> Quantidade de torcedores que tem como numero 1° o time {nameOfTeamFilter}</p>
                <h3 className='valueRelatorio'>{countFavoritesTeams[0] ? countFavoritesTeams[0].timecoluna1 : "0"}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'> Quantidade de torcedores que tem como numero 2° o time {nameOfTeamFilter}</p>
                <h3 className='valueRelatorio'>{countFavoritesTeams[0] ? countFavoritesTeams[0].timecoluna2 : "0"}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'> Quantidade de torcedores que tem como numero 1° e 2° o time {nameOfTeamFilter}</p>
                <h3 className='valueRelatorio'>{countFavoritesTeams[0] ? countFavoritesTeams[0].coluna1e2 : "0"}</h3>
              </div>
              <div className='relatorio'>
                <p className='titleRelatorio'> Quantidade de torcedores que tem como numero 1° ou 2° o time {nameOfTeamFilter}</p>
                <h3 className='valueRelatorio'>{countFavoritesTeams[0] ? countFavoritesTeams[0].ambascoluna : "0"}</h3>
              </div>
              <input className='inputRelatorioTimes' onChange={(event) => {setNameOfTeamFilter(event.target.value)}}></input>        
              <button className='buttonRelatorioModal' onClick={myFunction}> Filtrar Time</button>         
            </Modal>           
          </div>       
        </header>
      </div>
    );
  }

export default Torcida;