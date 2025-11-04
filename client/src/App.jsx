/*eslint-disable*/
import React, { useEffect,useState} from "react";
import getWeb3 from "./getWeb3";
import Donation from "./contracts/Donation.json"
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import People from "./Components/People/People";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [state, setState] = useState({web3: null,contract: null});
  
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        
        const deployedNetwork = Donation.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Donation.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Please connect with wallet first");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
   <>
   {/* <People state={state} /> */}
   <BrowserRouter>
   <Nav state={state}/>
      <Routes>
        <Route path="/" element={<Home state={state} />} />
        <Route path="/People" element={<People state={state} />} />
       
    
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
