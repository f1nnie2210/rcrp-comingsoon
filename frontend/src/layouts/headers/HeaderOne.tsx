/* eslint-disable @next/next/no-img-element */
'use client'

import UseSticky from '@/hooks/UseSticky'
import Link from 'next/link'
import NavMenu from './NavMenu'
import MobileMenus from './mobile-menus'
import React, { useCallback, useEffect, useState } from 'react'
import { logout } from '@/utils/logout'

import light_logo from '/assets/img/core-img/logo.png'
import dark_logo from '/assets/img/core-img/logo-white.png'

const HeaderOne = () => {
  const [username, setUsername] = useState<string | null>(null)
  const { sticky } = UseSticky()
  const [openMenu, setOpenMenu] = useState(false)
  const [userActive, setUserActive] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 990) {
      setOpenMenu(false)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  if (typeof window !== 'undefined') {
    require('bootstrap/dist/js/bootstrap')
  }

  const handleLogout = () => {
    logout()
  }
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const handleUserToggle = () => {
    setUserActive(!userActive)
  }

  
  return (
    <>
      <header
        className={`header-area ${sticky ? 'sticky-on' : ''} ${
          openMenu ? 'mobile-menu-open' : ''
        }`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" href="/">
              <img
                className="light-logo"
                src="/assets/img/core-img/logo.png"
                alt="rcrp logo"
              />
              <img
                className="dark-logo"
                src="/assets/img/core-img/logo-white.png"
                alt="rcrp logo"
              />
            </Link>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#RC:RPNav"
              aria-controls="RC:RPNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-grid"></i>
            </button>
            {openMenu && (
              <MobileMenus openMenu={openMenu} setOpenMenu={setOpenMenu} />
            )}

            <div
              className="collapse navbar-collapse d-none d-xl-block"
              id="RC:RPNav"
            >
              <NavMenu />

              <div className="header-meta d-flex align-items-center ms-lg-auto">
                <div className="search-form position-relative d-flex align-items-center">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search"
                  />
                  <button className="position-absolute" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                {username ? (
                  <div className="user-dropdown dropdown mx-3">
                    <button
                      onClick={handleUserToggle}
                      className={`btn dropdown-toggle user-btn ${
                        userActive ? 'show' : ''
                      }`}
                      id="dropdownMenuButton1"
                      type="button"
                      aria-expanded={userActive ? 'true' : 'false'}
                    >
                      <i
                        className="bi bi-person"
                        style={{ display: 'inline-block', padding: '0 10px' }}
                      >
                        {username}
                      </i>{' '}
                    </button>
                    <ul
                      className={`dropdown-menu mt-3 ${
                        userActive ? 'show' : ''
                      }`}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" href="/dashboard">
                          <i className="me-2 bi bi-speedometer2"></i>
                          Dashboard
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" href="/my-collection">
                          <i className="me-2 bi bi-collection"></i>
                          Collections
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/notifications">
                          <i className="me-2 bi bi-bell"></i>
                          Notifications
                        </Link>
                      </li> */}
                      <li>
                        <Link className="dropdown-item" href="/settings">
                          <i className="me-2 bi bi-gear"></i>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          <i className="me-2 bi bi-box-arrow-right"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    className="btn btn-warning btn-sm rounded-pill"
                    href="/login"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default HeaderOne
