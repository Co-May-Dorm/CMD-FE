import React, { Component } from 'react';

class IconEmployee extends Component {
    render() {
        return (
            <span>
                <div className="con-vs-tooltip inline-block">
                    <div className="vs-tooltip vs-tooltip-top vs-tooltip-null" style={{ transitionDelay: '0s', width: 'auto', display: 'none' }}>
                        {this.props.nameEmployee}
                    </div>
                    <div className="con-vs-avatar null" style={{ background: 'rgb(195, 195, 195)' }}>
                        <div className="con-img vs-avatar--con-img">
                            <img src={this.props.srcImgEmployee} alt="" />
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default IconEmployee;