import React from 'react'
import { useQuery,gql} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
const GET_COUNTRYES = gql`
query GetCuntrys{
  countries {
    code
    name
    continent{
      code
      name
    }
  }
}
`
export default function Home() {
  const navigate = useNavigate();
    const {loading,error,data} =useQuery(GET_COUNTRYES)
    console.log(data)
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
    return (
    <div className='d-flex flex-wrap gap-2 container my-5'>
    {
    data?.countries.map(({code,name})=>(
        <div key={code} className={code ==="IN"? "card card-body shadow text-uppercase border-0 myFlag":"card card-body shadow text-uppercase border-0" } style={{width:"300px"}}>
        <small className='text-muted'>{code}</small>
        <h6>{name}</h6>
        <button className='btn btn-sm btn-success ' onClick={()=>{navigate(`details/${code}`)}}>Details</button>
        </div>
    ))
    }
  </div>
  )
}
