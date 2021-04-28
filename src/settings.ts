import path from 'path';
import { PathHelper } from 'scrap-mechanic-common';
import { Core } from 'totemod-core';
import halfmoon from 'halfmoon';

/**
 * Temporary solution so I don't have to copy paste everything.
 * Should be reworked into a GUI later.
 */

export default class Settings {
    static isSetup: boolean | undefined;

    static checkSetup() {
        return this.isSetup ??= false;
    }

    static async setup() {

        if (!PathHelper.USER_MODS_DIR) {
            if (!PathHelper.findUserDir()) {
                halfmoon.initStickyAlert({
                    content: "Unable to find user directory.",
                    title: "Warning while loading mods",
                    alertType: "alert-secondary", // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
                });
            }
        }

        if (!PathHelper.INSTALLATION_DIR) {
            const found = await PathHelper.findSMInstallDir()
            
            if (found) {
                PathHelper.updatePaths();
            } else {
                halfmoon.initStickyAlert({
                    content: "Unable to find Scrap Mechanic installation. Select it manually in the settings.",
                    title: "Warning while loading mods",
                    alertType: "alert-secondary", // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
                });
            }
        }

        if (!Core.isInitialised()) {
            Core.setModpacksDirectory(path.join(PathHelper.USER_DIR, "Modpacks"));
        }

        this.isSetup = true;

    }
}