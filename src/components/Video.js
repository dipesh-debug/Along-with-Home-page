import {React,useState,useEffect} from 'react';
import ReactPlayer from 'react-player/youtube';
import"./Video.css";
import  "./Hero";




export function Stream() {

 
    const [state, setState] = useState({
		datas: [],
			DataisLoaded: false

	});
  
	useEffect(()=>{
		fetch(
"http://127.0.0.1:9000/api/streams/matches?format=json")
			.then((res) => res.json())
			.then((json) => {
				setState({
					datas: json,
					DataisLoaded: true
				});
			})
	});
    const { DataisLoaded, datas } = state;
    if (!DataisLoaded) return <div>
			<h1> Please wait some time.... </h1> </div> ;

   

          return (

         <>
          
        
        
              
             <div className = "Stream-app">
             

                  
                  {
                     datas.map((data) => (
                        
 
  <><h1 className='text'>Match_id:{data.id}</h1>
  <h2 className='desc'>
 {data.description}
  </h2>
 


      
      
     
        <ReactPlayer 
          className='react-player'
          url={data.embed_code} 
                      // playing
                      loop
                      controls
                            
          />
        
   
        
       </>
     
         
                     ))
}

                     
      </div>
              </>

                     
          );
                     
}
      
      export default Stream;
    
    

