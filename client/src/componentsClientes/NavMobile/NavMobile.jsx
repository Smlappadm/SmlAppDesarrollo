import { Button } from '@mui/material'
import React from 'react'


export default function NavMobile() {
  return (
    <div className={style.divLinks}>


    <NavLink
      to={`/favorites`}
      className={({ isActive }) =>
        isActive ? style.active : style.disable
      }
    >
      Favorites
    </NavLink>
  </div>
  )
}
