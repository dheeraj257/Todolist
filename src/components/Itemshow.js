import React from 'react'

const Itemshow = ({currElem,edit,deleteItem}) => {
    return (
        <div className="row listitem" key={currElem.id}>
            <h4 className="col-lg-8">{currElem.name}</h4>
            <button className='col-lg-2 btn btn-warning edit' onClick={() => edit(currElem.id)} >Edit</button>
            <button className='col-lg-2 btn btn-danger delete' onClick={() => deleteItem(currElem.id)}>Delete</button>
        </div>
    )
}

export default Itemshow