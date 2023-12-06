import { useState } from 'react';
import { Link } from '@shopify/hydrogen';
import CartBubble from './CartBubble.client';

import LOGO from '../assets/WILO_LOGO_BLK.svg';
import BARK_2 from '../assets/mobile_menu_media/BARK_2.jpg';
import LIP_SERUM from '../assets/mobile_menu_media/LIP_SERUM.jpg';
import LIP_SERUM_2 from '../assets/mobile_menu_media/LIP_SERUM_2.jpg';

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }
  
    return (
      <div className="mobile-menu">
        <a className="hamburger-button" onClick={() => {toggleMenu()}}>MENU</a>
        <Link to='/' className="header-logo-mobile"><img src={LOGO} /></Link>
        <Link to="/pages/Cart" className="mobile-header-cart-link">CART <CartBubble /></Link>
        {isMenuOpen && (
          <div className='mobile-menu-list-container'>
            <div className='row-one'>
              <ul className="mobile-menu-list">
                <li onClick={toggleMenu}><Link to='collections/shop-all'>SHOP ALL</Link></li>
                <li onClick={toggleMenu}><Link to='collections/home'>HOME</Link></li>
                <li onClick={toggleMenu}><Link to='collections/skin'>SKIN</Link></li>
                <li onClick={toggleMenu}><Link to='pages/ingredients'>INGREDIENTS</Link></li>
                <li onClick={toggleMenu}><Link to='pages/About'>ABOUT</Link></li>
              </ul>
              <img src={BARK_2} />
            </div>
            <div className='row-two'>
              <img src={LIP_SERUM} />
              <img src={LIP_SERUM_2} />
            </div>
          </div>
        )}
      </div>
    )
}

export default MobileMenu;