'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import menu_data from './MenuData'
import { jwtDecode } from 'jwt-decode';

const MobileMenus = ({ setOpenMenu, openMenu }: any) => {
  const [navTitle, setNavTitle] = useState('')
  const [navTitle2, setNavTitle2] = useState('')
  const [username, setUsername] = useState<string | null>(null)

  // Open/Close mobile sub-menus
  const openMobileMenu = (menu: string) => {
    setNavTitle(navTitle === menu ? '' : menu)
  }

  const openMobileMenu2 = (menu: string) => {
    setNavTitle2(navTitle2 === menu ? '' : menu)
  }


  const handleLogout = () => {
    setUsername(null);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);
  
  return (
    <div
      className={`navbar-collapse collapse ${openMenu ? 'show' : ''}`}
      id="RC:RPNav"
    >
      <ul className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
        {menu_data.map((item, i) => (
          <li
            key={i}
            className={`${item.has_dropdown ? 'ft-dd' : ''}`}
            onClick={() => openMobileMenu(item.title)}
          >
            <Link href={item.link}>{item.title}</Link>
            {item.has_dropdown && (
              <>
                <div className="dropdown-toggler">
                  <i className="bi bi-caret-down-fill"></i>
                </div>
                <ul
                  className="ft-dd-menu"
                  style={{
                    display: navTitle === item.title ? 'block' : 'none',
                  }}
                >
                  {item.sub_menus?.map((submenu, index) => (
                    <React.Fragment key={index}>
                      <li
                        className={`${submenu.inner_has_dropdown ? 'ft-dd' : ''}`}
                        onClick={() => openMobileMenu2(submenu.title)}
                      >
                        <Link href={submenu.link}>{submenu.title}</Link>

                        {submenu.inner_has_dropdown && (
                          <>
                            <div className="dropdown-toggler">
                              <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <ul
                              className="ft-dd-menu"
                              style={{
                                display:
                                  navTitle2 === submenu.title
                                    ? 'block'
                                    : 'none',
                              }}
                            >
                              {submenu.inner_sub?.map((sub_item, sub_index) => (
                                <li key={sub_index}>
                                  <Link href={sub_item.link}>
                                    {sub_item.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="header-meta d-flex align-items-center ms-lg-auto">
        <div className="search-form position-relative d-flex align-items-center">
          <input className="form-control" type="text" placeholder="Search" />
          <button className="position-absolute" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </div>

        {username ? (
          <div className="user-dropdown dropdown mx-3">
            <button
              className="btn dropdown-toggle user-btn"
              id="dropdownMenuButton1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="bi bi-person"
                style={{ display: 'inline-block', padding: '0 10px' }}
              >
                {username}
              </i>{' '}
            </button>
            <ul
              className="dropdown-menu mt-3"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <Link className="dropdown-item" href="/dashboard">
                  <i className="me-2 bi bi-speedometer2"></i>Dashboard
                </Link>
              </li>
              {/* <li>
                <Link className="dropdown-item" href="/my-collection">
                  <i className="me-2 bi bi-collection"></i>Collections
                </Link>
              </li> */}
              {/* <li>
                <Link className="dropdown-item" href="/notifications">
                  <i className="me-2 bi bi-bell"></i>Notifications
                </Link>
              </li> */}
              <li>
                <Link className="dropdown-item" href="/settings">
                  <i className="me-2 bi bi-gear"></i>Settings
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="me-2 bi bi-box-arrow-right"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-warning btn-sm rounded-pill" href="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default MobileMenus
