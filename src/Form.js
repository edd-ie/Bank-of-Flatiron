import './Form.css';
import React, {useState} from "react";

function Form(){

    const [choice, setChoice] = useState('')
    const [showForm, setShowForm] = useState(false)
    
    const handleNewTransaction = ()=>{
        setShowForm(true);
    }

    const handleSelect = (type)=>{
        setChoice(type.target.value)
    }

    const handleSubmit=(e)=>{
        console.log("submitted");

        let formData = e.target.getElementsByTagName("input");
        let description = formData[0].value;
        let date = formData[1].value;
        let amount = formData[2].value;
        
        let data = {
            "date": date,
            "description": description,
            "category": choice,
            "amount": amount
        }
        console.log("file: Form.js:27 -> handleSubmit -> data:", data);
        
        if(description===''|| date ==='' || amount==='' || choice===''){
            e.preventDefault();
            alert("Fields cannot be empty")
            return 0
        }
        else{
            console.log('posting');
            fetch('http://localhost:3000/transactions',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }) 
            .then((response) => response.json())
            .then((data) => {
            console.log("Post request successful:", data);
            })
            
            e.target.reset();
        }      

    }


    return(
        <>
            {!showForm &&(
            <button onClick={handleNewTransaction} id='newBtn'>New Transaction</button>)}
            {showForm &&(
                <form onSubmit={e => handleSubmit(e)} action="" id='newInput'>
                    <title>New Transaction</title>
                    <input type="text" placeholder="description" />
                    <input type="date" placeholder="date" />
                    <input type="number" placeholder="amount" />
                    <select onChange={e => handleSelect(e)}>
                        <option value="Category">Category</option>
                        <option value="Income">Income</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Gift">Gift</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Housing">Housing</option>
                    </select>
                    <input type="submit" />
                </form>
            )}
        </>
    )
}


export default Form