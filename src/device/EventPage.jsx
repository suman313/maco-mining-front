import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import "../company/company.css"
import { BACKEND_LOCATION } from '../config';

const EventPage = () => {

    const take = 10
    const [skip, setSkip] = React.useState(0);
    const [alldata, setalldata] = React.useState([]);
    const [count, setcount] = React.useState(0);

    const { id } = useParams();

    React.useEffect(() => {
        callFunction()
    }, []);

    const callFunction = async () => {
        const resp = await axios.get(`${BACKEND_LOCATION}api/event/read?devices_ids=${id}&take=${take}&skip=${skip}`, { withCredentials: true });

        setalldata(resp.data)
        // console.log(alldata);
        setcount(1);
    };
    if (count === 1) {
        return (
            <div>
                <div className='log'>
                    {alldata.map((data) => {
                        // console.log(data)
                        if (data.content.toString().split('_').length === 2) {
                            return (
                                <div className='maplog' key={data.id}>
                                    <div >{data.content.toString().split('_')[1]} </div>   <div>  {data.type}</div> <div>  {data.time}  </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className='maplog' key={data.id}>
                                    <div >{data.content} </div>   <div>  {data.type}  </div> <div>  {data.time}  </div>
                                </div>
                            )
                        }



                    })}

                   <div style={{display:"flex",justifyContent:"space-evenly"}} >
                   <div onClick={()=>{skip===0?setSkip(0):setSkip(skip-10);callFunction()}} className='card_button'> pre </div>
                    <div className='card_button' onClick={()=>{setSkip(skip+10);callFunction()}} > next</div>
                   </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                hello
            </div>
        )
    }

}


export default EventPage;
