import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "./UserContext";

function Subscriptions () {
    const [membershipsData, setMembershipsData] = useState([]);
    const { loginDataReceived } = useContext(UserContext);
    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
    const config = {
        headers: {
            "Authorization": `Bearer ${loginDataReceived.data.token}`
        }
    };
    
    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then(response => {
            setMembershipsData(response.data);
        });
    },[]);

    function RenderPlans (props) {
        const { image, price, id } = props
        return (
            <>
                <div className="box">
                    <img src={image} alt={`${id}° plano`} />
                    <p>R$ {price}</p>
                </div>          
            </>
        )
    };

    return (
        <>
            <SubscriptionsStyles>
                <p>Escolha seu Plano</p>
                {membershipsData.map((plan, index) => (
                    <LinkStyles key={index} to={`/subscriptions/${plan.id}`} >
                        <RenderPlans  id={plan.id} image={plan.image} price={plan.price}/>
                    </LinkStyles>
                ))}
            </SubscriptionsStyles>
        </>
    )
};

const SubscriptionsStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin-top: 30px;
        margin-bottom: 24px;
    }
`;

const LinkStyles = styled(Link)`
    text-decoration: none;

    .box {
        width: 290px;
        height: 180px;
        background: #0E0E13;
        border: 3px solid #7E7E7E;
        border-radius: 12px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .box p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`;

export default Subscriptions;