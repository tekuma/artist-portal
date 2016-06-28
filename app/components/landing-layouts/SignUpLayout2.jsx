import React from 'react';
import LoggedOffHeader from '../headers/LoggedOffHeader';

export default class SignUpLayout2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="main-wrapper">
                <LoggedOffHeader />
                <div className="layout-centered">
                    <article className="signup-wrapper">
                        <div className="signup-heading-wrapper pink">
                            <h3>SIGN UP</h3>
                        </div>
                        <div className="signup-heading-wrapper">
                            <h3>We want to know more about you.</h3>
                        </div>
                        <form className="signup-form page-3">
                            <fieldset>
                                <ul>
                                    <li>
                                        <textarea className="bio" placeholder="Bio"></textarea>
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-location"
                                            name="location"
                                            placeholder="Location" />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            id="register-portfolio"
                                            name="portfolio"
                                            placeholder="Portfolio/Website" />
                                    </li>

                                    <button className="signup-button center" type="submit">
                                        <h3>Done</h3>
                                    </button>
                                    <li className="solo-links center">
                                        <a href=""><h3>Skip</h3></a>
                                    </li>
                                </ul>
                            </fieldset>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}
