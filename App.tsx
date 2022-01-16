import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

//get window dimension
const window = Dimensions.get('window');

let interval: NodeJS.Timeout;

//to format the mins and secs
const formatNumber = (number: any) => `0${number}`.slice(-2);

//function to return mins and secs
const getTime = (time: number) => {

  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;

  return { mins: formatNumber(mins), secs: formatNumber(secs) }
}

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const { mins, secs } = getTime(time);

  //toggle start pause
  const toggle = () => {
    setIsActive(!isActive)
  }

  //Reset button 
  const Reset = () => {
    setIsActive(false)
    //resetting the time back to 0
    setTime(0);
  }

  // renders for the state change of isActive and time
  useEffect(() => {
    if (isActive) {
      //runs for every 1 sec interval
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time])


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      {
        //if not active renders Start button
        !isActive ?
          (<TouchableOpacity style={styles.startButton} onPress={toggle}>
            <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>) :
          (
            //else renders the pause and reset button
            <>
              <TouchableOpacity style={[styles.startButton, styles.pauseButton]} onPress={toggle}>
                <Text style={[styles.startText, styles.pauseText]}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.startButton, styles.resetButton]} onPress={Reset}>
                <Text style={[styles.startText, styles.resetText]}>Reset</Text>
              </TouchableOpacity>
            </>
          )

      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton:
  {
    borderWidth: 10,
    borderColor: '#E900FF',
    height: window.width / 2,
    width: window.width / 2,
    borderRadius: window.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  startText:
  {
    fontSize: 45,
    color: '#E900FF'
  },
  pauseButton:
  {
    borderColor: '#5800FF'
  },
  pauseText:
  {
    color: '#5800FF'
  },
  timerText:
  {
    color: '#ffff',
    fontSize: 90,
    marginBottom: 10
  },
  resetButton:
  {
    borderColor: '#FFC600',
    marginTop: 25,
    borderWidth: 10,
    borderRadius: 0,
    height: window.width / 4,
    width: window.width / 2,
  },
  resetText:
  {
    color: '#FFC600'
  }
});
