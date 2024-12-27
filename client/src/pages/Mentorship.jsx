import React, { useEffect } from 'react'

const Mentorship = () => {
    
    const [connections, setConnections] = useState([]);

    const fetchConnections = async () => {
        const role=localStorage.getItem('user').role;
        const id=localStorage.getItem('user')._id;

        if(role==='mentor'){
            const url = `https://mentormatch-ewws.onrender.com/mentor/${id}`;
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            console.log(data);
        }
        else if(role==='mentee'){
            const url = `https://mentormatch-ewws.onrender.com/mentee/${id}`;
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            console.log(data);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

  return (
    <div>Mentorship</div>
  )
}

export default Mentorship