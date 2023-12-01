import { useState } from 'react';
import { Link } from '@shopify/hydrogen';
import CartBubble from './CartBubble.client';

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }
  
    return (
      <div className="mobile-menu">
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <ul className="mobile-menu-list">
            <li onClick={toggleMenu}><Link to='collections/shop-all'>SHOP ALL</Link></li>
            <li onClick={toggleMenu}><Link to='collections/home'>HOME</Link></li>
            <li onClick={toggleMenu}><Link to='collections/skin'>SKIN</Link></li>
            <li onClick={toggleMenu}><Link to='pages/ingredients'>INGREDIENTS</Link></li>
            <li onClick={toggleMenu}>
                <Link to="/pages/Cart" className="mobile-header-cart-link">
                    CART <CartBubble />
                </Link>
            </li>
          </ul>
        )}
      </div>
    )
}

export default MobileMenu;