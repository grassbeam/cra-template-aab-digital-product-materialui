import React from 'react';

import ModalAlert from './ModalAlert.Component';


export default {
    title: 'Default Component/Modal/Alert',
    component: ModalAlert,
};

const Template = (args) => <ModalAlert {...args} />;

export const OneButton = Template.bind({});
OneButton.args  = { 
    TitleText: "Alert Title", 
    TitleID: "one-button-title", 
    ContentText: "Lorem ipsum sit amet lodor", 
    ContentID: "one-button-content", 
    withBackdrop: true, 
    isShowing: true,
    RightBtnText: "OK", 
    MaxWidthBreakDown: "sm"
}

export const TwoButton = Template.bind({});

TwoButton.args = { 
    ...OneButton.args,
    TitleID: "two-button-title", 
    ContentID: "two-button-content", 
    withBackdrop: true, 
    isShowing: true,
    withLeftButton: true, 
    LeftBtnText: "Cancel", 
}