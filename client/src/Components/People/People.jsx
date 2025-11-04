import React, { useState, useEffect } from 'react';
import "./People.css";
import Web3 from 'web3';
function People({ state }) {
  const [data, setData] = useState([]); // Initialize data with an empty array
  const [response,setResponxe]=useState()
  const web3= new Web3()
  useEffect(() => {
    
    async function getData() {
      const { contract } = state;
        const result = (await contract.methods.getowner().call()).toLowerCase().trim();
        // const results= result.toLowerCase().trim()
         console.log("Oner of contract is ",result)
         const {web3}=state;
const account=(await web3.eth.getAccounts())
const accounts=account[0].toLowerCase().trim()
console.log("connected account is",  accounts)
if(result===accounts){
  const { contract } = state;
  const result = await contract.methods.getData(accounts).call();
  setData(result);
  console.log("Retrieved data:", result);
}else{
  setResponxe("you are not the onwer of this NGO Donation only ower can access this panal")
  console.error("Error retrieving data:");

}
    }
    getData();
  }, [state]);
  return (
    <>
    <div className="container-fluid">
    <div className="people">
      

      <h1 className='record' >Donation Record</h1>
         { response?<p className='text-center' >you are not the onwer of this NGO  only owner can access this panal </p>:<table className='conta'>
            <tr className='row1' >
      <th className='name' >Name</th>
      <th className='money' >Money</th>
      <th className='time' >Date,Time</th>
      <th className='from' >From</th>
      <th className='message' >Message</th>
      
            </tr>
            {data.map((items, index) => (
      
      <tr className='row2' key={index} >
          <td>{items.name}</td>
          {/* <td>{items.money}</td> */}
          <td>{web3.utils.fromWei(items.money, 'ether')} ETH</td>
          <td>{new Date(parseInt(items.time) * 1000).toLocaleString()}</td>
      
          {/* <td>{items.time}</td> */}
          <td>{items.from}</td>
          <td>{items.message}</td>
        </tr>
      
              ))}
              </table>}
              </div>
    </div>
    </>
  );
}
export default People;
