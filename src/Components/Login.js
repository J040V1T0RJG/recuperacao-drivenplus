import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";

import UserContext from "./UserContext";

function Login () {
    const [dataLogin, setDataLogin] = useState({email: "", password: ""})
    const { setLoginDataReceived } = useContext(UserContext)


    function sendLogin (e) {
        e.preventDefault();

        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"
        const promise = axios.post(URL,{
            email: dataLogin.email,
            password: dataLogin.password
        });
        promise.then(response => {
            setLoginDataReceived(response)
            console.log("entrei")
            console.log("response", response)
        });
        promise.catch(err => {
            alert(`${err.response.data.message}`)
        });

    }





    return (
        <>
        <LoginStyles>
            <img src="img/Driven_white 1.svg" alt="logomarca" />
            <LoginFormStyles onSubmit={sendLogin}>
                <input 
                    type="email" 
                    placeholder="E-mail"
                    value={dataLogin.email}
                    required
                    onChange={e => setDataLogin({...dataLogin, email: e.target.value})}

                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    value={dataLogin.password}
                    required
                    onChange={e => setDataLogin({...dataLogin, password: e.target.value})}

                />
                <button type="submit"><p>ENTRAR</p></button>
            </LoginFormStyles>
            <LinkStyles to={"/sign-up"}>
                <div className="dontHaveAccount"><p>Não possuí uma conta? Cadastre-se</p></div>
            </LinkStyles>
        </LoginStyles>
        </>
    )
};

const LoginStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;

    img {
        width: 300px;
        margin-bottom: 100px;
    }
`;

const LoginFormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 290px;
        height: 52px;
        background: #FFFFFF;
        border-radius: 8px;
        padding-left: 10px;
        margin-bottom: 10px;
    }

    input::placeholder {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #7E7E7E;
    }

    button {
        width: 300px;
        height: 52px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        gap: 10px;
        background: #FF4791;
        border-radius: 8px;
        border: none;
        margin-top: 14px;
        margin-bottom: 24px; 
        cursor: pointer;
    }

    button p {
        width: 54px;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`;

const LinkStyles = styled(Link)`
     text-decoration: none;

    .dontHaveAccount p {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            text-decoration-line: underline;
            color: #FFFFFF;
        }
`;

export default Login;