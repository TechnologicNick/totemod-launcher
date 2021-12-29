import { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import ParticleEditorNode from './ParticleEditorNode';
import './ParticleEditorGrid.scss';

export default class ParticleEditorGrid extends Component {

    onPanningStart(ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) {
        const target = event.target as HTMLElement;

        ref.instance.setup.panning.disabled = !target.classList.contains("particle-editor-grid");
    }

    render() {
        return (
            <div>
                <TransformWrapper
                    minScale={0.06}
                    maxScale={1}
                    panning={{ excluded: ["no-panning"] }}
                    doubleClick={{ disabled: true }}
                    onPanningStart={this.onPanningStart}
                >
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100vh" }}>
                        <div className="particle-editor-grid" style={{
                            width: "1000rem",
                            height: "1000rem",
                        }}>
                            <ParticleEditorNode title={"Node"}>
                                <h2 className="content-title">
                                    Title of the article
                                </h2>
                                <p className="text-muted">
                                    Subtitle that hooks the reader and prompts them to click on the read more button.
                                </p>
                                <div className="text-right">
                                    <button className="btn">Read more</button>
                                </div>
                            </ParticleEditorNode>
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        )
    }
}
