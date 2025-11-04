import React,{useState,useEffect} from 'react'
import "./Form.css"
function Form({state}) {
  const [ address,setAddress]=useState("No account Connected yet");
  const [name,setName] =useState();
  const [money,setMoney] =useState();
  const [message,setMessage] =useState();
  useEffect(()=>{
    async function getAccount(){
const {web3}=state;
const account=await web3.eth.getAccounts()
console.log(account[0])
const accounts=account[0].toLowerCase().trim()
setAddress(accounts);
    }
    if (state.web3) {
      getAccount();
    }
  }, [state]);

async function handle(e) {
    e.preventDefault();
    const { contract, web3 } = state;
    if (contract) {
      console.log(contract)
      try {
        await contract.methods.send(name, message)
          .send({ from: address, value: web3.utils.toWei(money, "ether") });
          window.alert("success")

        // Donation sent successfully, you can show a success message or perform other actions
      }
       catch (error) {
        window.alert(error.message)
        console.error("Error sending donation:", error);
      }
    }
  }
  

  return (

  <div className="card">
    <div style={{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100%",gap:"2rem"}}  ><h1 style={{color:"black"}} className='heading'  > Donte today to save tomarrow</h1>
<p className='dis' > <b style={{color:"white"}}>No one is UseLess in this world who lightens the burdens of another.</b></p></div>
     <form   onSubmit={handle} >
    <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name:</label>
    <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}  className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label"> Your Address: </label>
    <span> {address}</span>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Money:</label>
    <input type="number" placeholder='Money' value={money} onChange={(e)=>setMoney(e.target.value)}  className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Message:</label>
    <input type="text" placeholder='Message' className="form-control input " id="exampleInputEmail1" aria-describedby="emailHelp" value={message} onChange={(e)=>setMessage(e.target.value)} />
  </div>
<p style={{textAlign:"center"}} >  <button type="submit" className="btn btn-primary">Donate</button></p>
</form>
  </div>
  )
}

export default Form