import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function UserUpdate () {
    const navigate = useNavigate();


    function comeBack () {
        navigate(-1);
    };

    return (
        <>
            <UserUpdateStyles>
                <ion-icon onClick={() => comeBack()} name="arrow-back"></ion-icon>
            </UserUpdateStyles>
        </>
    )
}

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

`
export default UserUpdate;