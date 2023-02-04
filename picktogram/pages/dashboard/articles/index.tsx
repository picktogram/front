import React from 'react'
import {useQuery } from "react-query"
import axios from 'axios'
import LocalStorage from '@/util/localStorage'

export default function DashBoardPage() {
  const token = LocalStorage.getItem('token')
  const fetchArticles = async (token : string | undefined | null) => {
    try {
      const res = await axios.get("http://13.209.193.45:3000/api/v1/articles?limit=10&page=1", {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      const data = await res.data.data
      return data
    } catch (err) {
      return err
    }
  }

  const { data } = useQuery(['articles'], () => fetchArticles(token))
  console.log(data)

  return (
    <div>DashBoardPage</div>
  )
}
