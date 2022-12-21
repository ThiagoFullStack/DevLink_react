import './error.css';
import {Logo} from '../../components/Logo';

import { Link } from 'react-router-dom'
export default function Error(){
    return(
        <div className='error'>
            <Logo />
            <h1>Página não encontrada!</h1>
            <p>Está página que está procurando não existe!</p>

            <Link className='link' to={"/"}>
                Voltar para home
            </Link>
        </div>
    )
}