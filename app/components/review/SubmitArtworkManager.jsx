// Libs
import React                        from 'react';
import ReactDOM                     from 'react-dom';
import firebase                     from 'firebase';
import uuid                         from 'uuid';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';
import update                       from 'react-addons-update';

// Files
import Views             from '../../constants/Views';
import AlbumToggler      from '../album_manager/AlbumToggler';
import SubmitArtwork     from './SubmitArtwork';

/**
 * TODO
 */
export default class SubmitArtworkManager extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SubmitArtworkManager");
    }

    render() {
        return this.manager();
    }

    componentDidMount() {
        console.log("+++++SubmitArtworkManager");
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {

    }

// ============= Flow Control ===============

    manager = () => {
        let submitList = [];
        let lastSubmit = "";
        for (var submit in this.props.submits) {
            lastSubmit = submit;
            if (this.props.submits.hasOwnProperty(submit)) {
                submitList.push(this.props.submits[submit]);
            }
        }

        const openManager = {
            height: window.innerHeight - 60,
            left: 0
        }

        let managerWidth = 200; // Magic Number to Instantiate

        if (document.getElementsByClassName('album-manager')[0]) {
            managerWidth = document.getElementsByClassName('album-manager')[0].offsetWidth;
        }

        const closedManager = {
            height: window.innerHeight - 60,
            left: -1 * managerWidth + 40
        }

        if (submitList.length == 0) {
            return (
                <section
                    className="album-manager submit"
                    style={this.props.managerIsOpen ? openManager: closedManager}>
                    <AlbumToggler
                        height          ={window.innerHeight - 60}
                        float           ={"right"}
                        background      ={"#111111"}
                        managerIsOpen   ={this.props.managerIsOpen}
                        toggleManager   ={this.props.toggleManager} />
                    <div
                        className="no-submits"
                        style={{
                            height:  window.innerHeight - 60
                        }}
                        >
                        <h3 className="upload-writing medium">No Submits</h3>
                    </div>
                </section>


            );
        }

        return (
            <section
                className="album-manager submit"
                style={this.props.managerIsOpen ? openManager: closedManager}>
                <AlbumToggler
                    height          ={window.innerHeight - 60}
                    float           ={"right"}
                    background      ={"#111111"}
                    managerIsOpen   ={this.props.managerIsOpen}
                    toggleManager   ={this.props.toggleManager} />
                <ul
                    style={{
                        height: window.innerHeight - 60
                    }}
                    className="album-locker">
                    {submitList.map(submit => {
                        return(
                            <SubmitArtwork
                                submit={submit}
                                paths={this.props.paths}
                                submitArtwork={this.props.submitArtwork}
                                changeSubmitArtwork={this.props.changeSubmitArtwork}
                                />
                        );
                    })}
                </ul>
            </section>
        );
    }
}
