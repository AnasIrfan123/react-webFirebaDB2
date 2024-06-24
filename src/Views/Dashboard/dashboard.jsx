// user profile folder firebase info
// delete ads and info tile descrip amount etc
// update items and info tile descrip amount etc
// sweetalert 
// add to cart with redux krna chaho to krlo  // redux and protect route 
// theme change redux sy refresh par bh wohi rahegi
// map    react-map-gl  map dashboard me lgna ha map ka icon map ka maker 1 state bnegi or uski location map ki enter kare to firebase me save bh ho 
// my ads 
// ad post me or detail chaye example date & time stock discou search kro or kia kia hota ha 
// is prj ki ui ka pora kam bekhra pra ha responsive ness dekh lena ha apne

import { useNavigate } from "react-router-dom";
import { dashboard } from "../../config/firebase";
import { useEffect, useState } from "react";
import { logout, auth, onAuthStateChanged} from "../../config/firebase";

import './dashboard.css'
import Assets from '../../Assets/d73449313ecedb997822efecd1ee3eac.gif'
import Card from "../../components/Card";

function Dashboard() {

    const [ad, setAd] = useState([])
    const [currtEmail, setCurrtEmail] = useState('')
    const navigate = useNavigate()



    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(auth);
                const currtEmail = auth.currentUser.email;
                console.log('currtEmail: ',currtEmail);

                setCurrtEmail(currtEmail);
        
                  getData()
        
            } else {
                   navigate('/')  // user is SignOut moved to the login page immediately
            }
           })

        // getData()
    }, [])


    const getData = async () => {

        const adsData = await dashboard();
        console.log(adsData);                // yhn uid or id 2no log m ha is ko pakr kr curent user ki email id extract kr k show kr sakte hn 
        setAd(adsData)


    }

    if (!ad.length) {  //ad == ''  //ad === 0
        return <div>
            <img src={Assets} alt="" />
        </div>
    }

    async function Logout() {
       try {
        await logout()
        navigate('/')
       } catch (error) {
        console.log(error);
       }

    }

    return (
        <div>
            <h1>welcome to Dashboard</h1>            <h3>Home</h3>      <h2>Foods</h2>

            <button
             style={{color: 'white', padding: '10px', backgroundColor: 'yellowgreen', borderRadius: '7px', fontWeight: 'bold'}}
             onClick={() => navigate('/addpost')}
             >addpost</button>

             <div>
                <p>User: {currtEmail}</p>
             </div>

             <div className="logout">
                <button onClick={Logout}>LogOut</button>
             </div>


        {ad.map(function (item) {
            return (
                <div className="container">

                
                  {/* <div className="items">

                     <h2>title: {item.title}</h2>
                     { <img src={item.image} alt="" width={'200px'} height={'200px'}/> }
                     <h4>Rs, {item.amount} </h4>
                     <p>descrip: {item.descrip} </p>

                  </div> */}

                  <Card item = {item} />

                 
                </div>
            )
        })}


        </div>
    )
}

export default Dashboard;



