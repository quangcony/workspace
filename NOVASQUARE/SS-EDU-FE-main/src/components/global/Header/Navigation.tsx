import React from 'react'

const Navigation = () => {
  return (
              <nav className="navbar">
            {/*navbar-collapse*/}
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <a className="nav-link active" href="index.html"> Home </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#"> Pages </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="#"> Blogs </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="#"> features </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  " href="#"> shop </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html"> contact </a>
                </li>
              </ul>
            </div>
            {/*/*/}
          </nav>
  )
}

export default Navigation