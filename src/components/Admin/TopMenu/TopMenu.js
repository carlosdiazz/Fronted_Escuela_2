import React from 'react';
import {Icon, Menu} from "semantic-ui-react";
import "./TopMenu.scss";
import {useAuth} from "../../../hooks"
import logo1 from './logo.png';

export function TopMenu() {
  const {auth, logout} = useAuth();

  const renderName = () => {
    if(auth.me?.user){
        return `${auth.me.user} `;
    }
    return auth.me?.email;
  };

  return (
    //!AQUI
    <Menu fixed='top' className='top-menu-admin'>
        <Menu.Item className="top-menu-admin__logo">
        <div className="imagen">
            <img src={logo1} className="imagen" alt=''/>
        </div>
        </Menu.Item>


        <Menu.Menu position="right">
            <Menu.Item className='nombre'><font color="#0a4883">Hola, {renderName()}</font></Menu.Item>
            <Menu.Item className="cuadrado" onClick={logout}>
                <Icon name ="sign-out" />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
  )
}
