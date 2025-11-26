import React from 'react'
import CustomButton from './Button'
import { useDetail } from '../store/DetailsContext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../store/AuthContext'

const Signout = () => {
  const {logout} = useAuth()

  const handleSignout = async () => {
    try {
      await AsyncStorage.removeItem("accesstoken");
      logout()
    } catch (error) {
      console.error('Error during logout', error);
    }
  }
    
  return (
    <CustomButton 
    title="Sign Out"
    onPress={handleSignout}
    />
  )
}

export default Signout
