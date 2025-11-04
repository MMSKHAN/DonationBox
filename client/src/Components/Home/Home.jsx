import React from 'react'
import Form from "../Form/Form"

import "./Home.css";
function Home({state}) {
  return (
      <>
<div className="home"></div>
<Form state={state} />
</>
  )
}

export default Home