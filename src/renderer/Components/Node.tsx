import { Component } from 'react';
import classNames from 'classnames';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Node.scss';

type ParticleEditorNodeProps = {
    collapsed: boolean;
}

export default class Node extends Component {

    props!: {
        children?: React.ReactNode,
        title: string,
    };

    state: ParticleEditorNodeProps = {
        collapsed: false,
    };

    toggleCollapsed() {
        this.setState((prevState: ParticleEditorNodeProps) => {
            return {
                collapsed: !prevState.collapsed,
            }
        });
    }

    render() {
        return (
            <div className={classNames("node rounded w-400 position-absolute", {"collapsed": this.state.collapsed})}>
                <div className="card p-0 m-0" style={{overflow: "hidden"}}>
                    <div className="dark-mode content-title" style={{backgroundColor: "teal"}}>
                        <h2 className="content-title m-0">
                            <button className="btn btn-square" type="button" onClick={this.toggleCollapsed.bind(this)}>
                                <FontAwesomeIcon icon={faCaretDown} className="collapse-caret"/>
                            </button>
                            <span className="pl-10">
                                {this.props.title}
                            </span>
                        </h2>
                    </div>
                    {this.state.collapsed ? <></> : (
                        <div className="content">
                            {this.props.children}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
