import './Tables.css';
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


    const handleSubmit = (e)=>{
        e.preventDefault();
        let form = e.target;
        let value = form.elements[0].value;

        let filtered = originalContent.filter((item) => item.category.toLowerCase() === value.toLowerCase());
        setFilteredContent(filtered);

        form.reset()
    }

    function quickSort(array){
        if(array.length <=1) return array;
        let start = array[0];
        let left = array.filter(x=>x<start);
        let right = array.filter(x=>x>start);
        return [...quickSort(left), start,...quickSort(right)];
    }

    function sortByCategory(data){
        let group = {}, sorted = [];

        // Grouping by category
        for (let item of data){
            (group[item.category])?group[item.category].push(item):
            group[item.category] = [item];
        }
        
        
        // Sorting by category without in-built methods
        let key = [...quickSort(Object.keys(group))]
        
        for(let values of key){
            for(let items in group[values]){
                sorted.push(group[values][items]);
            }
        }
        
        return sorted;
    }

    function handleDelete(target){
        let confirmation = prompt("Do you want to delete this item? \nY/N")
        confirmation = confirmation.toLocaleLowerCase()
        return (confirmation === "y" || confirmation ==="yes")?target.parentElement.remove():""
    }

    const displayTable = (filteredContent.length > 0 ? filteredContent : originalContent).map((row)=>{
        return (
            <tr key={row.id} onClick={(e)=>handleDelete(e.target)}> 
                <td>{row.description}</td>
                <td>{row.date}</td>
                <td>{row.amount}</td>
                <td>{row.category}</td>
            </tr>
        )
    })

    return(
        <div>
            <div  id="filter">
                <form className="filter1" onSubmit={(e)=>handleSubmit(e)}>                    
                    <input type="text" placeholder="Filter by category" />
                    <button type="submit">
                        <span class="material-symbols-outlined">
                            filter_alt
                        </span>
                    </button>
                </form>
                <div className="filter2">
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
                    <button onClick={() => setFilteredContent(originalContent)}>
                        reset
                    </button>
                </div>
            </div>
            <button onClick={() => setFilteredContent(sortByCategory(originalContent))} id='sort'>
                <span class="material-symbols-outlined">
                    sort_by_alpha
                </span>
            </button>           
            <table id="table">
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

