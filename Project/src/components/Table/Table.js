import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { sortedTable, setType } from '@src/reduxStore/table/actions/table_actions'
import { Button } from 'react-native-paper'

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            check: '',
        }
    }

    tableText = () => {
        return (
            <View>
                {
                    (this.props.text && this.props.content.length > 0) ?
                        <Text style={styles.textStyle}>{this.props.text} {this.props.content.length}</Text>
                        : null
                }
            </View>
        )
    }

    toogleChanged = (el) => {
        this.setState({ check: !this.state.check })
        this.sortTableByKey(el)
    }

    sortTableByKey = (key) => {
        if (key != undefined && this.state.check != undefined) {
            let lowerCaseKeys = key.toLowerCase()
            let newContent = ''
    
            const checkKey = () => {
                switch (lowerCaseKeys) {
                    case "symbol of access":
                        return lowerCaseKeys = "disabledParkingSpace"
                    case "user car number":
                        return lowerCaseKeys = "carNumber"
                    default:
                        return lowerCaseKeys
                }
            }
    
    
            if (this.state.check == false) {
                if (checkKey() == "funds") {
                    newContent = this.props.content.sort((a, b) => {
                        return a[checkKey()] - b[checkKey()]
                    })
                } else {
                    newContent = this.props.content.sort((a, b) => {
                        return a[checkKey()].localeCompare(b[checkKey()])
                    })
                }
            } else if (this.state.check == true) {
                if (checkKey() == "funds") {
                    newContent = this.props.content.sort((a, b) => {
                        return b[checkKey()] - a[checkKey()]
                    })
    
                } else {
                    newContent = this.props.content.sort((a, b) => {
                        return b[checkKey()].localeCompare(a[checkKey()])
                    })
                }
    
            }
            return newContent
        }
    
        return content
    }

    tableHeader = () => {
        return (
            <View style={styles.header}>
                {this.props.headers?.map((el, index) => {
                    return (
                        <View key={index}>
                            <Button key={el} onPress={() => { this.toogleChanged(el)}}>
                                <Text style={styles.textRow}>{el}</Text>
                            </Button>

                        </View>
                    )
                })}
            </View>
        )
    }

    tableContent = () => {
        const { slice, range } = this.useTable()

        return slice.map((el) => Object.values(el)).map((element, index) => {
            return (
                <View style={styles.tableContent} key={index}>
                    {element.map((item, i) => {
                        return (
                            <Text key={i} style={styles.textStyleContent} onPress={() => ToastAndroid.show(`${item}`, ToastAndroid.SHORT)}>{item}</Text>
                        )
                    })}
                </View>
            )
        })
    }


    calculateRange = () => {
        const range = []
        const num = Math.ceil(this.props.content.length / this.props.itemPerPage)
    
        for (let i = 1; i <= num; i++) {
            range.push(i)
        }
    
        return range
    }
    
    sliceData = () => {
        return this.props.content.slice((this.state.page - 1) * this.props.itemPerPage, this.state.page * this.props.itemPerPage)  
    }

    useTable = () => {
        const range = this.calculateRange()
        const slice = this.sliceData()

        return { slice, range}
    }

    tablePaginator = () => {
        const { slice, range } = this.useTable()
        const low = '<'
        const big = '>'

        if(slice.length < 1  && this.state.page !== 1) {
            this.setState({ page: 1 })
        }
  
        return (
            <View style={styles.paginator}>
                <TouchableOpacity style={styles.button} key={'<'}
                    onPress={() => {
                        if (this.state.page <= 0 || this.state.page == 1) {
                            this.setState({ page: 1 })
                        } else {
                            this.setState({ page: this.state.page - 1 })
                        }
                    }
                    }>
                    <Text style={{ color: 'white', fontSize: 20 }}>{low}</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 20 }}>{this.state.page}</Text>
                <TouchableOpacity style={styles.button} key={'>'}
                    onPress={() => {
                        if (this.state.page < range.length) {
                            this.setState({ page: this.state.page + 1 })
                        } else {
                            this.setState({ page: 1 })
                        }
                    }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>{big}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <>
                {this.tableText()}
                {this.tableHeader()}
                {this.tableContent()}
                {this.tablePaginator()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 3,
        elevation: 3,
        backgroundColor: '#12285c',
        borderColor: 'white',
        borderWidth: 0.3,
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#12285c',
        borderColor: 'white',
        borderWidth: 0.3
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    textStyleContent: {
        flex: 0.3,
        padding: 0.5,
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
    },
    textRow: {
        color: 'white',
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7,
    },
    paginator: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#2c3e50',
        fontSize: 16,
        width: Dimensions.get('window').width,
        height: 60
    },
    button: {
        padding: 7
    }
})

const mapStateToProps = (state) => {
    return {
        sorted: state.sortedTable.sorted,
        type: state.sortedTable.type,
        status: state.sortedTable.status
    }
}


const mapDispatchToProps = dispatch => ({
    sortedTable: (sorted) => dispatch(sortedTable(sorted)),
    setType: (type) => dispatch(setType(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)