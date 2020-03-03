import React, {useState} from 'react'; 
import {Table} from 'reactstrap';

const Log = () => {

    let [cat, setCat] = useState([])

    const fetchCats = () => {
        fetch('http://localhost:3001/cat', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setCat(data)})
        }

    return (
        <div className="Log">
        
        </div>
    )
}

export default Log