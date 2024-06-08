import { useState } from "react";
import { iniciar } from "./components/Db";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pesq_Univer from "./components/Tela_Pesq";
import Tela_Fav_Func from "./components/Tela_Fav";
import Listfavcontext from "./contexts/ListFavContext";

const Stack = createNativeStackNavigator();
iniciar().then(() => console.log("Banco de dados criado")).catch((err) => console.log(err))

export default function App() {
    let [list_fav, setlist_fav] = useState(new Set());

    return <Listfavcontext.Provider value={{list_fav, setlist_fav}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pesquisa de Universidades" component={Pesq_Univer} />
        <Stack.Screen name="Lista de Favoritos" component={Tela_Fav_Func} />
      </Stack.Navigator>
    </NavigationContainer>
  </Listfavcontext.Provider>
}
  