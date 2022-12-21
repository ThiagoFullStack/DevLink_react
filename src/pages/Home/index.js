import { useState, useEffect } from 'react';
import './home.css';

import {Social} from '../../components/Social'

import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

import { db } from '../../services/firebaseConnection';

import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore';

export default function Home(){
    const [links, setLinks] = useState([]);
    const [socialLinks, setSocialLinks] = useState({});

    useEffect(()=>{
        function loadLinks(){
           const linksRef = collection(db, 'links')
           const queryRef = query(linksRef, orderBy('created', 'asc'));
           
           getDocs(queryRef)
           .then((snopshot)=>{
            let lista = [];

            snopshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            // console.log(lista);
            setLinks(lista);
           })
        }
        loadLinks();
    },[]);

    useEffect(()=>{
        function loadSocialLinks(){
            const docRef = doc(db, 'social', 'link')

            getDoc(docRef)
            .then((snopshot)=>{
                if(snopshot.data() !== undefined){
                    setSocialLinks({
                        github: snopshot.data().github,
                        instagram: snopshot.data().instagram,
                        linkedin: snopshot.data().linkedin
                    })
                }
            })
        }
        loadSocialLinks();
    },[])


    return(
        <div className='home-container'>
            <h1>DevRoot</h1>
            <span>Veja meus links 👇</span>

            <main className='links'>
         
                { links.map((item)=> (
                    <section 
                        key={item.id}
                        className='link-area' 
                        style={{ backgroundColor: item.bg}}>

                        <a href={item.url} target='blank'>
                            <p className='link-text'
                                style={{ color: item.color}}>{item.name}</p>
                        </a>
                    </section>
                ))}
            {/* 
                ***  MODELO NA ESCRITO NA MÃO  ***
            
            <section className='link-area'>
                <a href='#'>
                    <p className='link-text'>GitHub</p>
                </a>
            </section>
            <section className='link-area'>
                <a href='#'>
                <p className='link-text'>Instagram</p>
                </a>
            </section> */}

            {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                <footer>
                    <Social url={socialLinks?.github}>
                        <FaGithub size={35} color="#FFF" />
                    </Social>
                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#FFF" />
                    </Social>
                    <Social url={socialLinks?.linkedin}>
                        <FaLinkedin size={35} color="#FFF" />
                    </Social>
            </footer>
            )}

            </main>
        </div>
    )
}