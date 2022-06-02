import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function Sign_up () {
    const navigate = useNavigate();
    const [dataSign_up, setDataSign_up] = useState({name: "", cpf: "", email: "", password: "" })

    function sendSign_up (e) {
        e.preventDefault();

        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"
        const promise = axios.post(URL, {
            email: dataSign_up.email,
            name: dataSign_up.name,
            cpf: dataSign_up.cpf,
            password: dataSign_up.password
        });
        promise.then(response => {
            navigate("/");
        })
        promise.catch(err => {
            alert(`${err.response.data.message}`)
        })
    };

    return (
        <>
            <Sign_upStyles>
                <Sign_upFormStyles onSubmit={sendSign_up}>
                    <input 
                        type="text"
                        placeholder="Nome"
                        value={dataSign_up.name}
                        required
                        onChange={e => setDataSign_up({...dataSign_up, name: e.target.value})}
                    />
                    <input 
                        type="number"
                        placeholder="CPF"
                        value={dataSign_up.cpf}
                        required
                        onChange={e => setDataSign_up({...dataSign_up, cpf: e.target.value})}
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={dataSign_up.email}
                        required
                        onChange={e => setDataSign_up({...dataSign_up, email: e.target.value})}
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={dataSign_up.password}
                        required
                        onChange={e => setDataSign_up({...dataSign_up, password: e.target.value})}
                    />
                    <button type="submit"><p>CADASTRAR</p></button>
                </Sign_upFormStyles>
                <LinkStyles to={"/"}> 
                    <div className="haveAccount"><p>Já possuí uma conta? Entre</p></div>
                </LinkStyles>
            </Sign_upStyles>
        </>
    )
};

const Sign_upStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;
`;

const Sign_upFormStyles = styled.form`
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

    .haveAccount p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #FFFFFF;
    }
`;

export default Sign_up;