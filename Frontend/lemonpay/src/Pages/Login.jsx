import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import text_1 from "../images/text_1.png";
import text_2 from "../images/text_2.png";
import text_3 from "../images/text_3.png";
import lemonpay from "../images/lemonpay.png";
import Ellipse_1 from "../images/Ellipse_1.png";
import { message } from "antd";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      message.success(response.data.msg || "Login successful!");

      navigate("/task-manage");
    } catch (error) {
      message.error(error.response?.data?.msg || "Login failed!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully!", 2); // Message disappears in 2 seconds
    navigate("/");
  };

  return (
    <>
      <Main>
        <NavbarContainer>
          <Logo src={lemonpay} alt="logo" />
          <Ellipse src={Ellipse_1} alt="ellipse" />
        </NavbarContainer>

        <ButtonTask onClick={() => navigate("/task-manage")}>
          Task Page
        </ButtonTask>
         
        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>

        <HomeContainer>
          <TextContainer>
            <Text>
              <img src={text_1} alt="text_1" />
            </Text>
          </TextContainer>

          <FormContainer>
            <Text>
              <img src={text_2} alt="text_2" />
            </Text>
            <Text_3>
              <img src={text_3} alt="text_3" />
            </Text_3>

            <LoginContainer>
              <Form_1 onSubmit={handleSubmit}>
                <FieldContainer>
                  <Label htmlFor="email">Email</Label>
                  <Input_1
                    type="email"
                    id="email"
                    placeholder="email@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FieldContainer>

                <FieldContainer>
                  <Label htmlFor="password">Password</Label>
                  <InputWrapper>
                    <Input_2
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Min 8 characters"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </EyeIcon>
                  </InputWrapper>
                </FieldContainer>

                <CheckboxContainer>
                  <LeftContainer>
                    <Checkbox type="checkbox" id="rememberMe" />
                    <Label_1 htmlFor="rememberMe">Remember me</Label_1>
                  </LeftContainer>
                  <ForgotPassword href="#">Forgot password?</ForgotPassword>
                </CheckboxContainer>

                <SignInButton type="submit">Sign In</SignInButton>

                <RegisterPage href="/sign-up">
                  {msg && <p className="message">{msg}</p>}
                  Don't have an account?{" "}
                  <StyledLink to="/sign-up">Sign Up</StyledLink>
                </RegisterPage>
              </Form_1>
            </LoginContainer>
          </FormContainer>
        </HomeContainer>
      </Main>
    </>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #f4f4f4;
`;

const Form_1 = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledLink = styled(RouterLink)`
  height: 21px;
  top: 539px;
  color: #ffffff;
  text-decoration: none;
  text-align: right;
  &:hover {
    text-decoration: underline;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  font-size: 18px;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  text-align: left;
  width: 42px;
  height: 18px;
  top: 370px;
  left: 996px;
`;

const Input_1 = styled.input`
  width: 378px;
  height: 46px;
  top: 396px;
  left: 996px;
  gap: 11.79px;
  border-radius: 4px;
  padding-top: 14.15px;
  padding-right: 17.29px;
  padding-bottom: 14.15px;
  padding-left: 17.29px;
  background: #e6e1faa3;
  backdrop-filter: blur(4px);
  border-width: 0.79px;
  // border-width: 0.79px solid #e4e4e7;
  box-sizing: border-box;
  padding: 10px 40px 10px 15px;

  &::placeholder {
    color: #ffff;
  }
`;

const Input_2 = styled.input`
  width: 379px;
  height: 46px;
  top: 483px;
  left: 996px;
  gap: 11.79px;
  border-radius: 4px;
  border-width: 0.79px;
  padding-top: 14.15px;
  padding-right: 17.29px;
  padding-bottom: 14.15px;
  padding-left: 17.29px;
  box-sizing: border-box;
  background: #e6e1faa3;
  backdrop-filter: blur(4px);
  // border-width: 0.79px solid #e4e4e7;

  &::placeholder {
    color: #ffff;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center; /* Keep checkbox and label in the same line */
  gap: 6px; /* Reduce space between checkbox & label */
`;

const Checkbox = styled.input`
  width: 20px;
  height: 25.15px;
  top: 537.35px;
  color: #ffffff;
  gap: 3px;
  cursor: pointer;
`;

const ForgotPassword = styled.a`
  width: 133px;
  height: 21px;
  top: 539px;
  left: 1242px;
  color: #ffffff;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = styled.a`
  height: 21px;
  top: 539px;
  color: #ffffff;
  text-decoration: none;
  text-align: right;
  &:hover {
    text-decoration: underline;
  }
`;

const Label_1 = styled.label`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 133px;
  height: 21px;
  top: 539px;
  left: 1242px;
  color: #ffffff;
  cursor: pointer; /* Makes clicking easier */
  gap: 6px; /* Small space between checkbox & text */
`;

const SignInButton = styled.button`
  width: 379px;
  height: 46px;
  border-radius: 8px;
  border: 0.79px solid #ffffff5e;
  background: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  // margin-left: 20px;

  &:hover {
    background: #f0f0f0;
  }
`;

const Main = styled.div`
  background: linear-gradient(to right bottom, #ffffff 5%, #183ba3 95%);
  overflow: hidden;
  min-height: 100vh;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
  width: 100%;
  padding: 0 50px;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 329px;
  height: 102.51px;
  margin-top: 50px;

  @media (max-width: 768px) {
    width: 329px;
    height: auto;
    margin: 20px auto;
  }
`;

const Ellipse = styled.img`
  width: 312px;
  height: 303px;
  position: absolute;
  top: -91px;
  right: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-top: 230px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Text = styled.div`
  width: 646px;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 120%;
  align-items: center;

  @media (max-width: 768px) {
    align-items: left;
    width: 500px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const Text_3 = styled.div`
  align-self: center;
  padding-right: 50px;

  @media (max-width: 768px) {
    padding-right: 22px;
    align-items: left;
  }
`;

const ButtonTask = styled.button`
  width: 120px;
  height: 46px;
  border-radius: 8px;
  border: 0.79px solid #ffffff5e;
  background: #fdbc30;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  margin-left:20px;
  &:hover {
    background: #f0f0f0;
  }
`;

const ButtonLogout = styled(ButtonTask)``;

export default Login;
