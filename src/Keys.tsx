import { render } from '@testing-library/react';
import { copyFile } from 'fs';
import { get } from 'https';
import { useState,useEffect } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [array,setArray] = useState(props.initialData)
    const [id,setId] = useState(0)
    useEffect(()=>{
        let copy = array.slice(0)
        if (props.sorting==="ASC") {
            setArray(copy.sort((a, b) => a.id > b.id ? 1 : -1));
        } else {
            setArray(copy.sort((a, b) => a.id < b.id ? 1 : -1));
        }
    }, [props.sorting]) 

    function save(event:any, index:any) {
        if (event.key==="Enter") {
            const copy = Object.assign({}, array);
            copy[index].name = event.target.value;
            setId(0);
        }
    }

    function cancel(event:any) {
        if (event.keyCode===27) {
            setId(0);
            const copy = Object.assign({}, array);
        }
    }

    return <ul>{array.map((a, index)=>{
        let element
        if (a.id===id)
            element = <input key={a.id} onKeyDown={(event)=>cancel(event)} onKeyPress={(e)=>save(e,index)}  defaultValue={a.name}></input>
        else 
            element = <span key={a.id} onClick={()=>setId(a.id)}>{a.name}</span>
        return <li key={a.id}>{element}</li>
    }) }</ul>
}
