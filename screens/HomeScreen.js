import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, PanResponder , Animated} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EvilIcons , Feather, FontAwesome} from "@expo/vector-icons";
import {LineChart} from 'react-native-chart-kit'



const screenWidth = Dimensions.get("window").width,
  screenHeight = Dimensions.get("window").height;
 
  

class HomeScreen extends React.Component {
  state = {
    
  };
  mainAnimationValue =  new Animated.Value(0)
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: ()=> true,
    onMoveShouldSetPanResponderCapture: ()=> true,
    onPanResponderMove: Animated.event([null, {dx: this.mainAnimationValue}]),
    onPanResponderRelease: (e, {vy, dy}) =>{
      if(Math.abs(vy) >= 0.5 || Math.abs(dy) > screenHeight/4){
          Animated.timing(this.mainAnimationValue, {
            toValue: dy>0 ? 1 : 0,
            duration: 200
          }).start()
      }else{
        Animated.spring(this.mainAnimationValue, {
          toValue: dy>0 ? 1 : 0,
          bounciness: 10
        }).start()
      }
    }

  })
  render() {
    let mainAnimationValue = this.mainAnimationValue;
    let TranslateY = mainAnimationValue.interpolate({
      inputRange: [0, mainAnimationValue._value],
      outputRange: [0, 90]
    })
    return (
      <View style={styles.homepageContainer}>
        <Image
          source={require("../assets/lagos.jpg")}
          style={styles.bacgroundImage}
        />
        <ScrollView scrollEnabled={false}  style={styles.contentView}>
          <View style={styles.stateCity}>
            <Text style={[styles.state]}>Tokyo </Text>
            <View style={[styles.cityTextIcon]}>
              <EvilIcons name="location" size={20} color="#90969e" />
              <Text style={[styles.cityText]}>Shibuya</Text>
            </View>
          </View>
          <View style={styles.mainTemp}>
            <Text style={styles.degreeTemp}>14{'\u00B0'}</Text>
            <View style={styles.mainTempIconTextCont}>
                
                <View style={styles.mainTempIconText}>
                <Feather name="sun" size={20} color="#ef7412" />
                <Text style={styles.mainTempText}>Sunny</Text>
                </View>

                <View style={styles.mainTempIconText}>
                <FontAwesome name="tree" size={20} color="#ef7412" />
                <Text style={styles.mainTempText}>High Pollen</Text>
                </View> 
            </View>
          </View>
          
          <View style={styles.forecastTempIconTextCont}>
            <View style={styles.forecastTempIconText} >
                <Text style={styles.forecastTempText}>13:00 </Text>
                <Feather name="sun" size={20} color="#ef7412" />
                <Text style={styles.forecastTempText}>19{'\u00B0'}</Text>
            </View>
            <View style={styles.forecastTempIconText} >
                <Text style={styles.forecastTempText}>15:00 </Text>
                <Feather name="cloud" size={20} color="#b1b1b1" />
                <Text style={styles.forecastTempText}>14{'\u00B0'}</Text>
            </View> 
            <View style={styles.forecastTempIconText} >
                <Text style={styles.forecastTempText}>17:00 </Text>
                <Feather name="cloud" size={20} color="#b1b1b1" />
                <Text style={styles.forecastTempText}>14{'\u00B0'}</Text>
            </View>
            <View style={styles.forecastTempIconText} >
                <Text style={styles.forecastTempText}>19:00 </Text>
                <Feather name="moon" size={20} color="#ef7412" />
                <Text style={styles.forecastTempText}>11{'\u00B0'}</Text>
            </View>
          </View>
         
          <ScrollView horizontal={true} style = {styles.WindGraphCont}>
                <WindGraph/>
                
          </ScrollView>
        <View style={{marginBottom: 100}}>
          <View style={styles.daysTempCont}>
            <View style={styles.daysDate}>
                <Text style={styles.date}>April 1</Text>
                <Text style={styles.days}>Tommorrow</Text>
            </View>
            <View style={styles.daysTemp}>
            <Feather name="moon" size={20} color="#ef7412" />
             <Text style={[styles.tempText]}>+14{'\u00B0'}</Text>
             <Text style={[styles.tempText, , {color: '#b1b1b1'}]}>+14{'\u00B0'}</Text>
            </View>
         </View>
         <View style={styles.daysTempCont}>
            <View style={styles.daysDate}>
                <Text style={styles.date}>April 1</Text>
                <Text style={styles.days}>Wednesday</Text>
            </View>
            <View style={styles.daysTemp}>
            <Feather name="moon" size={20} color="#ef7412" />
             <Text style={[styles.tempText]}>+14{'\u00B0'}</Text>
             <Text style={[styles.tempText, , {color: '#b1b1b1'}]}>+14{'\u00B0'}</Text>
            </View>
         </View>
         <View style={styles.daysTempCont}>
            <View style={styles.daysDate}>
                <Text style={styles.date}>April 1</Text>
                <Text style={styles.days}>Thursday</Text>
            </View>
            <View style={styles.daysTemp}>
            <Feather name="moon" size={20} color="#ef7412" />
             <Text style={[styles.tempText]}>+14{'\u00B0'}</Text>
             <Text style={[styles.tempText, {color: '#b1b1b1'}]}>+14{'\u00B0'}</Text>
            </View>
         </View>
         </View>
        
        </ScrollView>
      </View>
    );
  }
}

class WindGraph extends React.Component {
    state = {

    }
    componentDidMount(){
    
    }
 data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43 ],
          
        }]
    }
    chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(134, 65, 244)` // optional
        }
    render(){
        return(
            <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={screenWidth} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: 'transparent',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        )
    }

}

const styles = StyleSheet.create({
  bacgroundImage: {
    height: screenHeight,
    width: screenWidth,
    position: "absolute",
    zIndex: -200
  },
  homepageContainer: {
    flex: 1,
    alignItems: 'center',
  
  },
  contentView: {

    height: screenHeight,
    width: screenWidth,
    position: "absolute",
    top: screenHeight / 2.5,
    backgroundColor: "white",
    borderTopRightRadius: screenWidth / 1.5,
    zIndex: 1,
    flexDirection: "column",
    padding: 30,
    paddingRight: 30,
    // top: screenHeight / 9,
    // width: screenWidth/1.05, 
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    
  },
  state: {
    fontFamily: "Rubik-light",
    fontSize: 35,
    color: "#4a5663",
    textAlign: "left"
  },
  cityTextIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  cityText: {
    fontSize: 20,
    fontFamily: "Rubik-light",
    color: "#90969e"
  },
  mainTemp: {
      flexDirection: 'row',
      marginTop: 30,
      alignItems: 'flex-end',
      
  },
  degreeTemp: {
      fontFamily: 'Rubik-light',
      fontSize: 120, 
      padding: 0,
      margin: 0,
      textAlign: 'left',
      fontWeight: '100',
      color: '#1e2c3c',
      justifyContent: 'flex-end',
     
  },
  mainTempIconTextCont:{
            paddingBottom: 20
  },
  mainTempIconText :{
      flexDirection: 'row',
      padding: 5,
      paddingLeft: 20
      
  },
  mainTempText:{
      paddingLeft: 5,
      fontFamily: 'Rubik-light',
      fontSize: 20 
  },
  forecastTempIconTextCont :{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      marginTop: 40,
  },
  forecastTempIconText : {
    alignItems : 'flex-end',
    justifyContent: 'space-around'
  },
  forecastTempText :{ 
      fontFamily: 'Rubik-light',
      fontSize: 20,
      paddingVertical: 10
  },
  daysTempCont: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor : '#b1b1b1',
    paddingBottom: 10,
},
daysTemp: {
    flexDirection: 'row',
    
},
date: {
    fontFamily: 'Rubik-light',
    fontSize: 12,
    color :'#b1b1b1'
},
days: {
    fontFamily: 'Rubik-light',
    fontSize: 18,
    
},
tempText: {
    paddingHorizontal: 7,
    fontFamily: 'Rubik-light',
    fontSize: 15
}

});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
export default HomeScreen;
