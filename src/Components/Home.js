import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "./UserContext";

function Home () {
    const navigate = useNavigate();
    const { loginDataReceived, setLoginDataReceived } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${loginDataReceived.data.token}`
        }
    };

    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login";
    useEffect(() => {
        const promise = axios.post(URL,{
            email: loginDataReceived.data.email,
            password: loginDataReceived.data.password
        });
        promise.then(response => {
            setLoginDataReceived(response);
        });
    },[]);

    function changePlan () {
        navigate("/subscriptions")
    };

    function cancell () {
        const URLdelete = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const promise = axios.delete(URLdelete, config)
        promise.then(response => {
            console.log("response delete", response)
            navigate("/subscriptions")
        });
        promise.catch(err => {
            console.log("err delete", err)
        });
    };

    function RenderPerks (props) {
        const { title, link } = props
        return (
            <>
                <a href={link} target="_blank">
                    <div className="button" ><p>{title}</p></div>
                </a>
            </>
        )
    };

    return (
        <>
            <HomeStyles>
                <img src={`${loginDataReceived.data.membership !== null && loginDataReceived.data.membership.image}`} alt="" />
                <ion-icon name="person-circle"></ion-icon>
                <p>Olá, {loginDataReceived.data.membership !== null && loginDataReceived.data.name}</p>
                
                {loginDataReceived.data.membership !== null && loginDataReceived !== undefined && loginDataReceived.data.membership.perks.map((perk, index) => (
                    <RenderPerks key={index} title={perk.title} link={perk.link}/>
                ))};
                
                <div className="button changePlan" onClick={() => changePlan()}><p>Mudar plano</p></div>
                <div className="button cancell" onClick={() => cancell()}><p>Cancelar plano</p></div>
            </HomeStyles>
        </>
    )
};

const HomeStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        height: 50px;
        position: absolute;
        top: 22px;
        left: 22px;
    }

    ion-icon {
        width: 34px;
        height: 34px;
        color: #FFFFFF;
        position: absolute;
        top: 22px;
        right: 22px;
    }

    > p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        margin-top: 100px;
        margin-bottom: 50px;
    }

    a {
        text-decoration: none;
    }

    .button {
        width: 299px;
        height: 52px;
        background-color: #FF4791;
        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .button p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }

    .button.cancell {
        background-color: #FF4747;
        position: absolute;
        bottom: 12px;
    }

    .button.changePlan {
        position: absolute;
        bottom: 74px;
    }
`;

export default Home;