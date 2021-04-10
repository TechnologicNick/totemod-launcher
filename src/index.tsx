import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import path from 'path';
import { isPackaged } from 'electron-is-packaged';

export const RESOURCES_PATH: string = isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

export const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
};

render(<App />, document.getElementById('root'));
