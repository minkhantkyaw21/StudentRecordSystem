import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
export default function ViewDetails(){
    const {studentid}=useParams(); 
    const [studentData,setStudentData]=useState({});
    useEffect(()=>{
        fetch('http://localhost:8000/students/'+studentid)
        .then((res)=>res.json())
        .then((data)=>setStudentData(data))
        .catch((err)=>console.log(err.message));         
    },[])
    return(
        <div className="container">
            <h1 className="detail-header">Student Details</h1>
            {
            studentData && <div className="details">
                <p><strong>ID: </strong>{studentData.id}</p>
                <p><strong>Name: </strong>{studentData.name}</p>
                <p><strong>Address: </strong>{studentData.address}</p>
                <p><strong>Phone: </strong>{studentData.phone}</p>
            </div>
            }
            <Link to="/" className="btn btn-back details">Back</Link>
        </div>
       
    )
}