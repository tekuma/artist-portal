// Libs
import React            from 'react';
import firebase         from 'firebase';
import Dropzone         from 'react-dropzone';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar         from 'material-ui/Snackbar';
import Select      from 'react-select';
import {Tooltip, OverlayTrigger}    from 'react-bootstrap';


export default class PublicEdit extends React.Component {
    state = {
        avatarUploaded  : false,
        avatarPreview   : "",
        avatar          : [],
        accordion       : {
            display_name: false,
            avatar      : false,
            bio         : false,
            location    : false,
            portfolio   : false,
            social_media: false
        },
        allAccordion    : false,
        errorType       : {},
        errors          : [],
        currentError    : "",
        selectedCountry   : "",
        countryList     : [
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'S Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'RWANDA', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Viet Nam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
        ]
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //Pass
    }

    render() {
        let avatar;

        if (this.props.user &&
            this.props.user.hasOwnProperty('avatar') &&
            this.props.user.avatar != "") {
                avatar = this.props.user.avatar;
            } else {
                avatar = 'assets/images/default-avatar.png';
            }

        let avatarStyle = {
            backgroundImage: 'url(' + avatar + ')'
        }

        let showSocialIconPreview = {
            facebook : false,
            twitter : false,
            instagram : false,
            pinterest : false,
            behance : false
        };

        let socialSet = false;

        for (let social_media in this.props.user.social_media) {
            if (this.props.user.social_media[social_media].length > 0) {
                showSocialIconPreview[social_media] = true;
                socialSet = true;
            }
        }

        let facebookStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/facebook-gray.svg)'
        }

        let instagramStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/instagram-gray.svg)'
        }

        let twitterStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/twitter-gray.svg)'
        }

        let pinterestStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/pinterest-gray.svg)'
        }

        let behanceStyle = {
            backgroundImage: 'url(assets/images/icons/social-icons/behance-gray.svg)'
        }

        let city;
        if (this.props.user.location) {
            let city = this.props.user.location.split(", ")[0]
        }

        let options = this.state.countryList.map( (country)=>{
                return {label: country.name , value: country.code, id: country.code};
            });

        const saveTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Save Public Information
            </Tooltip>
        );

        const accordionTooltip = (
            <Tooltip
                id="delete-tooltip-regular"
                className="tooltip">
                Open All Public Fields
            </Tooltip>
        );

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
                            id="display-name-item"
                            className={this.state.accordion.display_name ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"display_name")}>
                            <h2 className="accordion-item-heading">Display Name</h2>
                            <h3 className="accordion-item-preview">{this.props.user.display_name ? this.props.user.display_name : "Unset"}</h3>
                        </div>
                        <div
                            id="display-name-content"
                            className={this.state.accordion.display_name ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-displayname"
                            defaultValue={this.props.user.display_name}
                            onChange={this.setUnsaved}
                            ref="displayname"
                            placeholder="Display Name"
                            required=""
                            maxLength="50"
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off" />
                        </div>
                        <div
                            id="avatar-item"
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
                                accept="image/png, image/jpeg"
                                onDrop={this.onDrop}>
                                <img
                                    className="edit-avatar-no-avatar-icon"
                                    style={{display: (this.props.user.avatar == "" || this.props.user.avatar == undefined || this.props.user.avatar == null) && !this.state.avatarUploaded ? "block" : "none" }}
                                    src="../assets/images/icons/person-beige.svg" />
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
                            id="bio-item"
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
                                maxLength="1500"
                                onChange={this.setUnsaved}></textarea>
                        </div>
                        <div
                            id="location-item"
                            className={this.state.accordion.location ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"location")}>
                            <h2 className="accordion-item-heading">Location</h2>
                            <h3 className="accordion-item-preview">{this.props.user.location ? this.props.user.location : "Unset"}</h3>
                        </div>
                        <div
                            id="location-content"
                            className={this.state.accordion.location ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-location"
                            ref="city"
                            placeholder="City"
                            defaultValue={city}
                            maxLength="50"
                            onChange={this.setUnsaved} />
                            <div className="country-selector">
                                <Select
                                    className="country-select"
                                    options={options}
                                    name="admin-select"
                                    placeholder="Country"
                                    value={this.state.selectedCountry}
                                    onChange={this.setCountry}
                                    clearable={false}
                                    resetValue={this.state.selectedCountry}
                                />
                            </div>
                        </div>
                        <div
                            id="portfolio-item"
                            className={this.state.accordion.portfolio ? "accordion-item open" : "accordion-item"}
                            onClick={this.toggleAccordion.bind({},"portfolio")}>
                            <h2 className="accordion-item-heading">Portfolio</h2>
                            <h3 className="accordion-item-preview">{this.props.user.portfolio ? this.props.user.portfolio : "Unset"}</h3>
                        </div>
                        <div
                            id="portfolio-content"
                            className={this.state.accordion.portfolio ? "accordion-content open" : "accordion-content"}>
                            <input
                            type="text"
                            id="edit-portfolio"
                            ref="portfolio"
                            placeholder="Portfolio/Website"
                            defaultValue={this.props.user.portfolio ? this.props.user.portfolio : "http://"}
                            maxLength="200"
                            onChange={this.setUnsaved} />
                        </div>
                        <div
                            id="social-media-item"
                            className={this.state.accordion.social_media ? "accordion-item open no-border-bottom" : "accordion-item no-border-bottom"}
                            onClick={this.toggleAccordion.bind({},"social_media")}>
                            <h2 className="accordion-item-heading">Social Media</h2>
                            {socialSet ?
                                <div className="accordion-item-social-icon-wrapper">
                                    { showSocialIconPreview["facebook"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={facebookStyle}></div> : null
                                    }

                                    { showSocialIconPreview["instagram"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={instagramStyle}></div> : null
                                    }

                                    { showSocialIconPreview["twitter"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={twitterStyle}></div> : null
                                    }

                                    { showSocialIconPreview["pinterest"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={pinterestStyle}></div> : null
                                    }

                                    { showSocialIconPreview["behance"] ?
                                        <div
                                        className="accordion-item-social-icon"
                                        style={behanceStyle}></div> : null
                                    }
                                </div>
                                :
                                <h3 className="accordion-item-preview">Unset</h3>
                                }
                        </div>
                        <div
                            id="social-media-content"
                            className={this.state.accordion.social_media ? "accordion-content open" : "accordion-content"}>
                            <ul>
                                <li>
                                    <div className="edit-social-icon facebook">
                                        <img src="assets/images/icons/social-icons/facebook-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        facebook.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-facebook"
                                    className="edit-social-input"
                                    ref="facebook"
                                    placeholder="tekuma.world"
                                    defaultValue={this.props.user.social_media.facebook}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon instagram">
                                        <img src="assets/images/icons/social-icons/instagram-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        instagram.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-instagram"
                                    className="edit-social-input"
                                    ref="instagram"
                                    placeholder="tekuma.io"
                                    defaultValue={this.props.user.social_media.instagram}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon twitter">
                                        <img src="assets/images/icons/social-icons/twitter-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        twitter.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-twitter"
                                    className="edit-social-input"
                                    ref="twitter"
                                    placeholder="tekuma_"
                                    defaultValue={this.props.user.social_media.twitter}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon pinterest">
                                        <img src="assets/images/icons/social-icons/pinterest-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        pinterest.com/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-pinterest"
                                    className="edit-social-input"
                                    ref="pinterest"
                                    placeholder="Tekumaio"
                                    defaultValue={this.props.user.social_media.pinterest}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                                <li>
                                    <div className="edit-social-icon behance">
                                        <img src="assets/images/icons/social-icons/behance-black.svg" />
                                    </div>
                                    <p className="edit-social-url">
                                        behance.net/
                                    </p>
                                    <input
                                    type="text"
                                    id="edit-behance"
                                    className="edit-social-input"
                                    ref="behance"
                                    placeholder="tekuma.io"
                                    defaultValue={this.props.user.social_media.behance}
                                    maxLength="50"
                                    onChange={this.setUnsaved} />
                                </li>
                            </ul>
                        </div>
                    </article>
                    <OverlayTrigger
                        placement="right"
                        overlay={saveTooltip}>
                        <button
                            className="edit-profile-save-button"
                            type="submit"
                            onClick={this.saveProfileInfo}>
                            <img src="assets/images/icons/save.svg" />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="left"
                        overlay={accordionTooltip}>
                        <button
                            className="edit-profile-open-accordion-button"
                            type="submit"
                            onClick={this.toggleAllAccordion}>
                            <svg
                                version="1.1"
                                id="open-accordion"
                                x="0px"
                                y="0px"
                                width="25px"
                                height="25px"
                                viewBox="12.5 12.5 25 25"
                                enableBackground="new 12.5 12.5 25 25">
                               <polygon
                                   id="up-arrow"
                                   fill="#FFFFFF"
                                   points="12.489,21.449 21.063,12.886 21.063,12.886 23.703,12.886 23.703,12.886 23.703,37.114 21.063,37.114 21.063,29.147 21.063,16.408 12.489,24.982 	"/>
                              <polygon
                                  id="down-arrow"
                                  fill="#FFFFFF"
                                  points="37.511,28.551 28.937,37.114 28.937,37.114 26.297,37.114 26.297,37.114 26.297,12.886 28.937,12.886 28.937,20.853 28.937,33.592 37.511,25.018 	"/>
                            </svg>
                        </button>
                    </OverlayTrigger>
                </div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Snackbar
                        className="snackbar-error"
                        open={this.state.errors.length > 0}
                        message={this.state.currentError}
                        autoHideDuration={4000} />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount() {
        let country = this.props.user.location.split(", ")[1]
        this.setState({
            selectedCountry: country
        });
        console.log("Selected Country: ", this.selectedCountry);
    }

    componentWillReceiveProps(nextProps) {
        let country = nextProps.user.location.split(", ")[1]
        this.setState({
            selectedCountry: country
        });
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

    toggleAllAccordion = () => {
        let allAccordion = this.state.allAccordion;

        let accordion   = {
            display_name: !allAccordion,
            avatar      : !allAccordion,
            bio         : !allAccordion,
            location    : !allAccordion,
            portfolio   : !allAccordion,
            social_media: !allAccordion
        };

        this.setState({
            accordion: accordion,
            allAccordion: !allAccordion
        });
    }

    setUnsaved = () => {
        this.props.setUnsaved();
    }

    setCountry = (country)=>{
        if (country.value) {
            this.setState({
                selectedCountry: country.value
            });
        }
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
        let data = {
            social_media: {
                facebook: "",
                instagram: "",
                twitter: "",
                pinterest: "",
                behance: ""
            }
        };

        // Public
        let bio          = this.refs.bio.value;
        let location     = `${this.refs.city.value}, ${this.state.selectedCountry ? this.state.selectedCountry : this.props.user.location.split(", ")[1]}`;
        let portfolio    = this.refs.portfolio.value;
        let displayName  = this.refs.displayname.value;
        let facebook     = this.refs.facebook.value;
        let instagram    = this.refs.instagram.value;
        let twitter      = this.refs.twitter.value;
        let pinterest    = this.refs.pinterest.value;
        let behance      = this.refs.behance.value;


        // ====== Public Validations ======

        // Display Name
        if (displayName.length > 0) {
            data.display_name = displayName;
        }

        // Avatar
        if (this.state.avatarUploaded) {
            data.avatar = this.state.avatar;
        }

        // Bio
        if (bio.length > 0) {
            data.bio = bio;
        }

        // Location
        if (location.length > 0) {
            data.location = location;
        }

        // Portfolio
        if (portfolio.length > 0) {
            data.portfolio = portfolio;
        }

        // Social Media
        if (facebook.length > 0) {
            data.social_media.facebook = facebook;
        }

        if (instagram.length > 0) {
            data.social_media.instagram = instagram;
        }

        if (twitter.length > 0) {
            data.social_media.twitter = twitter;
        }

        if (pinterest.length > 0) {
            data.social_media.pinterest = pinterest;
        }

        if (behance.length > 0) {
            data.social_media.behance = behance;
        }

        // Rerender the component to show errors
        this.forceUpdate();

        // gather inputs that have been entered
        if (this.state.errors.length == 0) {
            this.props.editPublicUserInfo(data);

            this.setState({
                accordion: {
                    display_name: false,
                    avatar: false,
                    bio: false,
                    location: false,
                    portfolio: false,
                    social_media: false
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
