'use client'

import Link from 'next/link'
import UseSticky from '@/hooks/UseSticky'
import React, { useState, useEffect } from 'react'
import Count from '@/components/common/Count'
import { refreshToken } from '@/utils/auth'
import axiosInstance from '@/utils/axiosInstance'

const balanceCard = [
  {
    title: 'Red Coin',
    icon: '/assets/img/core-img/ethereum.png',
    balance: 200,
    // balanceType: 'RC',
  },
]

const AdminNav = [
  {
    id: 1,
    path: '/dashboard',
    icon: 'bi-speedometer',
    text: 'Dashboard',
  },
  // {
  //   id: 2,
  //   path: '/live-bids',
  //   icon: 'bi-hammer',
  //   text: 'Live Bids',
  // },
  // {
  //   id: 3,
  //   path: '/my-collection',
  //   icon: 'bi-columns-gap',
  //   text: 'My Collections',
  // },
  {
    id: 4,
    path: '/my-wallet',
    icon: 'bi-wallet2',
    text: 'Kho Đồ',
  },
  // {
  //   id: 5,
  //   path: '/notifications',
  //   icon: 'bi-bell',
  //   text: 'Notifications',
  // },
  {
    id: 6,
    path: '/settings',
    icon: 'bi-gear',
    text: 'Settings',
  },
]

const DashboardHeader = () => {
  const { sticky } = UseSticky()
  const [isActive, setActive] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [admin, setAdminLevel] = useState<string | null>(null)


  const handleToggle = () => {
    setActive(!isActive)
  }

  const [userActive, setUserActive] = useState(false)
  const handleUserToggle = () => {
    setUserActive(!userActive)
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let token = localStorage.getItem('token')
        if (!token) {
          console.error('No token found')
          return
        }

        // Refresh token if necessary
        token = await refreshToken() || token

        const response = await axiosInstance.get('/auth/user-info', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const { Username, Admin } = response.data
        setUsername(Username)
        localStorage.setItem('username', Username)

        if (Admin === 0) {
          setAdminLevel('User')
        } else if (Admin >= 1 && Admin <= 8) {
          setAdminLevel(`Admin ${Admin}`)
        } else {
          setAdminLevel('Unknown')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <>
      <header
        className={`header-area dashboard-header px-0 px-sm-0 ${sticky ? 'sticky-on' : ''}`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <div className="admin-logo me-1 me-sm-3">
                <img src="/assets/img/core-img/dashboard-logo.png" alt="" />
              </div>

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
            </div>

            <div className="header-meta d-flex align-items-center">
              <div className="user-dropdown dropdown mx-2 mx-sm-3">
                <button
                  className="btn dropdown-toggle user-btn"
                  id="dd10"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/assets/img/core-img/notification.png" alt="" />
                </button>
                <ul
                  className="dropdown-menu noti-dd-menu dropdown-menu-end mt-3"
                  aria-labelledby="dd10"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="me-2 bi bi-percent"></i>Chào mừng đến với RC:RP
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bg-info me-2 bi bi-tags"></i>
                      Rất vui vì đã được bạn đồng hành cùng chúng tôi
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bg-danger me-2 bi bi-gift"></i>Sở hữu ngay những vật phẩm đặc biệt
                      bằng cách đổi RC hoặc mua RC nhé.
                    </a>
                  </li>
                  <li>
                    {/* <a className="dropdown-item" href="#">
                      <i className="bg-warning me-2 bi bi-star"></i>A new rating
                      has been received.
                    </a> */}
                  </li>
                  <li>
                    <Link
                      className="dropdown-item justify-content-center"
                      href="/notifications"
                    >
                      View all notifications
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="user-dropdown dropdown">
                <button
                  onClick={handleUserToggle}
                  className={`btn dropdown-toggle user-btn ${userActive ? 'show' : ''}`}
                  id="dd20"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="/assets/img/core-img/user.png" alt="" />
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-end mt-3 ${userActive ? 'show' : ''}`}
                  aria-labelledby="dd20"
                >
                  <li>
                    <Link className="dropdown-item" href="/dashboard">
                      <i className="me-2 bi bi-person-circle"></i>Dashboard
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" href="/live-bids">
                      <i className="me-2 bi bi-hammer"></i>My bids
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/my-collection">
                      <i className="me-2 bi bi-collection"></i>Collection
                    </Link>
                  </li> */}
                  <li>
                    <Link className="dropdown-item" href="/settings">
                      <i className="me-2 bi bi-gear"></i>Settings
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                className="btn btn-sm btn-danger rounded-pill ms-2 ms-sm-3 d-none d-sm-block"
                href="/"
              >
                <i className="bi bi-eye me-1"></i>Trang Chủ
              </Link>

              <div
                onClick={handleToggle}
                className="menu-toggler ms-2 ms-sm-3"
                id="dashboardMenuTrigger"
              >
                <i className="bi bi-list"></i>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`admin-sidebar-wrap ${isActive ? 'sidebar-active' : 'sidebar-disabled'}`}
      >
        <div className="overflowY-scroll">
          {/* User Profile */}
          <div className="user-profile">
            {/* User Name */}
            <div className="user-name mb-5">
              <div className="d-flex align-items-center">
                <img src="/assets/img/bg-img/u2.png" alt="" />
                <div className="ms-3">
                  <h6 className="lh-1 text-dark fz-18">
                  {username}
                  </h6>
                  <span className="badge bg-primary fz-12">
                  {admin}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="card shadow mb-5">
              <div className="card-body text-center p-4">
                <h6 className="mb-1">{balanceCard[0].title}</h6>
                <h5 className="mb-0 text-dark d-flex align-items-center justify-content-center">
                  <img className="me-1" src={`${balanceCard[0].icon}`} alt="" />
                  <span className="counter">
                    <Count number={balanceCard[0].balance} />
                  </span>
                  {/* <span className="ms-2">{balanceCard[0].balanceType}</span> */}
                </h5>

                {/* Recharge Button */}
                <Link
                  className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
                  href="#"
                >
                  Mua RC
                </Link>
              </div>
            </div>
          </div>

          {/* Sidenav */}
          <div className="sidenav">
            <ul>
              <li>Menu</li>
              {AdminNav.map((elem, index) => (
                <li key={index}>
                  <Link href={elem.path}>
                    <i className={`bi ${elem.icon}`} />
                    {elem.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="mt-5" />
            {/* Copyright Text */}
            <div className="copywrite-text mt-4">
              <p className="mb-0 fz-14">
                {new Date().getFullYear()} © All rights reserved by
                <a
                  className="fz-14 ms-1"
                  rel="noreferrer"
                  href=""
                  target="_blank"
                >
                  RCRP
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardHeader
