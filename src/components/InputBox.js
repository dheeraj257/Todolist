import React from 'react'

const InputBox = ({toggleButton,inputData,setInputData,addItem}) => {
  return (
    <div className="row">
    <input id='name' className='col-lg-8' type="text" value={inputData} onChange={(e)=>setInputData(e.target.value)} placeholder='Add Items ✍' />
    {(toggleButton ? <button className='col-lg-4 btn btn-success' onClick={addItem}>Modify</button>:<button className='col-lg-4 add btn btn-primary' onClick={addItem}>Add</button>)}
</div>
  )
}

export default InputBox