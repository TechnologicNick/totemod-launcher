import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import './App.scss';

// Page components
import PageMods from './PageMods';

export interface Page {
  path: string;
  displayName: string;
  component?: any;
}

export const pages: Page[] = [
  { path: "/mods", displayName: "Mods", component: <PageMods /> },
  { path: "/modpacks", displayName: "Modpacks" },
];

export function App() {
  return (
    <>
      <Router>
        <Sidebar pages={pages}/>
        <Switch>
          {pages.map(page => (
            <Route key={page.path} path={page.path}>
              {page.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </>
  );
}
