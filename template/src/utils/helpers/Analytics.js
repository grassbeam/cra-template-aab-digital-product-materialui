import ReactGA from 'react-ga';

import * as Config from 'utils/values/Config';

export const PageView = (path, pageName, optionGA={})=>{
    
    if(Config.IS_USING_GOOGLE_ANALYTICS) {
        ReactGA.set({
            pageName,
            ...optionGA
        });
        ReactGA.pageview(path, pageName);
    }

    // Add other analytics here
}


export const OnClickEvent = ( eventName, eventCategory, eventLabel ) => {
    
    if(Config.IS_USING_GOOGLE_ANALYTICS) {
        ReactGA.event({
            category: eventCategory,
            action: `Click ${eventName}`,
            label: eventLabel,
          });
    }
}





const Analytics = {
    PageView, OnClickEvent
}
export default Analytics;