import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Card(props) {

    const navigate = useNavigate()

    const {title, image, amount, descrip, id, date } = props.item

    // Function to format the date
    const formatDate = (date) => {
      if (!date || !date.seconds) {
          return 'Invalid date';
      }
      return new Date(date.seconds * 1000).toString();
  }


  return (
    <div
    onClick={() => navigate(`detail/${id}`)}
    style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}
    >

        <h2>{title}</h2>
        <img src={image} width={'200px'} height={'200px'}/>
        <h4>Rs, {amount}</h4>
        <p>{descrip}</p>
        {/* <p>Date: {new Date(date).toLocaleString()}</p>  */}
        <p>Date: {formatDate(date)}</p>

    </div>
  )
}




