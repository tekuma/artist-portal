import React    from 'react';
import LandingPageLayout from '../components/landing-layouts/LandingPageLayout';
import SignUpLayout1     from '../components/landing-layouts/SignUpLayout1';
import SignUpLayout2     from '../components/landing-layouts/SignUpLayout2';
import {Popover} from 'react-bootstrap';



/**
 * TODO
 */
export default class LandingPageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step       : 1,
            popoverIsOpen: false
            };
    }


    render() {
        switch(this.state.step) {
            case 1:
                return(
                  <div>
                    <LandingPageLayout
                      saveValues = {this.props.saveValues}
                      nextStep   = {this.nextStep}
                      authenticateWithGoogle = {this.props.authenticateWithGoogle}
                      />
                    <Popover
                        placement="right"
                        positionLeft={200}
                        positionTop={50}
                        title="Popover right">
                        And here's some <strong>amazing</strong> content. Its very engaging. right?
                    </Popover>
                  </div>
                );
            case 2:
                return(
                  <div>
                    <SignUpLayout1
                      saveValues = {this.props.saveValues}
                      nextStep   = {this.nextStep}
                      />
                  </div>
                );
            case 3:
                return(
                  <div>
                    <SignUpLayout2
                      saveValues          = {this.props.saveValues}
                      submitRegistration  = {this.props.submitRegistration}
                      />
                  </div>
                );
        }
    }


// ---functions ---


    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

}
