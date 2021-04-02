import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import './App.scss';
// import 'halfmoon/css/halfmoon-variables.min.css';
// import 'halfmoon';

// Page components
import PageMods from './PageMods';

export interface Page {
  category: string;
  path: string;
  displayName: string;
  component?: any;
}

export const pages: Page[] = [
  { category: "Installed", path: "/mods", displayName: "Mods", component: <PageMods /> },
  { category: "Installed", path: "/modpacks", displayName: "Modpacks" },
  { category: "Mod making", path: "/local-mods", displayName: "Local mods" },
];

export function App() {
  return (
    <div className="page-wrapper with-sidebar">
      <div className="sticky-alerts"></div>
      <Router>
        <Sidebar pages={pages}/>
        <div className="content-wrapper">
          <Switch>
            {pages.map(page => (
              <Route key={page.path} path={page.path}>
                {page.component}
              </Route>
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
