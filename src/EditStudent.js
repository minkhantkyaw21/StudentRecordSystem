import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function EditStudent(){
    const {studentid}=useParams(); 
    const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [validation,setValidation]=useState(false);
  const navigate =useNavigate();
    // const [studentData,setStudentData]=useState({});
    useEffect(()=>{
        fetch('http://localhost:8000/students/'+studentid)
        .then((res)=>res.json())
        .then((data)=>{
            setId(data.id);
            setName(data.name);
            setAddress(data.address);
            setPhone(data.phone);
    })
        .catch((err)=>console.log(err.message));         
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { id, name, address, phone };
        fetch("http://localhost:8000/students/"+studentid, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(studentData),
        })
          .then((res) => {
            alert("Student data updated successfullay!");
            navigate("/");
          })
          .catch((err) => console.log(err.message));
      };
    
    return (
        <div className="container">
        <h2>Edit Student Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <br />
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            required
            onChange={(e) => setId(e.target.value)} onMouseDown={()=>setValidation(true)}
          ></input>
          {id.length === 0 && validation && (
            <span className="errorMsg">Please Enter Student ID!</span>
          )}
          <br />
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)} onMouseDown={()=>setValidation(true)}
          ></input>
          {name.length === 0 && validation && (
            <span className="errorMsg">Please Enter Student Name!</span>
          )}
          <br />
          <label htmlFor="address">Address:</label>
          <br />
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)} onMouseDown={()=>setValidation(true)}
          ></input>
          {address.length === 0 && validation && (
            <span className="errorMsg">Please Enter Student Address!</span>
          )}
          <br />
          <label htmlFor="id">Phone:</label>
          <br />
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)} onMouseDown={()=>setValidation(true)}
          ></input>
          {phone.length === 0 && validation && (
            <span className="errorMsg">Please Enter Student Phone Number!</span>
          )}
          <br />
          <div>
            <button className="btn btn-save">Update</button>
            <Link to="/" className="btn btn-back">
              Back
            </Link>
          </div>
        </form>
      </div>
    )
}