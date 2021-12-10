import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'

const Table = ({ headers, content, text, itemPerPage }) => {
    const [currPage, setPage] = useState('')
    const { slice, range } = useTable(content, currPage, itemPerPage);
    
    return (
        <>
            {TableText(text, content)}
            <View style={styles.header}>
                {TableHeader(headers)}
            </View>
            {TableContent(slice)}
            {Pagination(range, setPage, currPage, slice)}
        </>
    )
}

const calculateRange = (content, itemPerPage) => {
    const range = []
    const num = Math.ceil(content.length / itemPerPage)
    
    for(let i = 1; i <= num; i++) {
        range.push(i)
    }

    return range
}

const sliceData = (content, page, itemPerPage) => {
    return content.slice((page - 1) * itemPerPage, page * itemPerPage)
}

const TableHeader = (headers) => {
    return headers?.map((el, index) => {
        return (
            <View key={index}>
                <Text style={styles.textRow}>{el}</Text>
            </View>
        )
    })
}

const TableText = (text, content) => {
    return (
        <View>
            {
                (text && content.length > 0) ?
                    <Text style={styles.textStyle}>{text} {content.length}</Text>
                : null
            }
        </View>
    )
}

const TableContent = (slice) => {
    const mapSlice = slice.map((el) => {
        return Object.values(el)
    })

    return mapSlice.map((el, index) => {
        return (
            <View style={styles.tableContent} key={index}>
                {el.map((item, i) => {
                    return (
                        <Text key={i} style={styles.textStyleContent} onPress={() => ToastAndroid.show(`${item}`, ToastAndroid.SHORT)}>{item}</Text>
                    )
                })}
            </View>
        )
    })
    
}


const useTable = (content, page, itemPerPage) => {
    const [tableRange, setTableRange] = useState([])
    const [slice, setSlice] = useState([])
  
    useEffect(() => {
       if(content != undefined && itemPerPage != undefined && page != undefined) {
        const range = calculateRange(content, itemPerPage)
        setTableRange([...range])
    
        const slice = sliceData(content, page, itemPerPage)
        setSlice([...slice])
       }
    }, [content, setTableRange, page, setSlice])
  
    return { slice, range: tableRange }
}

const Pagination = (range, setPage, page, slice) => {
    const low = '<'
    const big = '>'
    useEffect(() => {
        if(slice.length < 1 && page !== 1) {
            setPage(1)
        }
    }, [slice, page, setPage])

    return (
        <View style={styles.paginator}>
            <TouchableOpacity style={styles.button} key={'<'}
            onPress={() => 
            {
                if(page <= 0 || page == 1) {
                    setPage(1)
                } else {
                    setPage(page - 1)}
                }
            }>
            <Text style={{ color: 'white', fontSize: 20 }}>{low}</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 20}}>{page}</Text>
            <TouchableOpacity style={styles.button} key={'>'}
            onPress={() => {
                if(page < range.length ) {
                    setPage(page + 1)
                } else {
                    setPage(1)
                }
            }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{big}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 6,
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
        flex: 0.4,
        padding: 0.2,
        textAlignVertical: 'center', 
        color: 'white', 
        fontSize: 13, 
        textAlign: 'center',
    },
    textRow: {
        color: 'white',
        margin: 7
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

module.exports =  Table