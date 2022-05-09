import React, { useEffect, useState } from 'react'
import InputBox from './InputBox';
import Itemshow from './Itemshow';

import "./style.css"

// how to get from local storage
const getLocalStorageData = () => {
    const lists = localStorage.getItem("todolist");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todolist = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStorageData());
    const [isEditItem, setEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    // adding state variable value in aaray
    const addItem = () => {
        if (!inputData) {
            alert("Pass the Input")
        } else if (inputData && toggleButton) {
            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem)
                        return { ...currElem, name: inputData }
                    return currElem;
                })
            )
            setInputData("")
            setToggleButton(false);
        }
        else {
            const getUniueData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, getUniueData])
            setInputData("")
            setToggleButton(false);
        }
    }
    // edit the items
    const edit = (id) => {
        const item_edited = items.find((currElem) => {
            return currElem.id === id;
        })
        setInputData(item_edited.name);
        setEditItem(id);
        setToggleButton(true);
    }

    // Deleting the item
    const deleteItem = ((id) => {
        const updatedItem = items.filter((currElem) => {
            return currElem.id !== id;
        })
        setItems(updatedItem);
    })
    // check Out
    const removeAll = (() => {
        setItems([]);//passing empty array to store nothing in array
    })


    // how to set data on local storage
    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="col-lg-4 container">
                <InputBox addItem={addItem} inputData={inputData} setInputData={setInputData} toggleButton={toggleButton} />
                {items.map((currElem) => {
                    return (
                        <Itemshow edit={edit} deleteItem={deleteItem} currElem={currElem} />
                    )
                })}

            </div>
            {/* <div className="col-lg-4 container"> */}
                <div className=" clearall">
                    <button className='btn col-lg-1 btn-secondary' onClick={() => removeAll()}>RemoveALl</button>
                </div>
            {/* </div> */}
        </>
    )
}

export default Todolist