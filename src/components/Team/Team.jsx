import React from 'react'
import './Team.css'
import{AiFillLinkedin,AiFillGithub} from 'react-icons/ai'
// import Swiper core and required modules
import {  Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ABRAHAM from '../../assets/fotos/Abraham_Huacchillo.jpeg'
import DANIEL from '../../assets/fotos/Daniel_Rodríguez.jpeg'
import EFREN from '../../assets/fotos/Efren_Morales.jpeg'
import JEFFERSON from '../../assets/fotos/Jefferson_Panchi.jpeg'
import LUIS from '../../assets/fotos/Luis_Orellana.jpeg'
import OVIDIO from '../../assets/fotos/Ovidio_Romero.jpeg'
import SEBASTIAN from '../../assets/fotos/Sebastian_Tafur.jpeg'

const data = [
    {
        id: 1,
        name: 'Abraham Huacchillo',
        position: 'Frontend Developer',
        linkedin: 'https://www.linkedin.com/in/abraham-moises-huacchillo-castillo-7630b1210/',
        github: 'https://github.com/Jarbram',
        img:ABRAHAM,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 2,
        name: 'Daniel Rodríguez',
        position: 'Backend Developer',
        linkedin: 'https://www.linkedin.com/in/daniel-camilo-rodriguez-vargas-78a908134/',
        github: 'https://github.com/Deadmanw',
        img:DANIEL,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 3,
        name: 'Efren Morales',
        position: 'Backend Developer',
        linkedin: 'https://www.linkedin.com/in/efrén-morales-00029a27a/',
        github: 'https://github.com/fr3nm0',
        img:EFREN,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 4,
        name: 'Jefferson Panchi',
        position: 'Frontend Developer',
        linkedin: 'https://www.linkedin.com/in/jefferson-panchi-chacon/',
        github: 'https://github.com/jfpanchi',
        img:JEFFERSON,  
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 5,
        name: 'Luis Orellana',
        position: 'Team lead',
        linkedin: 'https://www.linkedin.com/in/lorellanadev/',
        github: 'https://github.com/luisorellanas',
        img:LUIS,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 6,
        name: 'Ovidio Romero',
        position: 'Frontend Developer',
        linkedin: 'https://www.linkedin.com/in/ovidio-antonio-romero-guerrero/',
        github: 'https://github.com/DevstarLO',
        img:OVIDIO,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
    {
        id: 7,
        name: 'Sebastian Tafur',
        position: 'Backend Developer',
        linkedin: 'https://www.linkedin.com/in/sebastian-tafur/',
        github: 'https://github.com/tafursj17',
        img:SEBASTIAN,
        githubIcon: <AiFillGithub/>,
        linkedinIcon: <AiFillLinkedin/>,
    },
]

const Team = () => {
  return (
    <div className='container-team'>
        <h5>Conoce a nuestro</h5>
        <h2>Equipo</h2>
        <Swiper className="team_container" 
        // install Swiper modules
        modules={[ Pagination]}
        spaceBetween={10}
        slidesPerView={1}

        pagination={{ clickable: true }}
        >
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                <div className='team_avatar'>
                <img src={item.img} alt={item.name}/>
                <h3 className='team_name'>{item.name}</h3>
                <h4 className='team_position'>{item.position}</h4>
                <div className="team_social">
                    <a href={item.linkedin} >{item.linkedinIcon}</a>
                    <a href={item.github} >{item.githubIcon}</a>
                </div>
                </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default Team