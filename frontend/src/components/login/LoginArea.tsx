'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axiosInstance';
import { setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { login } from '@/utils/login';


const LoginArea = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [userInput, setUserInput] = useState<TUserInputs>({ username: "", password: "" });
  const [error, setError] = useState('')
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous error
    await login(userInput, setUserInput, setError, router);
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
                        name="username"
                        placeholder="Username"
                        value={userInput.username}
                        onChange={handleInputChange}
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
                        name="password"
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Mật khẩu"
                        value={userInput.password}
                        onChange={handleInputChange}
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
