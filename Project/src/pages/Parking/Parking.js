import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { List, RadioButton } from 'react-native-paper';
import ButtonComp from '@src/components/Buttons/Buttons'
import { FlatGrid } from 'react-native-super-grid'
import { connect } from 'react-redux'
import Payment from '../Payment/Payment'
import SocketIOClient from 'socket.io-client'
import TakeNowMethod from './TakeNowMethod'
import { registeredCars } from '@src/reduxStore/registeredCars/actions/registeredCars'
import { parkingSpaces } from '@src/reduxStore/updateParkingSpaces/actions/updateParkingSpaces'
import { sendUserSetup } from '@src/reduxStore/sendUserSetup/actions/sendUserSetup';
import { errorMessageBK } from '@src/reduxStore/errorMessageBK/actions/errorMessageBK';
import { timerSetup } from '@src/reduxStore/timerSetup/actions/timerSetup'

class Parking extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      payActive: true,
      items: [],
      activeOption: '',
      paymentOption: true,
      parkingOption: '',
      radioOptions: ['Take Now', 'Reserv Now', 'Extend Time'],
      price: 2
    }

  }

  componentDidMount = async() => {

    this.props.registeredCars(this.props.username)
    this.socket = SocketIOClient('http://192.168.0.103:8002')

    this.socket.on("ParkingSpaces", async(result) => {
      await this.props.parkingSpaces(result)
    })

    this.socket.on("changedPlace", async(result) => {
      await this.props.parkingSpaces(result)
    })

    this.socket.on("lotsChecker", async(result) => {
      await this.props.parkingSpaces(result)
    })

    this.socket.on("errorMessage", async(error) => {
      await this.props.errorMessageBK(error)
    })

    this.socket.on("settingTimer", async(info) => {
      await this.props.timerSetup(info)
    })

  }

  componentWillUnmount = () => {
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
    this.socket.emit("ParkingLots")
    this.setState({ payActive: true })
  }

  conditionChecker = (value) => {
    switch (value) {
      case 'Take Now':
        return <TakeNowMethod/>
      case 'Extend Time':
        // If you want to use this option Extend Time -> timer left should be 5 minutes
      // if timer == 5 minutes
      // dispatch
      break
      case 'Reserv Now':
        // dispatch
        break
      default: 
          return (
            <></>
          )
    }
  }

  userSetupPayment = async(spot, price) => {
    let option = this.state.parkingOption
    let status, code = ''
    
    if(option === "Take Now" || option === "Extend Time") status = "Taken", code = "#bc0000"
    if(option === "Reserv Now") status = "Reserved", code = "#ffcb00"

    const userSetup = {
      user_price: price,
      type: 'Sub',
      carNumber: this.props.selected,
      username: this.props.username,
      placeStatus: spot.status,
      placeId: spot.id,
      status: status,
      code: code
    } 

    await this.props.sendUserSetup(userSetup, this.socket, this.props.selected)
  }


  timerShow = (findSpecificOne, id) => {
    if(findSpecificOne !== undefined) {
      const timer = findSpecificOne?.[id.toString()]['timerSetup']
      return (
        <View>
          <List.Item
          title='Time Left'
          titleStyle={styles.textStyle}
          description={`${timer.hours} : ${timer.minutes} : ${timer.seconds}`}
          descriptionStyle={styles.textTimer}
          />
        </View>
      )
    }
  }

  checkedOption = (el, status, findSpecificOne, id) => {
    const specificTimer = findSpecificOne?.[id.toString()]['timerSetup']
    let time = ''
    if(specificTimer) {
      time = `${specificTimer.hours}:${specificTimer.minutes}:${specificTimer.seconds}`
    } 
    switch(status) {
      
      case "Taken":
        if(time < "00:05:00") {
          return el === "Reserv Now" || el === 'Take Now'
        } else {
          return el === "Extend Time" || el === "Reserv Now" || el === 'Take Now'
        }
      case "Free":
        return el === "Extend Time"
      case "Reserved":
        return el === "Extend Time" || el === "Take Now"
      default:
        return
    }
  }

  viewSpot = (spot) => {
    // timer should remains after cleaning the expo app -> status is not changing at all -> 
    //tomorrow should think about how to procced with the timer
    const { parkingOption, price } = this.state
    const findSpecificOne = this.props.timer?.find((x) => Object.keys(x).toString() === spot.id.toString())
    const findSpecificStatus = this.props.data?.find((x) => x.id === spot.id).status

    return (
      this.state.paymentOption ?
        <View key={spot.id} style={styles.spot}>
          <View> 
            <List.Item
              title={`Parking Space ${spot.id}`}
              titleStyle={{ color: 'white', fontSize: 18 }}
              description={`Current status of the spot is ${findSpecificStatus}`}
              descriptionStyle={{ color: 'white', fontSize: 18 }}
              left={() => <MaterialCommunityIcons name="parking"
                style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}
                size={50} color="white" />}
            />
          </View>
          {/* should make timer with calendar for extend time and reserv now */}
          <View style={styles.rowRadioButton}>
            {this.state.radioOptions.map((el, index) => {
              return (
                <RadioButton.Group key={index} onValueChange={(value) => this.setState({ parkingOption: value})} value={parkingOption}>
                  <RadioButton.Item key={index} color='white' labelStyle={{ color: 'white' }} label={el} value={el} 
                  disabled={this.checkedOption(el, findSpecificStatus, findSpecificOne, spot.id)}/>
                </RadioButton.Group>
              )
            })}
          </View>
          {this.props.status ? this.timerShow(findSpecificOne, spot.id) : null}
          {this.state.parkingOption !== '' ? this.conditionChecker(parkingOption) : null}

          <View style={{ flex: 0.8}}>
            {!this.props.statusLoader ? null : <ActivityIndicator size="large" color="red"></ActivityIndicator> }
            {this.props.errorMessage ? <Text style={styles.errorMessageStyle}>{this.props.errorMessage}</Text> : null}
            {this.props.errorPlace ? <Text style={styles.errorPlaceStyle}>{this.props.errorPlace}</Text> : null}
          </View>

          <View style={styles.doubleButton}>
            <ButtonComp
              style={{ backgroundColor: this.props.balance == 0 || this.state.parkingOption == '' ? 'gray' : '#00aeef', margin: 10, borderRadius: 8, width: 150, padding: 10, alignItems: 'center', justifyContent: 'center' }}
              disabled={this.state.parkingOption == ''} onPress={() => {
                this.userSetupPayment(spot, price)
                this.setState({ parkingOption: '' })
              }}>Pay</ButtonComp>
            <ButtonComp onPress={() => { this.onPayment, this.setState({ paymentOption: false })}}>Add Funds</ButtonComp>
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
    
    if(this.state.payActive == false) {
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
        {this.props.data ? 
        <FlatGrid
        itemDimension={90}
        data={this.props.data}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id_lots} onPress={() => {this.setState({ items: item }), this.setState({ payActive: false }), this.setState({ parkingOption: '' })}}>
            <View key={item.id_lots} style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.id_lots}</Text>
              <MaterialCommunityIcons name="parking"
                                color={'white'}
                                size={32}
                                style={{ marginBottom: 5 }} />
              <Text style={styles.itemCode}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
        /> : this.props.error}
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
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    flex: 2,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
    flex: 2,
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
  },
  errorMessageStyle:{
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    marginTop: 30
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10
  },
  textTimer: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 12
  },
  errorPlaceStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    marginTop: 45
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    balance: state.userBalance.balance,
    selected: state.selectedCar.selected,
    data: state.getAllParkingsSpaces.data,
    error: state.getAllParkingsSpaces.error,
    statusLoader: state.sendUserSetup.statusLoader,
    errorMessage: state.sendUserSetup.errorMessage,
    errorPlace: state.errorMessage.error,
    timer: state.timerSetup.timer,
    status: state.timerSetup.status
  }
}

const mapDispatchToProps = dispatch => ({
  registeredCars: (username) => dispatch(registeredCars(username)),
  parkingSpaces: (data) => dispatch(parkingSpaces(data)),
  sendUserSetup: (userSetup, socket, selected) => dispatch(sendUserSetup(userSetup, socket, selected)),
  errorMessageBK: (error) => dispatch(errorMessageBK(error)),
  timerSetup: (info) => dispatch(timerSetup(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(Parking)