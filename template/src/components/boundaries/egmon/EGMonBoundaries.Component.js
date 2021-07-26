import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as Log from 'utils/helpers/Logger';



export default class EGMonBoundariesComponent extends PureComponent {
    constructor(props) {
      super(props);
      if (props.withEGMON) {
          Log.EgMonPageStart(props.PageName);
      }
    }

    componentDidMount() {
        // Log.debugStr("HOC Mounted!");
        if (this.props.withEGMON) {
            Log.EgMonPageEnd("success");
        }
    }

    componentDidCatch(error) {
        if (this.props.withEGMON) {
            Log.EgMonError(error);
        }
    }

    render() {
        return(        
            <React.Fragment>
                {
                    this.props.withEGMON && <input type="hidden" id="EG-Session-User" value={this.props.UserID} />
                }
                {
                    this.props.children??""
                }
            </React.Fragment>
        );
    }
  };

  EGMonBoundariesComponent.propTypes = {
      PageName: PropTypes.string.isRequired,
      UserID: PropTypes.string.isRequired,
      withEGMON: PropTypes.bool.isRequired,
  };