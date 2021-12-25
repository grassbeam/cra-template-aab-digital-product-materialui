import ReactGA from 'react-ga';
import * as Config from 'utils/values/Config';
import * as Log from 'utils/helpers/Logger';


export const GA_ACTIONS = {
    CLICK: 'Click',
    VIEW: 'View',
    ENGAGEMENT: 'Engagement',
    ECOMMERCE: 'Ecommerce',
}

export const GA_CATEGORY = {
    SELECT_CONTENT: 'Select Content',
    FORM_SUBMIT: 'Form Submit',
    PRODUCT_DETAIL: 'Product Details',
    SELECT_PACKAGE: 'Select Package',
    PACKAGE_COMPARE: 'Package Comparison',
    ADD_CART: 'Add to Cart',
    PAYMENT_INFO: 'Payment Info',
    PURCHASE: 'Purchase',
    
    // 0234 URF 2021
    BUTTON: 'Button',
    FORM: 'Form',

}

/* ================================= START FUNCTION ================================ */


const GooglePageView = (path, pageName, optionGA={})=>{
    
    
    Log.debugGroupCollapsed("Google Analytics Page View", {
        page: path,
        title: pageName,
        ...optionGA
    });

    if(Config.IS_USING_GOOGLE_ANALYTICS) {
        ReactGA.set({
            page: path,
            title: pageName,
            ...optionGA
        });
        ReactGA.pageview(path);
    }

    // Add other analytics here
}

const GoogleActionEvent = ( eventActionKey, eventCategoryKey, eventLabel ) => {
    let analyticEvent = {
        action: eventActionKey,
        category: eventCategoryKey,
        label: eventLabel,
        transport: 'beacon'
    };
    
    Log.debugGroupCollapsed("Google Analytics Event", analyticEvent);
    
    Config.IS_USING_GOOGLE_ANALYTICS && ReactGA.event(analyticEvent);
}


function GoogleWebVitals({name, delta, id}) {

    // Assumes the global `ReactGA.ga()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs
    let analyticEvent = {
        eventCategory: 'Web Vitals',
        eventAction: name,
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        eventLabel: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        nonInteraction: true,
        // Use `sendBeacon()` if the browser supports it.
        transport: 'beacon',
    
        // OPTIONAL: any additional params or debug info here.
        // See: https://web.dev/debug-web-vitals-in-the-field/
        // dimension1: '...',
        // dimension2: '...',
        // ...
    }
    
    Log.debugGroupCollapsed("Google Analytics Web Vitals", analyticEvent);

    Config.IS_USING_GOOGLE_ANALYTICS && ReactGA.ga('send', 'event', analyticEvent);
}

/* ================================= END FUNCTION ================================ */




/* ================================= START EXPORT SECTION ================================ */

export const GoogleAnalytics = {
    PageView: GooglePageView,
    ActionEvent: GoogleActionEvent,
    WebVitals: GoogleWebVitals,
}


const Analytics = {
    Google: GoogleAnalytics,
}
export default Analytics;

/* ================================= END EXPORT SECTION ================================ */