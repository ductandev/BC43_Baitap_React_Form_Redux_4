import React, { Component } from 'react'
// Component này sẽ đại diện cho component được load trên url
import { Outlet, NavLink } from 'react-router-dom'

export default class HomeTemplate extends Component {
    render() {
        return (
            <div>
                <header className='header p-3 bg-dark text-white'>
                    <nav className='d-flex'>
                        {/*Active class và  Active style*/}
                        <NavLink to="/" className={({isActive})=> isActive? 'text-dark mx-2 nav-link bg-white p-2' : 'text-white bg-dark mx-2 nav-link'} style={({isActive})=> isActive ? {border:'1px solid orange'} : {}}>React Form</NavLink>
                        <NavLink to="/demo" className={({isActive})=> isActive? 'text-dark mx-2 nav-link bg-white p-2' : 'text-white bg-dark mx-2 nav-link'} style={({isActive})=> isActive ? {border:'1px solid orange'} : {}}>Demo</NavLink>
                    </nav>
                </header>
                <main style={{minHeight:'600px'}}>
                    <Outlet></Outlet>
                </main>
                <footer className='bg-dark text-white p-3 text-center'>
                    <h1>Footer</h1>
                </footer>
            </div>
        )
    }
}
 