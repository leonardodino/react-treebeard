'use strict';

import React from 'react';
import rutils from 'react-utils';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';

class TreeNode extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggled: props.node.toggled };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(props){
        let toggled = props.node.toggled;
        if(toggled !== undefined){
            this.setState({ toggled });
        }
    }
    onClick(){
        let toggled = !this.state.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
        this.setState({ toggled: toggled });
    }
    animations(){
        const props = this.props;
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            toggle: anim.toggle(this.state),
            drawer: anim.drawer(this.state)
        };
    }
    decorators(){
        // Merge Any Node Based Decorators Into The Pack
        const props = this.props;
        let nodeDecorators = props.node.decorators || {};
        return Object.assign({}, props.decorators, nodeDecorators);
    }
    render(){
        const decorators = this.decorators();
        const animations = this.animations();
        const toggled = this.state.toggled;
        return (
            <li style={this.props.style.base} ref="topLevel">
                {this.renderHeader(decorators, animations)}
                <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                    {toggled ? this.renderChildren(decorators, animations) : null}
                </VelocityTransitionGroup>
            </li>
        );
    }
    renderHeader(decorators, animations){
        return (
            <NodeHeader
                decorators={decorators}
                animations={animations}
                style={this.props.style}
                node={this.props.node}
                onClick={this.onClick}
            />
        );
    }
    renderChildren(decorators){
        if(this.props.node.loading){ return this.renderLoading(decorators); }
        return (
            <ul style={this.props.style.subtree} ref="subtree">
                {rutils.children.map(this.props.node.children, (child, index) =>
                    <TreeNode
                        {...this._eventBubbles()}
                        key={index}
                        node={child}
                        decorators={this.props.decorators}
                        animations={this.props.animations}
                        style={this.props.style}
                    />
                )}
            </ul>
        );
    }
    renderLoading(decorators){
        return (
            <ul style={this.props.style.subtree}>
                <li>
                    <decorators.Loading style={this.props.style.loading}/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

TreeNode.propTypes = {
    style: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    animations: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

export default TreeNode;
