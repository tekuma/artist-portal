import React from 'react';
import Album from './Album.jsx';

export default class Albums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth * 0.3
        };
    }

    render() {
        var styleResponsive = {
            height: window.innerHeight - 60,
            width: window.innerWidth * 0.3 - 40
        };

        var styleFixed = {
            height: window.innerHeight - 60,
            width: 210
        };

        return (
            <ul style={(window.innerWidth * 0.3 > 250) ? styleResponsive : styleFixed} className="album-locker">
                <li className="album uploads">
                    <div className="album-avatar">
                        <div className="empty-container">
                            <img src='assets/images/icons/upload-black.svg' />
                        </div>
                    </div>
                    <div className="album-writing">
                        <h3 className="uploads-name">Uploads</h3>
                        <img className="album-more" src='assets/images/icons/download.svg' />
                    </div>
                </li>
                {this.props.albums.map(album => {
                    return (
                        <Album key={album.id}
                            album={album}
                            onEdit={this.props.onEdit.bind(null, album.id)} />
                    );
                })}
            </ul>
        );
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth * 0.3});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
}
