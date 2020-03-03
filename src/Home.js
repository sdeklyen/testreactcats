import React, {useState, useEffect} from 'react'; 
import {Button, Form, Table} from 'reactstrap';
import CatUpdate from './CatUpdate'; 

const Home = () => {

    let [cat, setCat] = useState([])
    let [catName, setCatName] = useState('');
    let [catAge, setCatAge] = useState('');
    let [catColor, setCatColor] = useState('');
    let [catMedicine, setCatMedicine] = useState(''); 
    let [catOtherInfo, setCatOtherInfo] = useState(''); 
    let [updateActive, setUpdateActive] = useState(false);
    let [catToUpdate, setCatToUpdate] = useState({})

    let handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://testreactserver.herokuapp.com/cat/add', {
            method: 'POST', 
            body: JSON.stringify({
                catName: catName, 
                catAge: catAge, 
                catColor: catColor, 
                catMedicine: catMedicine, 
                catOtherInfo: catOtherInfo}), 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then((logData) => {
            setCatName('');
            setCatAge('');
            setCatColor('');
            setCatMedicine('');
            setCatOtherInfo('');
        })
    }

    const fetchCats = () => {
        fetch('https://testreactserver.herokuapp.com/cat', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setCat(data)})
        }
        useEffect(() => {
            fetchCats();
          }, [])

        const deleteCat = (cat) => {
            fetch(`https://testreactserver.herokuapp.com/cat/${cat.catName}`, {
                method: 'DELETE', 
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            .then(() => fetchCats())
        }

        const editCatUpdate = (bet) => {
            setCatToUpdate(bet);
            console.log(bet);
        }
    
        const updateOn = () => {
            setUpdateActive(true)
        }
    
        const updateOff = () => {
            setUpdateActive(false)
        }

        

    return (
        <div className="Home">
        <h1>Cats Haven</h1>
        <br />
        <br />
        <h4>Cat Log</h4>
        <Form onSubmit={handleSubmit}>
        <label className = 'display-block' htmlFor='catName'>Cat's Name</label>
        <input className='display-block' type='text' name='catName' value={catName} onChange={(e) => setCatName(e.target.value)} />
        <br />
        <label className = 'display-block' htmlFor='catAge'>Cat's age</label>
        <input className='display-block' type='text' name='catAge' value={catAge} onChange={(e) => setCatAge(e.target.value)} />
        <br /> 
        <label className='display-block' htmlFor='catColor'>Cat's color</label>
        <input className='display-block' type='text' name='catColor' value={catColor} onChange={(e) => setCatColor(e.target.value)} />
        <br />
        <label className='display-block' htmlFor='catMedicine'>Cat's medicine</label>
        <input className='display-block' type='text' name='catMedicine' value={catMedicine} onChange={(e) => setCatMedicine(e.target.value)} />
        <br />
        <label className='display-block' htmlFor='catOtherInfo'>Other info about cat</label>
        <input className='display-block' type='text' name='catOtherInfo' value={catOtherInfo} onChange={(e) => setCatOtherInfo(e.target.value)} />
        <br />
        <button type="submit">Submit Cat</button>
        </Form>
        <h3>Our cats</h3>
        <Table>
            <thead>
                <tr>
                    <th>Cat</th>
                    <th>Age</th>
                    <th>Color</th>
                    <th>Medicine</th>
                    <th>Other Info</th>
                </tr>
            </thead>
                {cat.map((cat, index) => { 

                    return (
                        <tbody>
            <tr>
                    <th scope="row">{cat.catName}</th>
                    <td>{cat.catAge}</td>
                    <td>{cat.catColor}</td>
                    <td>{cat.catMedicine}</td>
                    <td>{cat.catOtherInfo}</td>
                    <td>
                        <Button color="warning" onClick={() => {editCatUpdate(cat); updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => deleteCat(cat)}>Delete</Button>
                    </td>
                </tr>
            </tbody>
                    )
                })}
        </Table>
        <button type='button' onClick={fetchCats}>Show Cats</button>
        {updateActive ? <CatUpdate catToUpdate={catToUpdate} 
        // With this ternary I am controlling whether the modal I use to update the bets appears or not. If updateActive is true, Bet Update is to pop up with the betToUpdate, updateOff, and getBets functions written earlier are all being used in the Bet Update file and the token needed to update the bet is being passed to the file as well. If I am not updating, nothing appears as it is just a closed div with nothing inside.
        
      updateOff={updateOff} fetchCats={fetchCats}/> : <></>} 
        </div>
    )

}

export default Home