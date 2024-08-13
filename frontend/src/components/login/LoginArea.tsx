'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setToken } from '../../utils/tokenStorage';
import axiosInstance from '../../utils/axiosInstance';

const LoginArea = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        Username: username,
        Password: password,
      });
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('username', username);
        router.push('/');
      }
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <>
      <div className="register-area">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center justify-content-between">
            <div className="col-12 col-md-6 col-xl-5">
              <div className="register-card">
                <h2>Welcome Back!</h2>
                {/* <p>
									Didnt have an account?
									<Link className="ms-1 hover-primary" href="/register">
										Register now!
									</Link>
								</p> */}

                <div className="register-form mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label
                        className="label-psswd"
                        htmlFor="registerPassword"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? 'Ẩn' : 'Hiện'}
                      </label>
                      <input
                        className="form-control"
                        id="registerPassword"
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className="btn btn-success w-100" type="submit">
                      Đăng Nhập
                    </button>
                  </form>
                  <div className="login-meta-data d-flex align-items-center justify-content-between">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        id="rememberMe"
                        type="checkbox"
                        value=""
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Lưu Đăng Nhập
                      </label>
                    </div>
                    <Link
                      className="forgot-password mt-4 text-primary fz-16"
                      href="/forget-password"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="register-thumbnail mt-5 mt-md-0">
                <img src="/assets/img/illustrator/4.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginArea
