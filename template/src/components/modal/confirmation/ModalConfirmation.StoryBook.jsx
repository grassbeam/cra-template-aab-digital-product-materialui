import React from 'react';

import ModalConfirmation from './ModalConfirmation.Component';


export default {
    title: 'Default Component/Modal/Confirmation',
    component: ModalConfirmation,
};

const Template = (args) => <ModalConfirmation {...args} />;

export const Confirmation = Template.bind({});
Confirmation.args  = { 
    TitleText: "Confirmation Title", 
    TitleID: "confirm-title", 
    ContentText: [...new Array(50)]
        .map(
        () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Sed cras ornare arcu dui vivamus arcu. Neque vitae tempus quam pellentesque nec nam aliquam. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Vitae et leo duis ut diam quam nulla porttitor. Turpis egestas maecenas pharetra convallis. Dolor sit amet consectetur adipiscing elit ut aliquam purus. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Massa ultricies mi quis hendrerit dolor magna. Purus in massa tempor nec feugiat nisl. Tempus urna et pharetra pharetra massa massa ultricies mi. Venenatis lectus magna fringilla urna.",
        )
        .join('\n'), 
    ContentID: "confirm-content", 
    withBackdrop: true, 
    isShowing: false,
    withDividerContent: true, 
    withCloseBtn: true, 
    withFullHeight: false,
    RightBtnText: "OK", 
    MaxWidthBreakDown: "sm"
}
