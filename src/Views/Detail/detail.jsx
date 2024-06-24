import { useEffect, useState } from "react";
import { getSingleAd, getUserInfo } from "../../config/firebase";
import { useNavigate, useParams } from "react-router-dom";

import Assets from '../../Assets/d73449313ecedb997822efecd1ee3eac.gif'
import './detail.css';

function Detail () {
    const navigate = useNavigate()
    const [singlAd, setSinglAd] = useState(null)
    const {adId} = useParams()

    const [userDetl, setUserDetl] = useState()


useEffect(() => {
  UserAdsDetl()
}, [])

const UserAdsDetl = async () => {

  
  const ad = await getSingleAd(adId)
  // console.log(ad);
  setSinglAd(ad)

  if (ad && ad.uid) {
    const user = await getUserInfo(ad.uid)
    console.log('user', user);

    setUserDetl(user)
  }
   }

   if (!singlAd) {
      return <div>
        <img src={Assets} alt="" />
      </div>
   }

    return (
        <div>
            <h5>Detail</h5>   <h3>User ads Info</h3>
          
          <div className="butn">
            <button onClick={() => navigate(-1)}>back</button>
          </div>


           
           <div className="items">
            
               <h2>Title: {singlAd.title}</h2>
               <img src={singlAd.image} width={'400px'} height={'400px'} />
               <h4>Amount: {singlAd.amount}</h4>
               <p>Description: {singlAd.descrip}</p> 
               
        
               {userDetl ? (
           <>
             <h5>{userDetl.fullname}</h5>
             <p>{userDetl.email}</p>
             <p>{userDetl.phoneNumb}</p>
           </>
         ) : (
           <p>Loading user details...</p>
         )}

           </div>


        </div>
    )
}

export default Detail;
//useparams sy ad ki id nikalti ha 

