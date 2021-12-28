import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import './App.scss';

// Page components
import PageMods from './Pages/PageMods';
import PageModpacks from './Pages/PageModpacks';
import PageModpacksEditMods from './Pages/PageModpacksEditMods';
import PageLocalMods from './Pages/PageLocalMods';
import PageParticleEditor from './Pages/PageParticleEditor';

export interface Page {
  sidebar: boolean;
  category: string;
  path: string;
  displayName: string;
  component?: JSX.Element;
}

export const pages: Page[] = [
  { sidebar: true, category: "Installed", path: "/mods", displayName: "Mods", component: <PageMods /> },

  { sidebar: false, category: "Installed", path: "/modpacks/edit/config", displayName: "Modpacks > Edit > Config", component: <>{"Modpacks > Edit > Config"}</> },
  { sidebar: false, category: "Installed", path: "/modpacks/edit/mods", displayName: "Modpacks > Edit > Mods", component: <PageModpacksEditMods /> },
  { sidebar: true, category: "Installed", path: "/modpacks", displayName: "Modpacks", component: <PageModpacks /> },
  
  { sidebar: true, category: "Mod making", path: "/local-mods", displayName: "Local mods", component: <PageLocalMods /> },
  { sidebar: true, category: "Mod making", path: "/particle-editor", displayName: "Particle editor", component: <PageParticleEditor /> },
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
