import React from 'react';

/**
 * TODO
 * @param  {[type]} {searchOpen   [description]
 * @param  {[type]} toggleSearch} [description]
 * @return {[type]}               [description]
 */
export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("-----SearchBar");
    }

    render() {

        return (
            <div>
                <div id="search-bar">
                    <form>
                        <input
                            ref="searchTerm"
                            className="search-input"
                            placeholder="Search by artist, title, tag ..."
                            type="search" name="search" id="search"
                            autoFocus={true}
                          //  onBlur = {this.finishEdit}
                            onKeyPress = {this.checkEnter} />
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        console.log("+++++SearchBar");
    }

    componentWillReceiveProps(nextProps) {
        //Pass
    }

    // ------------ METHODS -------------
    search = () => {
        let searchTerm = this.refs.searchTerm.value;
        this.props.setSearchTerm(searchTerm);
    }

    checkEnter = (e) => {
         // The user hit *enter*, let's finish up.
         let searchTerm = this.refs.searchTerm.value;
         if(e.key === 'Enter') {
             e.preventDefault();
             this.props.searchArtistUID(searchTerm);
         }
     };
}
