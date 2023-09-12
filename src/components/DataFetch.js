import React, { useEffect, useState } from 'react'
import axios from 'axios';
function DataFetch() {

    const [data,updateData]=useState({});
    const [loading,setLoading]=useState(true);
    const [isError,updateError]=useState("");
    const [count,setCount]=useState(0)
    useEffect(()=>{
        axios.get("https://official-joke-api.appspot.com/random_joke")
        .then((resp)=>{
            setLoading(false)
            updateError("")
            updateData(resp.data);
        })
        .catch((error)=>{
           
            updateData({});
            setLoading(false)
            updateError("something went wrong")
        })
    },[count])

   
    
  return (
    <div>
        {
           loading?loading:((Object.keys).length===0)?"":<div><p>{data.setup}</p><p>{data.punchline}</p></div>
        }
        {isError?isError:null}
        <button onClick={()=>setCount(count+1)}>next joke</button>
    </div>
  )
}

export default DataFetch;