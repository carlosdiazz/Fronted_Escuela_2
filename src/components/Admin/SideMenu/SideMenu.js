import React from 'react';
import {Menu, Icon} from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./SideMenu.scss";

export function SideMenu(props) {
    const { children } = props;
    const { pathname } = useLocation();

  return (
    <div className="side-menu-admin">
        <MenuLeft pathname={pathname}/>
        <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
    const { pathname } = props;
    const{ auth } = useAuth();

    return (
        <Menu fixed="left" borderless className="side" vertical>
            <Menu.Item className='pedidoscss' as={Link} to={'/'} active={pathname === "/"}>
                <h3>
                    <Icon name="clipboard"/>Reportes
                </h3>
            </Menu.Item>

            <Menu.Item className='pedidoscss' as={Link} to={'/users'} active={pathname === "/users"}>
                <h3>
                    <Icon name="user"/>Profesores
                </h3>
            </Menu.Item>

            {/*<Menu.Item className='pedidoscss' as={Link} to={'/reportes'} active={pathname === "/reportes"}>
                <h3>
                    <Icon name="clipboard"/>Reportes por entidad
                </h3>
    </Menu.Item>*/}

            {auth.me?.is_staff &&(
                <Menu.Item as={Link} to={'/users'} active={pathname === "/users"}>
                <h3>
                    <Icon name="users"/>Usuarios
                </h3>
            </Menu.Item>
            )}

        </Menu>
        
    )
}