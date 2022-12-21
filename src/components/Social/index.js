import './social.css';

export function Social({ children, url}){
    return(
       <a className="social" href={url} rel="noopener noreferrer" target="blank">
        {children}
       </a>
    )
}

// INSTALLAR 
//npm install react-icons@4.2.0

// 