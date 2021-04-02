import React from 'react'
import { NavLink } from 'react-router-dom';
// import SidebarItem from './SidebarItem';
import { Page } from './App';

export function Sidebar(props: { pages: Page[] }) {
    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <a href="#" className="sidebar-brand">
                  {/* <img src={icon} alt="..." /> */}
                  Totemod Launcher
                </a>

                {(() => {
                  let out: JSX.Element[] = [];
                  let currentCategory: string = "";

                  props.pages.forEach((page: Page, index: number) => {
                    const si = <SidebarItem key={page.path} path={page.path} displayName={page.displayName} />;

                    if (currentCategory !== page.category) {
                      currentCategory = page.category;
                      
                      console.log(page.category);

                      out.push(<br key={page.category + '_spacing'}/>);
                      out.push(<SidebarCategory key={page.category} displayName={page.category} />);
                    }

                    out.push(si);
                  });

                  console.log(out.map(a => a.key));

                  return out;

                })()}
            </div>
        </div>
    )
}

export function SidebarCategory(props: { displayName: string; }) {
  return (
    <>
      <h5 className="sidebar-title">{props.displayName}</h5>
      <div className="sidebar-divider"></div>
    </>
  )
}

export function SidebarItem(props: { path: string; displayName: string; }) {
  return (
      <NavLink to={props.path} className="sidebar-link" activeClassName="active">{props.displayName}</NavLink>
  )
}
