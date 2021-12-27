import React from 'react'
import { NavLink } from 'react-router-dom';
import halfmoon from 'halfmoon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
// import SidebarItem from './SidebarItem';
import { Page } from '../App';

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

                  props.pages.filter(page => page.sidebar).forEach((page: Page, index: number) => {
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

                <div className="position-absolute bottom-0 right-0 z-10 p-10">
                  <button className="btn btn-square" type="button" onClick={halfmoon.toggleDarkMode.bind(halfmoon)}>
                    <FontAwesomeIcon icon={faMoon} />
                    <i className="fa fa-moon-o" aria-hidden="true"></i>
                    <span className="sr-only">Toggle dark mode</span>
                  </button>
                </div>
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
