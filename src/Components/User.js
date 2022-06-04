import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import UserContext from "./UserContext";

function User () {

    const navigate = useNavigate();
    const params = useParams();
    const { loginDataReceived } = useContext(UserContext);

    function comeBack () {
        navigate(-1);
    };

    function update () {
        navigate(`/users/${params.idUser}/update`)
    };

    return (
        <>
            <UserStyles>
                <ion-icon onClick={() => comeBack()} name="arrow-back"></ion-icon>
                <UserFormStyles>
                    <input 
                        placeholder={loginDataReceived.data.name}
                        disabled
                    />
                    <input 
                        placeholder={loginDataReceived.data.cpf}
                        disabled
                    />
                    <input 
                        placeholder={loginDataReceived.data.email}
                        disabled
                    />
                    <div className="button" onClick={() => update()}><p>ATUALIZAR</p></div>
                </UserFormStyles>
            </UserStyles>
        </>
    )
}

const UserStyles = styled.div`
    display: flex;
    flex-direction: column;

    > ion-icon {
        width: 28px;
        height: 28px;
        color: #FFFFFF;
        transform: matrix(1, 0, 0, -1, 0, 0);
        position: absolute;
        left: 22px;
        top: 24px;
    }
`;

const UserFormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;

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

    .button {
        width: 300px;
        height: 52px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #FF4791;
        border-radius: 8px;
        border: none;
        margin-top: 14px;
        margin-bottom: 24px; 
        cursor: pointer;
    }

    .button p {
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`;

export default User;