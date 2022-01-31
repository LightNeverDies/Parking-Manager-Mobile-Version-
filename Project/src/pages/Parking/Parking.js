import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { List, RadioButton } from 'react-native-paper';
import ButtonComp from '@src/components/Buttons/Buttons'
import { FlatGrid } from 'react-native-super-grid'
import { connect } from 'react-redux'
import Payment from '../Payment/Payment'
import CountDown from 'react-native-countdown-component'
import SocketIOClient from 'socket.io-client'

class Parking extends React.Component {
  constructor() {
    super()

    this.state = {
      active: false,
      payActive: true,
      items: [],
      activeOption: '',
      paymentOption: true,
      startTimer: false,
      timer: '',
      parkingSpaces: [],
      parkingOption: '',
      radioOptions: ['Take Now', 'Reserv Now', 'Extend Time'],
      price: 2
    }
  }

  componentDidMount = () => {
    this.socket = SocketIOClient('http://192.168.1.5:8002')
    this.socket.on("ParkingSpaces", (result) => {
      this.setState({ parkingSpaces: result })
    })
  }

  componentWillUnmount = () => {
    this.setState({ startTimer: false })
    this.socket.disconnect()
  }

  onPayment = () => {
    return (
      <>
        <Payment></Payment>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ButtonComp
            style={{ backgroundColor: '#00aeef', borderRadius: 8, width: 150, padding: 10, alignItems: 'center', justifyContent: 'center' }}
            onPress={this.onPaymentOption}>Back</ButtonComp>
        </View>
      </>
    )
  }


  onPaymentOption = () => {
    this.setState({ paymentOption: true })
  }

  onBack = () => {
    this.setState({ payActive: true })
  }


  onPayMethod = () => {
    // if (this.state.seconds === 0) {
    //   return (
    //     <MaterialCommunityIcons name="timer-sand-empty"
    //       style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
    //       size={50} color="white" />
    //   )
    // } else {
    //   return (
    //     <MaterialCommunityIcons name="timer-sand"
    //       style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
    //       size={50} color="white" />
    //   )
    // }
  }

  countDownTimer = () => {
    return (
      <CountDown
        size={30}
        until={5}
        onFinish={() => alert('Finished')}
        onChange={(value) => this.setState({ timer: value })}
        digitStyle={{ backgroundColor: '#FFF' }}
        digitTxtStyle={{ color: '#1CC625' }}
        timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
        separatorStyle={{ color: '#1CC625' }}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{ m: null, s: null }}
        showSeparator
        running={this.state.startTimer}
      />
    )
  }

  userPay = (id, status, price) => {
    // 1 hours is 3600 seconds
    // 5 min are 300 seconds
    // needs to be sended an object with the current time and changed status to the backend to mysql  
    // console.log("Hello", this.state.timer)
    // if(this.state.timer == 300) {
    //   const minutes = 300 / 60
    //   console.log("Time left", minutes)
    // }
    if(this.props.balance != 0) {
      console.log("status", status)
      console.log('id', id)
      const diff = this.props.balance - price
      console.log(diff)
    }
  }

  conditionChecker = (value) => {
    if(value != this.state.parkingOption ) {
      this.setState({ parkingOption: value })
      
      switch (value) {
        case 'Take Now':
          break
        case 'Extend Time':
          // If you want to use this option Extend Time -> timer left should be 5 minutes
        // if timer == 5 minutes
        // dispatch
          break
        case 'Reserv Now':
          // dispatch
          break
      }

    }
    
  }


  viewSpot = (spot) => {
    const { parkingOption, price } = this.state
    console.log('this timer', this.state.timer)
    return (
      this.state.paymentOption ?
        <View style={styles.spot}>
          <View> 
            <List.Item
              title={`Parking Space ${spot.id}`}
              titleStyle={{ color: 'white', fontSize: 18 }}
              description={`Current status of the spot is ${spot.status}`}
              descriptionStyle={{ color: 'white', fontSize: 18 }}
              left={() => <MaterialCommunityIcons name="parking"
                style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                size={50} color="white" />}
            />
            {this.state.startTimer ? this.countDownTimer() : null}
          </View>
          {/* should make timer with calendar for extend time and reserv now */}
          <View style={styles.rowRadioButton}>
            {this.state.radioOptions.map((el, index) => {
              console.log(index)
              return (
                <RadioButton.Group key={index} onValueChange={value => this.conditionChecker(value)} value={parkingOption}>
                  <RadioButton.Item key={index} color='white' labelStyle={{ color: 'white' }} label={el} value={el} 
                  disabled={el == "Reserv Now" || el == "Extend Time"}/>
                </RadioButton.Group>
              )
            })}
          </View>
            
          <View style={styles.doubleButton}>
            <ButtonComp
              style={{ backgroundColor: this.props.balance == 0 ? 'gray' : '#00aeef', margin: 10, borderRadius: 8, width: 150, padding: 10, alignItems: 'center', justifyContent: 'center' }}
              disabled={this.state.parkingOption == '' } onPress={() => {
                this.setState({ startTimer: !this.state.startTimer }),
                this.userPay(spot.id, parkingOption, price)
              }}>Pay</ButtonComp>
            <ButtonComp onPress={() => { this.onPayment, this.setState({ paymentOption: false }) }}>Add Funds</ButtonComp>
          </View>
          <View style={styles.rowButton}>
            <ButtonComp onPress={this.onBack}>Back</ButtonComp>
          </View>
        </View> :
        this.onPayment()
    )
  }

  renderPage = () => {
    const spot = this.state.items
    if (this.state.payActive == false) {
      return (
        this.viewSpot(spot)
      )
    }
  }

  Grid = () => {
    return (
      this.state.payActive ?
        this.Legend() :
        this.renderPage()
    )

  }

  Legend = () => {
    return (
      <>
        <Text style={styles.textStyle}>Information</Text>
        <View style={styles.container}>
          <View style={styles.rows}>
            <Text style={styles.legendText}>Free</Text>
            <View style={{ backgroundColor: '#69c100', marginLeft: 5, width: 18, height: 18, borderRadius: 22 }} />
          </View>
          <View style={styles.rows}>
            <Text style={styles.legendText}>Taken</Text>
            <View style={{ backgroundColor: '#bc0000', marginLeft: 5, width: 18, height: 18, borderRadius: 22 }} />
          </View>
          <View style={styles.rows}>
            <Text style={styles.legendText}>Reserved</Text>
            <View style={{ backgroundColor: '#ffcb00', marginLeft: 5, width: 18, height: 18, borderRadius: 22 }} />
          </View>
        </View>
        <Text style={styles.textStyle}>Payment for 1 hour is 2€</Text>
        <FlatGrid
          itemDimension={90}
          data={this.state.parkingSpaces}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => { this.setState({ items: item }), this.setState({ payActive: false }), console.log(item) }}>
              <View key={item.id} style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.parkSpace}</Text>
                <Text style={styles.itemCode}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        </>
    )
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        {this.Grid()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    width: 100,
    height: 130,
    margin: 10
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  mainContainer: {
    flex: 2.2,
    borderColor: 'white',
    borderWidth: 0.2,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  rows: {
    flexDirection: 'row',
    margin: 10
  },
  legendText: {
    color: 'white',
    fontSize: 14
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  spot: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center'
  },
  doubleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 100
  },
  rowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 8
  },
  rowRadioButton: {
    marginTop: 10,
    flexDirection: 'row',
    width: "25%",
    marginLeft: 10
  }
});

const mapStateToProps = (state) => {
  return {
    balance: state.userBalance.balance,
  }
}
export default connect(mapStateToProps, null)(Parking)