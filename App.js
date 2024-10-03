import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function App() {
  const API = 'https://open.er-api.com/v6/latest/USD'
  const [data, setData] = React.useState("")
  const [base, setBase] = React.useState("")
  const [last, setLast] = React.useState("")
  const [next, setNext] = React.useState("")
  const [loading, setLoading]=React.useState(true)

  const fetchData = async ()=>{
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD", {
        method: "GET"
    })
    const data = await res.json()
    // console.log(data)
    setData(data.rates)
    setBase(data.base_code)
    setLast(data.time_last_update_utc)
    setNext(data.time_next_update_utc)
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const rates = Object.entries(data)

  const refresh = ()=>{
    setLoading(true)
    setTimeout(()=>{
      fetchData()
    }, 1000)
  }

  useEffect(()=>{
    fetchData()
  }, [])

  if(loading) return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bc6c25", paddingTop: 30, alignItems: "center", justifyContent: "center" }}>
      <Text style={{color: "#283618", fontSize: 25}}>Loading...</Text>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#bc6c25", paddingTop: 30 }}>
      <Text style={{fontSize: 30, fontWeight: "300", color: "#fefae0", backgroundColor: "#bc6c25", padding: 15, textAlign: "center"}}>ExchangesCo. : {base}</Text>
      <FlatList data={rates}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={{ padding: 30, backgroundColor: "#283618" }}>
            <Text style={{ color: "#fefae0", fontSize: 18, fontWeight: "bold" }}>{item[0]}: </Text>
            <Text style={{ color: "#dda15e", fontSize: 18 }}>${item[1]}</Text>
          </View>
        )} />
        <View style={{backgroundColor: "#606c38", flexDirection: "row", justifyContent: 'space-between', alignItems: "center", padding: 15}}>
          <Text style={{color: "#dda15e", fontSize: 15, fontWeight: "bold"}}>updated: {last}</Text>
          <TouchableOpacity onPress={()=>refresh()} style={{backgroundColor: "#283618"}}><Text style={{color: "#dda15e", borderRadius: 20, padding: 5}}>Refresh</Text></TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
}