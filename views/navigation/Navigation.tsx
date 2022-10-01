import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../sign_up/SignUp";


const Navigation = () => {
  
  const HomeRoute = () => <Home/>;

  const LoginRoute = () => <Login/>;

  const SignUpRoute = () => <SignUp/>;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'login', title: 'Albums', focusedIcon: 'album' },
    { key: 'signUp', title: 'Recents', focusedIcon: 'history' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    login: LoginRoute,
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