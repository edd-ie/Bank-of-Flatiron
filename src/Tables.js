import React, {useEffect,useState} from "react";


export default function Table(){
    const [originalContent, setOriginalContent] = useState([]);
    const [filteredContent, setFilteredContent] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/transactions')
        .then((response)=>response.json())
        .then((data) => {
            setOriginalContent(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },[])

    const handleSelect = (type)=>{
        let value = type.target.value;
        if (value === "Category") {
            setFilteredContent(originalContent);
        } else {
            let filtered = originalContent.filter((item) => item.category === value);
            setFilteredContent(filtered);
        }
    }

    const displayTable = (filteredContent.length > 0 ? filteredContent : originalContent).map((row)=>{
        return (
            <tr key={row.id}> 
                <td>{row.description}</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td>{row.category}</td>
            </tr>
        )
    })

    return(
        <div>
            <select onChange={e => handleSelect(e)}>
                <option value="Category">All</option>
                <option value="Income">Income</option>
                <option value="Food">Food</option>
                <option value="Fashion">Fashion</option>
                <option value="Gift">Gift</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Housing">Housing</option>
            </select>            
            <table id="table">
                <caption>Transaction History</caption>
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>CATEGORY</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTable}
                </tbody>            
            </table>
        </div>
    )
}

