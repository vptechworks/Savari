// // components/SearchBar.tsx
// import React from "react";
// import { View, StyleSheet, Pressable,TouchableOpacity } from "react-native";
// import { useForm } from "react-hook-form";
// // import Icon from "react-native-vector-icons/Ionicons";
// import FormInput from "./Form";
// import { useNavigation } from "@react-navigation/native";
// import Svg,{Path,Circle} from "react-native-svg";

// type SearchFormData = {
//   search: string;
// };

// interface SearchBarProps {
//   onSearch: (query: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const { control, handleSubmit, setValue, watch } = useForm<SearchFormData>({
//     defaultValues: { search: "" },
//   });

//   const searchValue = watch("search");
//   const navigation = useNavigation()
//   const onSubmit = (data: SearchFormData) => {
//     onSearch(data.search);
//   };

//   const clearSearch = () => {
//     setValue("search", "");
//     onSearch("");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Search Input using FormInput */}

//       <View>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Svg
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         width={30}
//         height={30}
//       >
//         <Path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//         />
//       </Svg>
//           </TouchableOpacity>
//               </View>

//       <View style={styles.inputWrapper}>
//         <FormInput<SearchFormData>
//           name="search"
//           control={control}
//           placeholder="Search destination..."
//         />

//         {/* Search Button */}
//       {/* <Pressable style={styles.iconBtn} onPress={handleSubmit(onSubmit)}>
//         <Svg
//   fill="none"
//   viewBox="0 0 24 24"
//   strokeWidth={2}
//   stroke="currentColor"
//   width={24}
//   height={24}
// >
//   <Path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     d="M21 21l-4.34-4.34"
//   />
//   <Circle
//     cx={11}
//     cy={11}
//     r={8}
//   />
// </Svg>

//       </Pressable> */}

//       {/* Clear Button */}
//       {/* {searchValue?.length > 0 && (
//         <Pressable style={[styles.iconBtn, { backgroundColor: "#d9534f" }]} onPress={clearSearch}>
//           <Svg
//   fill="none"
//   viewBox="0 0 24 24"
//   strokeWidth={2}
//   stroke="currentColor"
//   width={24}
//   height={24}
// >
//   <Path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     d="M18 6 L6 18"
//   />
//   <Path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     d="M6 6 L18 18"
//   />
// </Svg>

//         </Pressable>
//       )} */}
//       </View>

      
//     </View>
//   );
// };

// export default SearchBar;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inputWrapper: { 
//     flex: 1,
//     // flexDirection: 'row',
//     // backgroundColor: "red"
//   },
//   iconBtn: {
    
//   },
//   // container: {
//   //   flexDirection: "row",
//   //   alignItems: "center",
//   //   marginVertical: 10,
//   // },
//   // inputWrapper: {
//   //   flex: 1,
//   //   marginRight: 8,
//   // },
//   // iconBtn: {
//   //   backgroundColor: "#4CAF50", // taxi app green theme
//   //   borderRadius: 25,
//   //   padding: 10,
//   //   marginLeft: 5,
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   // },
// });

import React from 'react'
import { Text, View } from 'react-native'

function SearchBar() {
  return (
    <View>
      <Text>
        searchBar
      </Text>
    </View>
  )
}

export default SearchBar

