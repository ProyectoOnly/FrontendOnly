import React from 'react';
import   {Link} from 'react-router-dom';
import './footer.css'

const Footer = () => {
    return(
        <div className='footerDis'>
            
            <div className='Logi'>
           <img src="https://res.cloudinary.com/privateonlywork/image/upload/v1660007801/category/lob_egqy6w.jpg" className='logotico'/>
            </div>
            <div >
               <p>Copyright Ⓡ 2022</p>
            </div>
            <div className='footerLista'>
                <div>
                     <p>Información</p>
            <li> <Link to='#'>Contact</Link> </li>
            <li> <Link to='#'>Como funciona</Link> </li>
             
                </div>
                <div>
                      <p>Soporte</p>
            <li> <Link to='#'>Reglas de publicación</Link> </li>
            <li> <Link to='#'>Consejhos de seguridad</Link> </li>
           
                </div>
                <div>
                     <p>Legal</p>
            <li> <Link to='#'>Condiciones de uso</Link> </li>
            <li> <Link to='#'>Política de privacidad</Link> </li>
            <li> <Link to='#'>Cookies</Link> </li>
            
                </div>
                <div>
                    <p>Motor</p>
            <li> <Link to='#'>Electrico</Link> </li>
            <li> <Link to='#'>Manual</Link> </li>        
                </div>
                </div> 
             
        </div>
        
    );
};

export default Footer;