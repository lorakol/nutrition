import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import '../styles/Navbar.css';
import logo1 from '../assets/logo1.png';

function Navbar()
{
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<a href="/">
						<div className="logo-image">
							<img src={logo1} alt="logo1" style={{height: '100%'}}/>
				      	</div>
					</a>

					<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>Recipes</Link>

					<div className='menu-icon' onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>

					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className='nav-item'>
							<Link to='/' className='nav-links' onClick={closeMobileMenu}>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/ingredients' className='nav-links' onClick={closeMobileMenu}>
								Ingredients
							</Link>
						</li> 

						<li className='nav-item'>
							<Link to='/recipes' className='nav-links' onClick={closeMobileMenu}>
								Recipes
							</Link>
						</li>

						<li className='nav-item'>
							<Link to='/about' className='nav-links' onClick={closeMobileMenu}>
								About Us
							</Link>
						</li>
						
					</ul>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
