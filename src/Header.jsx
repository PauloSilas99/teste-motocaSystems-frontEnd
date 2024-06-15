import React from 'react'
import { Link } from 'react-router-dom'
import VectorHome from './assets/VectorHome.svg'
import IconUser from './assets/IconUser.png'
import './styles/index.css';

const Header = () => {
  return (
    <div>
      <div className='headerDiv'>
        <div className='DivImgHome'>
            <Link to={'/'}>
                <img src={VectorHome} alt="Home" />
            </Link>
        </div>
        <img src={IconUser} alt="IconUser" />
      </div>
    </div>
  )
}

export default Header
