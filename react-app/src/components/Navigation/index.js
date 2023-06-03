import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MagnifyingGlass from '../../assets/magnifying-glass.svg'
import './Navigation.css';
import Snowflake from "../../assets/snowflake-regular.svg"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navBar'>
			<div className='logoSearch'>
				<li>
					<NavLink exact to="/"><img src={Snowflake} alt="logo" className='logo' /></NavLink>
				</li>
				<li className='searchArea'>
					<img src={MagnifyingGlass} alt="magnifying-glass" className='searchLogo' />
					<form className='searchForm'>
						<input type="text" name="search" placeholder='Search...' className='searchInput'></input>
						<button type="submit" className='search-button'>Search</button>
					</form>
				</li>
			</div>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
