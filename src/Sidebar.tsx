import React from 'react'
import SidebarItem from './SidebarItem';
import { Page } from './App';

export default function Sidebar(props: { pages: Page[] }) {
    return (
        <div>
            <span>Sidebar</span>
            {props.pages.map(page => {
                return (
                    <SidebarItem key={page.path} path={page.path} displayName={page.displayName} />
                )
            })}
        </div>
    )
}
