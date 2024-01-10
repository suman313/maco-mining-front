import axios from 'axios';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BACKEND_LOCATION } from '../config';



const VideosLogs = () => {
    const [data, setstate] = React.useState([]);
    const [modalState, setModalState] = React.useState(false);
    const [img_url, setImg_url] = React.useState("");
    const headers = {
        "x-access-tokens": `${localStorage.getItem('user_access_token')}`
    };
    React.useEffect(() => {
        axios.get(`${BACKEND_LOCATION}get_drowsiness_alerts`, { headers }).then((resp) => {
            console.log(resp.data.alerts);
            setstate(resp.data.alerts)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const OpacityAnimation = keyframes`
0%{
   opacity: 0;
}
100%{
   opacity: 1;
}
`
    const LogComponent = styled.div`
margin: 22px 5%;
border: 2px #19d0f3 solid;
padding: 10px;
border-radius: 10px;
font-size: 18px;
display: flex;
justify-content: space-between;
align-items: center;
animation-name: ${OpacityAnimation};
animation-duration: 3s;
animation-iteration-count: 1
`
    const LogButton = styled.button`
color: #19d0f3 ;
border: 1px  #19d0f3 solid;
border-radius: 5px;
background-color: #ffff;
display: flex;
justify-content: space-between;
align-items: center;
&:hover {
   background-color: #19d0f3;
   color : white;
}
`
    const Mdal = styled.div`
position: absolute;
inset: 20%;
box-shadow: 1px 2px 20px 1120px #0f131c96;
z-index: 2;
`

    const openModal = async (url) => {
        console.log(url);
        setModalState(true)
        setImg_url(url)
    }


    return (

        <div style={{marginLeft: "210px"}}>
            {data.map((d) => {
                return (
                    <LogComponent >
                        {d.alert}
                        <LogButton href="" onClick={() => { openModal(d.alert_url) }} >
                            view
                        </LogButton>
                    </LogComponent>
                )
            })}

            {modalState ?
                <div style={{position : "fixed", inset : "0", zIndex: "2"}}>
                    <Mdal>
                        <img style={{ height: "100%", width : "100%" }} src={img_url} alt="" />
                        <div style={{display : "flex", flexDirection: "row", justifyContent :"space-around", alignItems: "center"}}>
                        <a href={img_url} target="_blank" rel="noopener noreferrer"> <LogButton style={{padding : "20px",}} >
                            download
                        </LogButton></a>
                        <LogButton onClick={()=>{setModalState(false)}} style={{padding : "20px",backgroundColor: "red", color: "black"}}>
                            close
                        </LogButton>
                        </div>
                    </Mdal>
                </div>
                : ""
            }
        </div>

    );
}

export default VideosLogs;

