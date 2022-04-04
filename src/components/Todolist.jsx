import React, { useEffect,useState } from 'react'
import "./style.css"

// how to get from local storage
const getLocalStorageData=()=>{
    const lists=localStorage.getItem("todolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}

const Todolist = () => {
const [inputData,setInputData]=useState("")
const [items,setItems]=useState(getLocalStorageData())
const [isEditItem,setEditItem]=useState("");
const [toggleButton,setToggleButton]=useState(false);


// adding state variable value in aaray
const addItem=()=>{
    if(!inputData){
        alert("Pass the Input")
    }else if(inputData&&toggleButton){
        setItems(
            items.map((currElem)=>{
                if(currElem.id===isEditItem)
                return {...currElem,name:inputData}
            return currElem;
            })
        )
        setInputData("")
        setToggleButton(false);
    }
    else{
        const getUniueData={
            id: new Date().getTime().toString(),
            name:inputData,
        }
        setItems([...items,getUniueData])
        setInputData("")
        setToggleButton(false);
    }
}
// edit the items
const edit=(id)=>{
  const item_edited=items.find((currElem)=>{
      return currElem.id===id;
  })
  setInputData(item_edited.name);
  setEditItem(id);
  setToggleButton(true);
}

// Deleting the item
const deleteItem=((id)=>{
        const updatedItem=items.filter((currElem)=>{
            return currElem.id!==id;
        })
        setItems(updatedItem);
})
// check Out
const removeAll=(()=>{
    setItems([]);//passing empty array to store nothing in array
})


// how to set data on local storage
useEffect(()=>{
    localStorage.setItem("todolist",JSON.stringify(items))
},[items])

  return (
    <>
    <div className="container">
        <div className="inputContainer">
            <input id='name' type="text" value={inputData} onChange={(e)=>setInputData(e.target.value)} placeholder='✍Add Items' />
            {(toggleButton ? <button className='add' onClick={addItem}>📝</button>:<button className='add' onClick={addItem}>➕</button>)}
        </div>
            {items.map((currElem)=>{
                return(
                 <div className="itemlist" key={currElem.id}>
                    <div className="item">{currElem.name}</div>
                    <button className='edit' onClick={()=>edit(currElem.id)} >📝</button>
                    <button className='delete' onClick={()=>deleteItem(currElem.id)}>❌</button>
                 </div>
                )
            })}
            <div className="checkOut">
                <button onClick={()=>removeAll()}>RemoveALl</button>
            </div>
    </div>
    </>
  )
}

export default Todolist