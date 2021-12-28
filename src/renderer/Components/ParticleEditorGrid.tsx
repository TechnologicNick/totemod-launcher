import { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ParticleEditorGrid.scss';

export default class ParticleEditorGrid extends Component {
    render() {
        return (
            <div>
                <TransformWrapper minScale={0.05} maxScale={1}>
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100vh" }}>
                        <div className="particle-editor-grid" style={{
                            width: "1000rem",
                            height: "1000rem"
                        }} />
                    </TransformComponent>
                </TransformWrapper>
            </div>
        )
    }
}
