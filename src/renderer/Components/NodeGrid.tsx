import { Component, PointerEvent } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import NodeParticleSystem from './NodeParticleSystem';
import './NodeGrid.scss';

export default class NodeGrid extends Component {

    panningActivationKeys = [" "];

    onPointerDownCapture(event: PointerEvent<HTMLDivElement>) {
        const target = event.target as HTMLElement;
        const panningEnabled = target.classList.contains("node-grid");

        if (panningEnabled) {
            this.panningActivationKeys.length = 0;
        } else {
            if (this.panningActivationKeys.length === 0) {
                this.panningActivationKeys.push(" ");
            }
        }
    }

    render() {
        return (
            <div>
                <TransformWrapper
                    minScale={0.06}
                    maxScale={1}
                    panning={{ activationKeys: this.panningActivationKeys }}
                    doubleClick={{ disabled: true }}
                >
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100vh" }}>
                        <div className="node-grid" onPointerDownCapture={this.onPointerDownCapture.bind(this)} style={{
                            width: "1000rem",
                            height: "1000rem",
                        }}>
                            <NodeParticleSystem />
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        )
    }
}
