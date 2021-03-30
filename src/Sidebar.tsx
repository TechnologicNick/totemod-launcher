import React from 'react'
import SidebarItem from './SidebarItem';
import { Page } from './App';

export default function Sidebar(props: { pages: Page[] }) {
    return (
        <ul>
            {props.pages.map(page => {
                return (
                    <SidebarItem key={page.path} path={page.path} displayName={page.displayName} />
                )
            })}
        </ul>
    )
}
