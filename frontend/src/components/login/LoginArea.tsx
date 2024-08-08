"use client";
import Link from "next/link";
import React, { useState } from "react";

const LoginArea = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
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
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="form-group mb-4">
											<input
												className="form-control"
												type="email"
												placeholder="Ho_Ten"
												required
											/>
										</div>
										<div className="form-group mb-4">
											<label
												className="label-psswd"
												htmlFor="registerPassword"
												onClick={togglePasswordVisibility}
											> 
												{passwordVisible ? "Ẩn" : "Hiện"}
											</label>
											<input
												className="form-control"
												id="registerPassword"
												type={passwordVisible ? 'text' : 'password'}
												placeholder="Mật khẩu"
												required
											/>
										</div>
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
												checked
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
	);
};

export default LoginArea;
