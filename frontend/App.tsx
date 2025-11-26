import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { DetailProvider } from "./src/store/DetailsContext"
import Toast from 'react-native-toast-message';
import { ToastConfig } from './src/components/CustomToast';
import { AuthProvider } from './src/store/AuthContext';
import AppNavigation from './src/Navigations/AppNavigation'

const App = () => {
  
  return (
    <AuthProvider>
        <DetailProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
          <Toast  config={ToastConfig}/>
        </DetailProvider>
    </AuthProvider>
  );
};

export default App;
