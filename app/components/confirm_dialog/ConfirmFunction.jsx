// Libs
import { createConfirmation } from 'react-confirm';

// Files
import Confirmation           from './Confirmation';

/**
 * TODO
 */
export default function(confirmation, options = {}) {
    // Create Confirm Function
    const confirm = createConfirmation(Confirmation);

    // You can pass whatever you want to the component
    // These arguments will be your Component's props
    return confirm({ confirmation, options });
}
