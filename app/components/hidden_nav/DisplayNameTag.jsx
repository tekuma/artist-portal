// Libs
import React  from 'react';

export default class HiddenNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let fontStyle = {
            fontSize: 16
        }

        if (this.props.displayName.length > 22) {
            fontStyle = {
                fontSize: 9,
                top: 0
            }
        } else if (this.props.displayName.length > 16 ) {
            fontStyle = {
                fontSize: 12
            }
        }


        return (
            <div
                className="nav-username"
                style={{left : this.props.navIsOpen ? 25 : -700}}>
    			<span
                    style={fontStyle}
                    className="nav-username-writing">
    				{this.props.displayName}
    			</span>
    		</div>
        );
    }
}
