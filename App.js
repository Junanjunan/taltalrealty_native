import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styled from "styled-components/native";
import Gate from './components/Gate';


const Container = styled.View`
  flex:1;
`;

export default function App() {
  return (
    <Container>
      <Gate />
    </Container>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });