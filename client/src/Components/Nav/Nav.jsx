import React,{useState,useEffect} from 'react';
import Logo from "../Asserts/logo.png";
import "./Nav.css"
import { NavLink } from 'react-router-dom';
import Wallet from '../../wallet/Wallet';
function Nav({state}) {
  const[owner,setOner]=useState() 
  const[accout,setAccount]=useState(); 
  const [show,setShow]=useState(false);
  useEffect(() => {
    async function getData() {
      const { contract,web3 } = state;
        const result = await contract.methods.getowner().call();
        setOner(result);
        const conected=await web3.eth.getAccounts();
        setAccount(conected[0]);
      }
      getData();
    }, [state]);
    console.log(show)
    useEffect(()=>{
      function show(){
        if(accout===owner){
          setShow(true)
}else{
  setShow(false)
}
}
show();
},[accout,owner])


  return (
    <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
      <a className="navbar-brand" href="/"><img className='logo' style={{width:"4rem",height:"3rem",marginLeft:"2rem"}} src={Logo} alt="logo" /> </a>
    <Wallet/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 m-auto mb-lg-0" style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
          <li className="nav-item" style={{width:"fit-content"}}>
            <NavLink className="nav-link " style={{width:"fit-content"}} id='navcol' aria-current="page" to="/">Donate</NavLink>
          </li>
          <li className="nav-item"style={{width:"fit-content"}}>
            {show?    <NavLink className="nav-link " style={{width:"fit-content"}}id='navcol' to="/People">Record</NavLink>
        :" "    }
            </li>

        </ul>
        <p className='owner' ><b>Owner Address: </b>{owner}</p>
      </div>
    </div>
  </nav>
  )
}

export default Nav