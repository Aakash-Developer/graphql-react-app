import React from 'react'
// import { useParams } from 'react-router-dom'
import { useQuery,gql } from '@apollo/client'
import { useParams } from 'react-router-dom'


const GET_DETAILS = gql`
  query GetCountry($country_code: ID!){
    country(code: $country_code) {
      code
      native
      name
      currency
      phone
      languages {
        code
        name
      }
      emoji
      capital
      states {
        code
        name
      }
      continent {
        code
        name
      }
      subdivisions {
        code
        name
      }
    }
  }
`;

export default function Details() {
  const { country_code } = useParams(); // Use useParams to get the 'country_code' from the URL
  const { loading, error, data } = useQuery(GET_DETAILS, {
    variables: { country_code },
  });
  if(loading) return (
    <div className='container py-5'>
    <div className='alert alert-warning'>loading......</div>
    </div>
  )
  if(error) return (
    <div className='container py-5'>
    <div className='alert alert-danger'>Error : {error.message}</div>
    </div>
  )
  const {code,native,name,currency,phone,languages,capital,states,continent,subdivisions} = data?.country

  return (
    <div className='container'>
      <h2 className='text-center fw-bolder my-5 card card-body shadow-ms text-uppercase '>Details</h2>
      {
        data?.country.code === country_code? (
      <div>
      <div className={code === "IN"? 'card card-body border-0 shadow d-flex myFlag justify-content-center align-items-center':'card card-body border-0 shadow d-flex other justify-content-center align-items-center'} style={{height:"300px"}}>
      <h1 className='text-uppercase' style={{fontSize:"90px"}}>{native}</h1>
      <h5 className='text-uppercase'>{name}</h5>
      <p className='m-0'>Capital : {capital}</p>
      <p className='m-0'>{continent?.name}</p>
      </div>
      <div className='d-flex'>
      <div className='p-2 rounded card card-body shadow border-0  m-2 w-50'>Currency : {currency}</div>
      <div className='p-2 rounded card card-body shadow border-0  m-2 w-50'>Phone Code : +{phone}</div>
      </div>
      <div className='d-flex flex-column'>
      <div className='p-2 rounded card card-body shadow border-0  m-2'>
      <h3 className="mb-3 text-uppercase fw-bolder">Languages</h3>
      <div className='d-flex gap-3'>
      {
        languages?.map(({code,name})=>(
          <div className='card card-body mb-2' key={code}>
          <small className='text-mute'>Languages Code : {code}</small>
          <h6 className='fw-bold'>Languages Name :{name}</h6>
          </div>
        ))
      }
      </div>
      </div>

      <div className='p-2 rounded card card-body shadow border-0  m-2'>
      <h3 className="mb-3 text-uppercase fw-bolder">States</h3>
      <div className='d-flex gap-3 flex-wrap'>
      {
        states?.map(({code,name})=>(
          <div className='card card-body mb-2 w-25 border-0 shadow' key={code}>
          <small className='text-mute'>States Code : {code}</small>
          <h6 className='fw-bold'>States Name : {name}</h6>
          </div>
        ))
      }
      </div>
      </div>

      <div className='p-2 rounded card card-body shadow border-0  m-2'>
      <h3 className="mb-3 text-uppercase fw-bolder">subdivisions</h3>
      <div className='d-flex gap-3 flex-wrap'>
      {
        subdivisions?.map(({code,name})=>(
          <div className='card card-body mb-2 w-25 border-0 shadow' key={code}>
          <small className='text-mute'>Continent Code : {code}</small>
          <h6 className='fw-bold'>Continent Name : {name}</h6>
          </div>
        ))
      }
      </div>
      </div>
      
      </div>
      </div>
        ):null 
      }
    </div>
  );
}
