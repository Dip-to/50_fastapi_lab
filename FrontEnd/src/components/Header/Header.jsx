import React, {useRef, useEffect } from 'react'
import { container, Row, Button, Container } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import './Header.css'


const nav_Link = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/others',
    display: 'others'
  }
]

const Header = () => {
  const headerRef = useRef(null)
  const stickyHeaderFunc = () =>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(()=>{
   stickyHeaderFunc()

   return window.removeEventListener('scroll', stickyHeaderFunc)
  })
  return (
    <header className="Header" ref={headerRef}>
       <Container>
        <Row>
          <div className='nav_wrapper d-flex align-item-center justify-content-between'>
            <div className="logo">
              <img src="" alt="logo" />
            </div>

            <div className="navigation">
             <ul className='menu d-flex align-item-center gap-5'>
              {
               nav_Link.map((item, index)=>(
                <li className='nav_item' key={index}>
                   <NavLink to={item.path} className={navClass=> navClass
                   .isActive? 'active__link' : ""}>
                    {item.display}
                    </NavLink>
                </li>
               ))
              }
             </ul>
            </div>
            <div className='nav_right d-flex align-items-center gap-4'> 
             <div className='nav_btns d-flex align-items-center gap-4'>
                <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
             </div>
             <span className="mobile_menu">
              <i class="ri-menu-line"></i>
             </span>
            </div>
          </div>
        </Row>
      </Container> 
      
      </header>
  )
}

export default Header