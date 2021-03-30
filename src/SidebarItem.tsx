import React from 'react'
import { Link } from 'react-router-dom';

export default function SidebarItem(props: { path: string; displayName: string; }) {
    return (
        <li>
            <Link to={props.path}>{props.displayName}</Link>
        </li>
    )
}
