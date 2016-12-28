/*
*	module dependencies
*/
import React from 'react';

export default class VideoScene extends React.Component{

	constructor (props){
		super(props);
		this.state={

		}
	
	}

	componentDidMount(){
		
		var panorama, viewer;
		var binndi_scene = document.querySelector('#video_scene');

		panorama = new PANOLENS.VideoPanorama( '/res/pano.mp4' );
		viewer = new PANOLENS.Viewer({
			container: binndi_scene,
			controlButtons: ['video'],
		});

    	viewer.add( panorama );

    	this.setState({
    		panorama : panorama
    	})
	}

	componentWillUnmount(){
		
		this.state.panorama.pauseVideo();
	}

	render(){
		

		return <div className="wrapper-video-scene">
				<div id="video_scene" className="videoScene">
					
				</div>
			</div>

	}
}
