import React from 'react'

import { logOut } from '../utils/auth'

function Header(props) {
    const { isLoggedIn } = props

    const onLogout = (event) => {
        event.preventDefault()
        logOut(event)
    }

    return (
        <div className="app-header">
            <h1 className="app-header-title">ToDoMe</h1>
            { isLoggedIn && <a href="#" className="app-header-logout" onClick={event => onLogout(event)}>Logout</a> }
        </div>
    )
}

export default Header