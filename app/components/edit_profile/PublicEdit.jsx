// Libs
import React            from 'react';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';


export default class PublicEdit extends React.Component {
    state = {
        avatarUploaded  : false,
        avatarPreview   : "",
        avatar          : [],
        gender          : "",
        accordion       : {
            display_name: false,
            avatar      : false,
            bio         : false,
            location    : false,
            portfolio   : false,
            age         : false,
            pronoun     : false
        },
        errorType       : {},
        errors          : [],
        currentError    : ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //Pass
    }

    render() {
        let avatar;

        if (this.props.user != null &&
            this.props.user != undefined &&
            this.props.user.hasOwnProperty('avatar') &&
            this.props.user.avatar != "") {
                avatar = this.props.user.avatar;
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        let avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }
        let age;

        if (this.props.user.dob) {
            age = `${this.props.user.dob.split("-")[1]}-${this.props.user.dob.split("-")[0]}-${this.props.user.dob.split("-")[2]}`;
        }


        return(
            <div>
                <div className="edit-profile-heading">
                    <div
                        className={this.props.editingPublic ? "edit-profile-public selected" : "edit-profile-public"}
                        onClick={this.props.editPublic}>
                        <h2>Public</h2>
                    </div>
                    <div
                        className={!this.props.editingPublic ? "edit-profile-private selected" : "edit-profile-private"}
                        onClick={this.props.editPrivate}>
                        <h2>Private</h2>
                    </div>
                </div>
                <div className ="scroll-edit-profile">
                    <article className="edit-accordion">
                        <div
                            className={this.state.accordion.display_name ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"display_name")}>
                            <h2 className="accordion-item-heading">Display Name</h2>
                            <h3 className="accordion-item-preview">{this.props.user.display_name != "" ? this.props.user.display_name : "Unset"}</h3>
                        </div>
                        <div
                            id="display-name-content"
                            className={this.state.accordion.display_name ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-displayname"
                            defaultValue={this.props.user.display_name}
                            onKeyPress={this.setUnsaved}
                            ref="displayname"
                            placeholder="Display Name"
                            required=""
                            maxLength="50"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off" />
                        </div>
                        <div
                            className={this.state.accordion.avatar ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"avatar")}>
                            <h2 className="accordion-item-heading">Avatar</h2>
                            <div className="accordion-item-avatar-wrapper">
                                <div
                                className="accordion-item-avatar"
                                style={avatarStyle}></div>
                            </div>
                        </div>
                        <div
                            id="avatar-content"
                            className={this.state.accordion.avatar ? "accordion-content open" : "accordion-content"}>
                            <Dropzone
                                style={{display: this.state.accordion.avatar ? "flex" : "none" }}
                                className="edit-profile-avatar-wrapper"
                                accept="image/*"
                                onDrop={this.onDrop}>
                                <img
                                    style={{display: (this.props.user.avatar == "" || this.props.user.avatar == undefined || this.props.user.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    src="../assets/images/icons/person-beige.svg" />
                                <h3
                                    style={{display: (this.props.user.avatar == "" || this.props.user.avatar == undefined || this.props.user.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    className="upload-writing big">
                                    Click to Upload your Photo
                                </h3>
                                <h3
                                    style={{display: (this.props.user.avatar == "" || this.props.user.avatar == undefined || this.props.user.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    className="upload-writing small">
                                    or Simply Drag it Here
                                </h3>
                                <img
                                    id="uploaded-avatar"
                                    style={{display: (this.props.user.avatar !== "" && this.props.user.avatar !== undefined && this.props.user.avatar !== null && !this.state.avatarUploaded)  ? "block" : "none" }}
                                    src={this.props.user.avatar} />
                                <img
                                    id="uploaded-avatar"
                                    style={{display: this.state.avatarUploaded ? "block" : "none" }}
                                    src={this.state.avatarPreview} />
                            </Dropzone>
                        </div>
                        <div
                            className={this.state.accordion.bio ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"bio")}>
                            <h2 className="accordion-item-heading">Bio</h2>
                            <h3 className="accordion-item-preview">{this.props.user.bio ? this.props.user.bio.substring(0, 44).length > this.props.user.bio ?  this.props.user.bio.substring(0, 44) + "..." : this.props.user.bio.substring(0, 44) : "Unset"}</h3>
                        </div>
                        <div
                            id="bio-content"
                            className={this.state.accordion.bio ? "accordion-content open" : "accordion-content"}>
                            <textarea
                                className="bio"
                                placeholder="Bio"
                                ref="bio"
                                defaultValue={this.props.user.bio}
                                onKeyPress={this.setUnsaved}></textarea>
                        </div>
                        <div
                            className={this.state.accordion.location ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"location")}>
                            <h2 className="accordion-item-heading">Location</h2>
                            <h3 className="accordion-item-preview">{this.props.user.location != "" ? this.props.user.location : "Unset"}</h3>
                        </div>
                        <div
                            id="location-content"
                            className={this.state.accordion.location ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-location"
                            ref="location"
                            placeholder="Location"
                            defaultValue={this.props.user.location}
                            onKeyPress={this.setUnsaved} />
                        </div>
                        <div
                            className={this.state.accordion.portfolio ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"portfolio")}>
                            <h2 className="accordion-item-heading">Portfolio</h2>
                            <h3 className="accordion-item-preview">{this.props.user.portfolio != "" ? this.props.user.portfolio : "Unset"}</h3>
                        </div>
                        <div
                            id="portfolio-content"
                            className={this.state.accordion.portfolio ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-portfolio"
                            ref="portfolio"
                            placeholder="Portfolio/Website"
                            defaultValue={this.props.user.portfolio}
                            onKeyPress={this.setUnsaved} />
                        </div>
                        <div
                            className={this.state.accordion.age ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"age")}>
                            <h2 className="accordion-item-heading">Age</h2>
                            <h3 className="accordion-item-preview">{this.props.user.dob != "" ? age : "Unset"}</h3>
                        </div>
                        <div
                            id="age-content"
                            className={this.state.accordion.age ? "accordion-content open" : "accordion-content"}>
                            <label htmlFor="edit-age">Date of Birth: </label>
                            <div id="accordion-dob" className="accordion-dob">
                                <div className="controls controls-month">
                                    <select
                                        id="accordion-dob-month"
                                        className="dob"
                                        defaultValue={this.props.user.dob ? this.props.user.dob.split("-")[1] : null}
                                        ref="dobMonth"
                                        style={this.state.errorType.month? errorStyle : null}>
                                        <option value="" disabled="">Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div className="controls controls-day">
                                    <input
                                        type="number"
                                        id="accordion-dob-day"
                                        defaultValue={this.props.user.dob ? this.props.user.dob.split("-")[0] : null}
                                        className="dob"
                                        ref="dobDay"
                                        style={this.state.errorType.day ? errorStyle : null}
                                        placeholder="Day"
                                        pattern="[0-9]*"
                                        maxLength="2"
                                        min="1"
                                        max="31" />
                                </div>
                                <div className="controls controls-year">
                                    <input
                                        type="number"
                                        id="accordion-dob-year"
                                        defaultValue={this.props.user.dob ? this.props.user.dob.split("-")[2] : null}
                                        className="dob"
                                        ref="dobYear"
                                        style={this.state.errorType.year ? errorStyle : null}
                                        placeholder="Year"
                                        pattern="[0-9]*"
                                        maxLength="4" />
                                </div>
                            </div>
                            <label className="age-confirm-label">
                                <input
                                    type="checkbox"
                                    id="over-eighteen-checkbox"
                                    ref="overEighteen"
                                    defaultChecked={this.props.user.over_eighteen} />
                                    I confirm that I am 18+
                            </label>
                        </div>
                        <div
                            className={this.state.accordion.pronoun ? "accordion-item no-border-bottom open" : "accordion-item no-border-bottom"}
                            onClick={this.toggleAccordion.bind({},"pronoun")}>
                            <h2 className="accordion-item-heading">Preferred Gender Pronoun</h2>
                            <h3 className="accordion-item-preview">{this.props.user.gender_pronoun != "" ? this.props.user.gender_pronoun : "Unset"}</h3>
                        </div>
                        <div
                            id="pronoun-content"
                            className={this.state.accordion.pronoun ? "accordion-content open" : "accordion-content"}>
                            <label
                                htmlFor="edit-she"
                                className="gender-radio control-inline">
                                <input
                                    type="radio"
                                    id="edit-she"
                                    name="gender"
                                    className="reg-radio"
                                    defaultValue="She"
                                    defaultChecked={this.props.user.gender_pronoun == "She"}
                                    onChange={this.setGender}
                                    required="" />
                                She
                          </label>
                          <label
                              htmlFor="edit-he"
                              className="gender-radio control-inline">
                              <input
                                  type="radio"
                                  id="edit-he"
                                  name="gender"
                                  className="reg-radio"
                                  defaultValue="He"
                                  defaultChecked={this.props.user.gender_pronoun == "He"}
                                  onChange={this.setGender}
                                  required="" />
                              He
                        </label>
                        <label
                            htmlFor="edit-they"
                            className="gender-radio control-inline">
                                <input
                                    type="radio"
                                    id="edit-they"
                                    name="gender"
                                    className="reg-radio"
                                    defaultValue="They"
                                    defaultChecked={this.props.user.gender_pronoun == "They"}
                                    onChange={this.setGender}
                                    required="" />
                                They
                            </label>
                        </div>
                    </article>
                    <button
                        className="edit-profile-save-button public"
                        type="submit"
                        onClick={this.saveProfileInfo}>
                        <img src="assets/images/icons/save.svg" />
                    </button>
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="registration-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        //pass
    }

    componentWillReceiveProps(nextProps) {
        //pass
    }

    // -------- METHODS ------------

    /**
     * TODO
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    toggleAccordion = (item) => {
        let accordion   = this.state.accordion;
        accordion[item] = !accordion[item];
        this.setState({
            accordion: accordion
        });
    }

    /**
     * TODO
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    setGender = (e) => {
        this.setState({
            gender: e.target.value
        });

        this.props.setUnsaved();
    }

    setUnsaved = () => {
        this.props.setUnsaved();
    }

    /**
     * TODO
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    saveProfileInfo = (e) => {
        e.preventDefault();

        // Clear errors from any previous form submission
        this.state.errors = [];
        let data = {};

        // Public
        let bio          = this.refs.bio.value;
        let location     = this.refs.location.value;
        let portfolio    = this.refs.portfolio.value;
        let displayName  = this.refs.displayname.value;
        let day          = this.refs.dobDay.value;
        let month        = this.refs.dobMonth.value;
        let year         = this.refs.dobYear.value;
        let overEighteen = this.refs.overEighteen.checked;
        let gender       = this.state.gender;

        data.over_eighteen = overEighteen;

        // Public Validations
        if (displayName.length > 0) {
            data.display_name = displayName;
        }

        if (this.state.avatarUploaded) {
            data.avatar = this.state.avatar;
        }

        if (bio.length > 0) {
            data.bio = bio;
        }

        if (location.length > 0) {
            data.location = location;
        }

        if (portfolio.length > 0) {
            data.portfolio = portfolio;
        }

        if (day.length > 0 && day.length > 2) {
            this.state.errors.push("Please enter a valid day of the month.");

            let errorType = this.state.errorType;
            errorType.day = true;
            this.setState({
                errorType: errorType
            });
        }

        if(month.length > 0 && month.length > 2) {
            this.state.errors.push("Please enter a valid month.");

            let errorType = this.state.errorType;
            errorType.month = true;
            this.setState({
                errorType: errorType
            });
        }

        if(year.length > 0 && year.length > 4 || eval(year) > new Date().getFullYear()) {
            this.state.errors.push("Please enter a valid year.");

            let errorType = this.state.errorType;
            errorType.year = true;
            this.setState({
                errorType: errorType
            });
        }

        if((day.length == 1 || day.length == 2) &&
            (month.length == 1 || month.length == 2) &&
            year.length == 4) {
            data.dob = day + "-" + month + "-" + year;
        } else {

        }

        if(gender.length > 0) {
            data.gender_pronoun =  gender;
        }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered
        if (this.state.errors.length == 0) {
            this.props.editPublicUserInfo(data);
            console.log("edited data: ", data);
            console.log("edited profile");

            this.setState({
                accordion: {
                    display_name: false,
                    avatar: false,
                    bio: false,
                    location: false,
                    portfolio: false,
                    age: false,
                    pronoun: false
                }
            });

            this.props.setSaved(); // Used to track whether user has save info to show confirm dialog or not
        }

        for(let i = 0; i < this.state.errors.length; i++) {
            setTimeout(() => {
                this.setState({
                    currentError: this.state.errors[i]
                });
                console.log(this.state.errors[i]);
            }, 3000 * i);
        }
    }

    /**
     * TODO
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    onDrop = (file) => {
        this.setState({
            avatarUploaded: true,
            avatar: file[0],
            avatarPreview: file[0].preview
        });

        this.props.setUnsaved();
    }
}
