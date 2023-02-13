import React,{Component} from 'react';
import './homePage.css'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { slideInLeft} from 'react-animations';
import { connect } from 'react-redux';
import vishakha from './vishakha.jpeg';

const slideLeft = keyframes`${slideInLeft}`;

const SlideL = styled.div`
  animation: 2s ${slideLeft};
`;

class AboutUs extends Component{
    render(){
        return(
            <div className='container'>
                <SlideL>
                    <div className='person row'>
                        <div className='col img'>
                            <img src={vishakha} className="responsive-img" />
                        </div>
                        <div className='col' style={{textAlign: "right"}}>
                        <h3 className='title'>Vishakha Yadav</h3>
                        <p className='content'>Hello, I am Vishakha Yadav. I'm a MCA student who always tries to learn and explore different things. At present completing my 6 months internship at Jellyfish Technoloiges. With all my experience and hardwork i have made a sample project to show my learning skills. You can find me on <a href="https://www.linkedin.com/in/vishakha-yadav-375090227">Linkedin</a>, <a href="https://github.com/YesVishakha">Github</a>.</p>
                        </div>
                        
                    </div>
                </SlideL>
                <br/>
            </div>
        )
    }
}

export default AboutUs;