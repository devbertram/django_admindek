require('../../config')

import React from "react"
import ReactDOM from "react-dom"

import MenuListComp from './MenuListComp.js'
import menuStore from './store/MenuStore'

ReactDOM.render( 
    <MenuListComp menuStore={ menuStore }/>, 
    document.getElementById('menu_root')
);