import React from 'react'
import { NavLink } from "react-router-dom"

export default function NavMobile() {
  return (
    <div className={style.divLinks}>
    <NavLink
      to={`/home`}
      className={({ isActive }) =>
        isActive ? style.active : style.disable
      }
    >
      Home
    </NavLink>
    <NavLink
      to={`/about`}
      className={({ isActive }) =>
        isActive ? style.active : style.disable
      }
    >
      About
    </NavLink>
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
