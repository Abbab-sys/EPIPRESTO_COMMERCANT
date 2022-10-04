import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../home/Home";
import Inventory from "../inventory/Inventory";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";


const Navigation = () => {
  
  const HomeRoute = () => <Home/>;

  const InventoryRoute = () => <Inventory/>;

  const SignUpRoute = () => <SignUp/>;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'inventory', title: 'Inventory', focusedIcon: 'album' },
    { key: 'signUp', title: 'Sign-up', focusedIcon: 'history' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    inventory: InventoryRoute,
    signUp: SignUpRoute,
  });
  
  return(
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
  )
}

export default Navigation