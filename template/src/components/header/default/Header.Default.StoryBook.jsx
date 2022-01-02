import React from 'react';
import { Header } from 'stories/Header';
import HeaderComponent from './Header.Default.Component';


export default {
    title: "Default Component/Header/Default",
    component: HeaderComponent,
    argTypes: {
      BackgroundColor: { control: 'color' },
    },
};



const template = (args) => <HeaderComponent {...args} />

export const Default = template.bind({});
Default.args = {
    TitleText: "Default Header Component"
};