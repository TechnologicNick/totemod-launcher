import ModSearch from '../Components/ModSearch';
import LoadMods from '../Components/LoadMods';
import { WorkshopModManager } from 'scrap-mechanic-common';
import { PathHelper } from 'scrap-mechanic-common';

const LocalModSearch = () => (
    <ModSearch mods={(Object.values(WorkshopModManager.mods).filter(
        workshopMod => workshopMod.dir.startsWith(PathHelper.USER_MODS_DIR)
    ))} />
)

export default function PageLocalMods() {
    return (
        <div className="content">
            <h2 className="content-title">
                Local mods
            </h2>
            <LoadMods>
                <LocalModSearch />
            </LoadMods>
        </div>
    )
}
