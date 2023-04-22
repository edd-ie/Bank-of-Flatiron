import React, {useEffect,useState} from "react";


export default function Table(){
    const [content, setcontent] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/transactions')
        .then((response)=>response.json())
        .then((data) => {
            setcontent(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },[])

    const displayTable = content.map((row)=>{
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
    )
}
