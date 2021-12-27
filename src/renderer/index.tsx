import { render } from 'react-dom';
import { App } from './App';
import halfmoon from 'halfmoon';

declare global {
    interface Window {
        halfmoon: any;
    }
}

window.halfmoon = halfmoon;
document.addEventListener('DOMContentLoaded', halfmoon.onDOMContentLoaded);

render(<App />, document.getElementById('root'));
