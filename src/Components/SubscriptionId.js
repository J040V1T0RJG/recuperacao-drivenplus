import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import UserContext from "./UserContext";

function SubscriptionId () {
    
    const navigate = useNavigate();
    const params = useParams();
    const { loginDataReceived } = useContext(UserContext);
    const [toggleModel, setToggleModel] = useState(false);
    const [advantagesData, setAdvantagesData] = useState([]);
    const [advantagesDataPerks, setAdvantagesDataPerks] = useState([]);
    const [cardData, setCardData] = useState({cardName: "", cardNumber: "", securityNumber: "", expirationDate: ""})

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.idSubscription}`
    const config = {
        headers: {
            "Authorization": `Bearer ${loginDataReceived.data.token}`
        }
    };

    useEffect(() => {
        const promise = axios.get(URL, config );
        promise.then(response => {
            setAdvantagesData(response.data);
            setAdvantagesDataPerks(response.data.perks)
        });
    },[]);

    function comeBack () {
        navigate(-1);
    };

    function confirm (e) {
        e.preventDefault();
        setToggleModel(true)
    };

    function cancell () {
        setToggleModel(false)
    };

    function sendData () {
        const URLsend = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const promise = axios.post(URLsend, {
            membershipId: params.idSubscription,
            cardName: cardData.cardName,
            cardNumber: cardData.cardNumber,
            securityNumber: cardData.securityNumber,
            expirationDate: cardData.expirationDate
        }, config)
        promise.then(response => {
            navigate("/home");
        });
        promise.catch(err => {
            alert(err.response.data.message)
        });
    };

    function RenderModel () {
        return (
            <>
                <ModalStyles>
                    <div className="position">
                        <div className="close" onClick={() => cancell()}>
                            <ion-icon name="close"></ion-icon>
                        </div>   
                        <div className="modal">
                            <p>Tem certeza que deseja <br /> assinar o plano <br /> Driven Plus (R$ {advantagesData.price})?</p>
                            <div className="organizate4">
                                <div className="button" onClick={() => cancell()}><p>Não</p></div>
                                <div className="button" onClick={() => sendData()}><p>SIM</p></div>
                            </div>
                        </div>  
                    </div>
                </ModalStyles>
            </>
        )
    };

    function RenderPerks (props) {
        const { position, title } = props
        return (
            <><p>{position}. {title}</p></>
        )
    };

    return (
        <>
            <SubscriptionIdStyles>
                <ion-icon onClick={() => comeBack()} name="arrow-back"></ion-icon>
                <img src={advantagesData.image} alt="" />
                <p>{advantagesData.name}</p>
                <div className="perks">
                    <div className="organizate1" >
                        <ion-icon name="reader-outline"></ion-icon>
                        <p>Benefícios:</p>
                    </div>
                    <div className="organizate2">
                        {advantagesDataPerks.map((perk, index) => (
                            <RenderPerks key={index} position={index + 1} title={perk.title}/>
                        ))}
                    </div>
                    <div className="organizate1" >
                        <ion-icon name="cash-outline"></ion-icon>
                        <p>Preço:</p>
                    </div>
                    <p>R$ {advantagesData.price} cobrados mensalmente</p>
                </div>

                <SubscriptionIdFormStyles onSubmit={confirm}>
                    <input 
                        type="text" 
                        placeholder="Nome impresso no cartão"
                        value={cardData.cardName}
                        required
                        onChange={e => setCardData({...cardData, cardName: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Digitos do cartão"
                        value={cardData.cardNumber}
                        required
                        onChange={e => setCardData({...cardData, cardNumber: e.target.value})}
                    />
                    <div className="organizate3">
                        <input 
                            type="number" 
                            placeholder="Código de segurança"
                            value={cardData.securityNumber}
                            required
                            onChange={e => setCardData({...cardData, securityNumber: e.target.value})}
                        />
                        <input 
                            type="number" 
                            placeholder="Validade"
                            value={cardData.expirationDate}
                            required
                            onChange={e => setCardData({...cardData, expirationDate: e.target.value})}
                        />
                    </div>
                    <button type="submit"><p>ASSINAR</p></button>
                </SubscriptionIdFormStyles>
                {toggleModel ? <RenderModel /> : <></>}
            </SubscriptionIdStyles>
        </>
    )
};

const SubscriptionIdStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin-top: 90px;
    }

    > p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin-top: 12px;
        margin-bottom: 22px;
    }

    > ion-icon {
        width: 28px;
        height: 28px;
        color: #FFFFFF;
        transform: matrix(1, 0, 0, -1, 0, 0);
        position: absolute;
        left: 22px;
        top: 24px;
    }

    .perks {
        width: 300px;
    }

    .perks p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }

    .perks .organizate1 {
        display: flex;
        margin-bottom: 5px;
    }

    .perks .organizate1 p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin-left: 5px;
    }

    .perks .organizate2 {
        margin-top: 10px;
        margin-bottom: 12px;
    }

    .perks ion-icon {
        width: 12px;
        height: 16px;
        color: #FF4791;;
    }
`;

const SubscriptionIdFormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 34px;

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

    .organizate3 {
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .organizate3 input {
        width: 130px;
    }
`;

const ModalStyles = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    top: 0px;
    background-color: rgb(0,0,0,0.5);

   .position {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
   }

    .close {
        width: 28px;
        height: 24px;
        background-color: #FFFFFF;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-weight: bold;
        font-size: 100px;
        margin-left: 90%;
        margin-top: 26px;

    }

    .modal {
        width: 248px;
        height: 210px;
        background: #FFFFFF;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 190px;
    }

    .modal > p {
        width: 204px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin-top: 33px;
    }

    .organizate4 {
        width: 208px;
        display: flex;
        justify-content: space-between;
        margin-top: 48px;
    }

    .organizate4 .button {
        width: 95px;
        height: 52px;
        background: #CECECE;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .organizate4 .button p {
        width: 25px;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }

    .organizate4 > :nth-child(2) {
        background-color: #FF4791;
    }
`;

export default SubscriptionId;