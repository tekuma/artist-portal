//Libs
import React       from 'react';
import Select      from 'react-select';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
//Files


/**
 * This component handles selecting which project to add artworks too.
 */
export default class AdminSelector extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----AdminSelector");
    }

    render() {
        //NOTE: the prop passed into Select as 'value' must match the
        // artist.value below to be rendered as selected.
        let options = this.props.artists.map( (artist)=>{
                return {label: artist[1] , value:artist[0] , id:artist[0]};
            });

        const selectorContainerWidth = {
            // width: window.innerWidth * 0.2 + 36
        }
        const selectorWidth = {
            // width: window.innerWidth * 0.2 + 25 ,
            // display: "inline-block"
        }

        return (
            <div>
                <div
                    id="admin-selector"
                    style={selectorContainerWidth}>
                    <Select
                        className="admin-select"
                        style={selectorWidth}
                        options={options}
                        name="admin-select"
                        placeholder="Select an artist..."
                        value={this.props.actingUID}
                        onChange={this.props.setActingUID}
                        clearable="true"
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++AdminSelector");
    }

    componentWillReceiveProps(nextProps) {
        //Pass
    }

    // ------------ METHODS -------------

    handleChange = (e) => {
        console.log("****************");
        console.log(e);
        // this.props.setActingUser();
    }
}
