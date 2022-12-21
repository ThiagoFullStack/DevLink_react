import { useState, useEffect } from 'react';
import './networks.css';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { FiLink } from "react-icons/fi";


import { db } from '../../services/firebaseConnection';
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

import { toast } from 'react-toastify';

export default function Networks(){
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [instagram, setInstagram] = useState(''); 

    useEffect(()=>{
        function loading(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snopshot) =>{
                // console.log(snopshot.data())(
                    if(snopshot.data() !== undefined){
                        setLinkedin(snopshot.data().linkedin)
                        setGithub(snopshot.data().github)
                        setInstagram(snopshot.data().instagram)
                    }  
            })
        }

        loading();
    },[])

    async function handleSave(e){
        e.preventDefault();
        //   *** TESTE! ***
        // console.log(linkedin);
        // console.log(github);
        // console.log(instagram);
        setDoc(doc(db, 'social', 'link'), {
            linkedin: linkedin,
            github: github,
            instagram: instagram
        })
        .then(()=>{
            console.log('url salvas com sucesso!')
            toast.success('Salvo com sucesso!')
        })
        .catch((error)=>{
            console.log('ERRO AO SALVAR ' + error)
            toast.error('Erro ao salvar seus links!')
        })
    }

    return(
        <div className='admin-container'>
            <Header />

            <h1 className='title-social'>Suas redes sociais</h1>

            <form className='form' onSubmit={handleSave}>
                <label className='label'>Link LinkedIn</label>
                    <Input 
                        placeholder='Digite a url LinkedIn...'
                        value={linkedin}
                        onChange={(e)=> setLinkedin(e.target.value) }
                    />

                <label className='label'>Link GitHub</label>
                    <Input 
                        placeholder='Digite a url GitHub...'
                        value={github}
                        onChange={(e)=> setGithub(e.target.value) }
                    />

                <label className='label'>Link Instagram</label>
                    <Input 
                        placeholder='Digite a url Instagram...'
                        value={instagram}
                        onChange={(e)=> setInstagram(e.target.value) }
                    />

                <button type='submit' className='btn-register'>
                    Salvar links 
                    <FiLink size={24} color='#fff' />
                </button>

            </form>
            
        </div>
    )
}