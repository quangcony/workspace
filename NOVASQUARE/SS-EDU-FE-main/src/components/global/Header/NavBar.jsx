import React from 'react'
import AppMenu from './AppMenu'
import LanguageSelect from './LanguageSelect'
import Mail from './Mail'
import Notice from './Notice'
import UserMenu from './UserMenu'

const NavBar = () => {

  return (
      <ul className="navbar-nav">
          {/* <LanguageSelect/> */}
          <AppMenu />
          {/* <Mail/> */}
          {/* <Notice/> */}
          <UserMenu/>
      </ul>
  )
}

export default NavBar