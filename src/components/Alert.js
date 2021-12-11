import React from 'react';

function Alert(props) {

    // for capitalizing strings
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        // We just created blank space for the alert so it won't push other content below.
        <div style={{height: '50px'}}>
          {
              props.alert &&
                  <div>
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                      <strong>{capitalize(props.alert.type)}</strong>: {capitalize(props.alert.msg)}
                    </div>
                  </div>
          }
        </div>
    );
}

export default Alert;