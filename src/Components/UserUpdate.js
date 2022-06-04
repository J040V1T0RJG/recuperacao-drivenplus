import styled from "styled-components";
import { useNavigate, useParams  } from "react-router-dom";
import { useState, useContext} from "react";
import axios from "axios";

import UserContext from "./UserContext";

function UserUpdate () {
    const params = useParams();
    const navigate = useNavigate();
    const { loginDataReceived } = useContext(UserContext);
    const [updateData, setUpdateData] = useState({name: "", email: "", currentPassword: "", newPassword: ""});
    const config = {
        headers: {
            "Authorization": `Bearer ${loginDataReceived.data.token}`
        }
    };

    function comeBack () {
        navigate(-1);
    };

    function sendUpdate (e) {
        e.preventDefault();

        const URLupdate = "https://mock-api.driven.com.br/api/v4/driven-plus/users/";
        const promise = axios.put(URLupdate,{
            name: updateData.name,
            cpf: loginDataReceived.data.cpf,
            email: updateData.email,
            currentPassword: updateData.currentPassword,
            newPassword: updateData.newPassword
          }, config);
        promise.then(response => {
            navigate(`/users/${params.idUser}`)
        });
        promise.catch(err => {
            alert(`${err.response.data.message}`);
        });
    };

    return (
        <>
            <UserUpdateStyles >
                <ion-icon onClick={() => comeBack()} name="arrow-back"></ion-icon>
                <UserUpdateFormStyles onSubmit={sendUpdate}>
                    <input 
                        type="text" 
                        placeholder={loginDataReceived.data.name}
                        value={updateData.name}
                        required
                        onChange={e => setUpdateData({...updateData, name: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder={loginDataReceived.data.cpf}
                        disabled
                    />
                    <input 
                        type="email" 
                        placeholder={loginDataReceived.data.email}
                        value={updateData.email}
                        required
                        onChange={e => setUpdateData({...updateData, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha atual"
                        value={updateData.currentPassword}
                        required
                        onChange={e => setUpdateData({...updateData, currentPassword: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Nova senha"
                        value={updateData.newPassword}
                        onChange={e => setUpdateData({...updateData, newPassword: e.target.value})}
                    />
                    <button type="submit"><p>SALVAR</p></button>
                </UserUpdateFormStyles>
            </UserUpdateStyles>
        </>
    )
};

const UserUpdateStyles = styled.div`

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

const UserUpdateFormStyles = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;

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

export default UserUpdate;