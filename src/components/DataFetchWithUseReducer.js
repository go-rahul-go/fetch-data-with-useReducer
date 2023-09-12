import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import "./comp.css"
const initialState = {
    loading: true,
    data: {},
    error: ""
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                data: {},
                error: "something went wrong"
            }
        
        default:
            return state;
    }
}
function DataFetchWithUseReducer() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [next,setNext]=useState(0)
    useEffect(() => {
        axios.get("https://dog.ceo/api/breeds/image/random")
            .then(resp => {
     
                dispatch({ type: 'FETCH_SUCCESS', payload: resp.data });
            })
            .catch(error => {
                dispatch({ type: "FETCH_ERROR" });
            })
    },[next])

    return (
        <div className='box'>
            {state.loading ? "loading" : <div className='img-box'><img src={state.data.message} alt="cute"/></div>}
            {state.error?state.error:""}
            <button onClick={()=>setNext(next+1)} id="btn">next image</button>
        </div>
    )
}

export default DataFetchWithUseReducer