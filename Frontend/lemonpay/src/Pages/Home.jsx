// import React from "react";
// import styled from "styled-components";
// import text_1 from "../images/text_1.png";
// import lemonpay from "../images/lemonpay.png";
// import Ellipse_1 from "../images/Ellipse_1.png";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
  
//   return (
//     <Main>
//       <NavbarContainer>
//         <Logo src={lemonpay} alt="logo" />
//         <Ellipse src={Ellipse_1} alt="ellipse" />
//       </NavbarContainer>

//       <HomeContainer>

//       <ButtonContainer>
//           <ButtonRegister onClick={() => navigate("/sign-up")}>Register</ButtonRegister>
//           <ButtonLogin onClick={() => navigate("/")}>Login</ButtonLogin>
//         </ButtonContainer>

//         <TextContainer>
//           <Text>
//             <img src={text_1} alt="text_1" />
//           </Text>
//         </TextContainer>

//       </HomeContainer>
//     </Main>
//   );
// };

// // Styled Components

// const Main = styled.div`
//   background: linear-gradient(to right bottom, #ffffff 5%, #183ba3 95%);
//   overflow: hidden;
//   min-height: 100vh;
// `;

// const NavbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 20px;
//   position: relative;

//     @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
// `;

// const Logo = styled.img`
//   width: 329px;
//   height: 102.51px;
//   margin-top: 50px;

//     @media (max-width: 768px) {
//     width: 329px;  
//     height: auto;
//     margin: 20px auto; 
//   }
// `;

// const Ellipse = styled.img`
//   width: 312px;
//   height: 303px;
//   position: absolute;
//   top: -91px;
//   right: 0;
//   max-width: 100vw;

//     @media (max-width: 768px) {
//   display:none;
//   }
// `;

// const HomeContainer = styled.div`
//   display: flex;
//   flex-direction: column; 
//   align-items: center;
//   justify-content: center;
//   height: 80vh;
//   width: 100%;
//   padding: 0 50px;
//   text-align: center;
// `;

// const TextContainer = styled.div`
//   flex: 1;
//   padding-top: 100px;
//   display: flex;
//   justify-content: center;

//   @media (max-width: 768px) {
//     align-items: center;
//     display: flex;
//     justify-content: center;
//     padding-left:20px
//   }
// `;

// const Text = styled.div`
//  width: 100%;
//   max-width: 646px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   img {
//     max-width: 646px;;
//     height: auto;  
//   }

//   @media (max-width: 768px) {
//     max-width: 500px;
//     text-align: center;
//     height:200px;
//   }
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 50px; 
//   margin-top: 100px;
//   justify-content: center;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     gap: 20px;
//   }
// `;

// const ButtonRegister = styled.button`
//   width: 120px;
//   height: 46px;
//   border-radius: 8px;
//   border: 0.79px solid #ffffff5e;
//   background: #fdbc30;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   align-items: center;

//   &:hover {
//     background: #f0f0f0;
//   }
// `;

// const ButtonLogin = styled(ButtonRegister)``;

// export default Home;
