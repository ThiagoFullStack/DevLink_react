import { useState } from 'react';

import './login.css';

import { Logo } from '../../components/Logo';

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Input } from '../../components/Input';
export default function Login(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const nav = useNavigate()

    function handleLogin(e){
        e.preventDefault();

        if(email === '' || password === ''){
            alert('Preenchar todos os campos!')
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() =>{
            toast.success('Bem vindo de volta :)')
            nav("/admin", {replace: true })
            // console.log('USUARIO LOGADO COM SUCESSO!');
        })
        .catch(() =>{
            // React-toastify popapy
            //https://fkhadra.github.io/react-toastify/introduction

            toast.error('Erro ao tentar fazer o login!')
            // console.log('ERRO AO FAZER SEU LOGIN!');
        })
    }

    return(
        <div className='login-container'>
            <Logo />

            <form className='form' onSubmit={handleLogin}>
                <Input 
                    type='email'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    type='password'
                    placeholder='*********'
                    autoComplete='on'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>
                    Acessar
                </button>
            </form>
        </div>
    )
}