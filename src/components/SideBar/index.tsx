import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiBook, FiUser } from 'react-icons/fi'

import styles from './sidebar.module.scss'

export function SideBar() {
  return (
    <div className={styles.sidebarContainer}>
      <nav className={styles.sideBarItems}>
        <ul>
          <li>
            <Link to="/" >
              <FiHome size={25} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/Library" >
              <FiBook size={25} />
              Library
            </Link>
          </li>
          <li>
            <Link to="/" >
              <FiUser size={25} />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}