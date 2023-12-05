import React, {useEffect, useState} from 'react'
import './Users.css'

import Navbar from '../../components/Navbar/Navbar'

import { IoIosSearch } from "react-icons/io";
import {axiosReq} from '../../utils/apiCalls'

const Users = () => {

    const [filter, setFilter] = useState(0)
    const [search, setSearch] = useState("")

    const [users, setUsers] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosReq.get(`/admin/users?filter=${filter}&search=${search.toUpperCase()}`)
                setUsers(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [filter, search])

    const handleChange = (e) => {
       if(search.length > 1){
        setSearch(e.target.value)
        setFilter(3)
       } else {
        setSearch(e.target.value)
        setFilter(0)
       }
    }

  return (
    <div className='users'>
        <Navbar type="white" />
        <div className="wrapper">
            <h2>Tutti gli utenti</h2>
            <div className="users__topbar">
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value={0}>Tutti gli utenti</option>
                    <option value={1}>Organizzatori</option>
                    <option value={2}>Admin</option>
                </select>
                <form>
                    <input type="text" placeholder='Cerca...' value={search} onChange={(e) => handleChange(e)} />
                    <IoIosSearch />
                </form>
            </div>

            <div className="users__container">
                <div className="users__container-topbar">
                    <span>id</span>
                    <span>nome</span>
                    <span>email</span>
                    <span>classe</span>
                </div>
                <div className="users__container-items">
                    {users?.map(item => (
                        <a href={`/admin/user/${item._id}`}>
                            <span>{item._id}</span>
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            <span>{item.classe}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>


    </div>
  )
}

export default Users