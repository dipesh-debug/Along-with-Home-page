
import {React,useEffect,useState} from "react";
import{ useNavigate} from 'react-router-dom';
import "./Hero.css";
import { Container,} from "react-bootstrap";
import  "./Video";
import "../App";


// import { useNavigate } from "react-router";

export function Hero(props){
	
	const [state, setState] = useState({
		datas: [],
			DataisLoaded: false

});
	useEffect(()=>{
		return () =>{fetch(
"http://127.0.0.1:9000/api/streams/matches?format=json")
			.then((res) => res.json())
			.then((json) => {
				setState({
					datas: json,
					DataisLoaded: true
				})
			})
			if (!DataisLoaded) return <div>
			<h1> Please wait some time.... </h1> </div> ;
		
		}});
	
		const { DataisLoaded, datas } = state;
		// const Navigate = useNavigate();
	const navigate = useNavigate();
    const Matches = () => {
        navigate("/Stream");
		
		
    }
		
		

		return (
       <>   
       <Container>
		
		
		<div className = "App">
             
			 {
				datas.map((data) => (
				
            <main className="page-content">
  <div className="card">
    <div className="content">
      {/* <h2 className="title">Match_id:{data.id},</h2> */}
      <h2 className="title"> {data.description}</h2>
	  {/* <button className="btn"> <a href={data.embed_code}>Click Here to watch</a></button> */}
	  
      <button className="btn" onClick={Matches }>Click Here to Watch</button>

	  
    </div>
  </div>
 
</main>
       
				))
			}
      
		</div>
		{/* <Link to ="/Video"/> */}
		
    </Container>
   
  </>

	);
}



export default Hero;
