import React from 'react'
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import { StyleSheet, View, Text} from 'react-native'
import { requestStatistic } from '@src/reduxStore/statistic/actions/Statistic'
import { connect } from 'react-redux'

class Statistic extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        this.props.requestStatistic()
    }


    render() {

        const data = Object.values(this.props.data).map(item => {
            return item
        })
        const count = data.map(c => {
            return c.count 
        })
        const date = data.map(d => {
            return d.date
        })
        
        return (
            <View style = {styles.ground}>
                <Text style = {styles.textStyle}>Users Registered By Month</Text>
                <BarChart
                data={{
                    labels: date,
                    datasets: [
                      {
                        data: count
                      }
                    ]
                  }}
                width={Dimensions.get('window').width}
                height={220}
                fromZero= {true}
                verticalLabelRotation={0}
                showValuesOnTopOfBars={true}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726"
                    },
                    fillShadowGradient:'#ba2d2d',
                    fillShadowGradientOpacity:1,
                  }}
                />
            </View>
            
        )
    }

}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
    },
    ground: {
        flex:1,
        height: "100%",
    }
})

const mapStateToProps = (state) => {
    return {
        data: state.statistic.data
    }
}

const mapDispatchToProps = dispatch => ({ 
    requestStatistic: () => dispatch(requestStatistic())
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistic)