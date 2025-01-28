import React from 'react'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const DrawerStructure = (props, isOpen, toggleDrawer) => {
    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                >
                {props.children}
            </Drawer>
                {/* </Layout> */}
        </>
    )
}

export default DrawerStructure;
