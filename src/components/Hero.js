
import React from "react";
import{Link} from 'react-router-dom';
import "./Hero.css";
import {Card,Button, Container} from "react-bootstrap";
class App extends React.Component {
	


	constructor(props) {
		super(props);

		this.state = {
			datas: [],
			DataisLoaded: false
		};
	}

	componentDidMount() {
		fetch(
"http://127.0.0.1:9000/api/streams/matches?format=json")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					datas: json,
					DataisLoaded: true
				});
			})
	}
	render() {
		const { DataisLoaded, datas } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Please wait some time.... </h1> </div> ;

		return (
       <>   
       <Container>
		<div className = "App">
             
			<h1> List of Matches </h1> {
				datas.map((data) => (
				<>
            <main class="page-content">
  <div class="card">
    <div class="content">
      <h2 class="title">Match_id:{data.id},</h2>
      <p class="copy">Description: {data.description},</p>
      <button class="btn">embded_code: <a href={data.embed_code}>{data.embed_code}</a></button>
    </div>
  </div>
 
</main></>
       
				))
			}
        <Link to ='/App'></Link>
		</div>
    </Container>
    
  </>
	);
}
}


export default App;
