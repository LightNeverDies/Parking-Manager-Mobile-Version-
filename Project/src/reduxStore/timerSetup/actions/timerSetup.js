import { timerSetup_Finnished, timerSetup_Success } from '../../constants/constants'
import moment from "moment";

export const timerSetup = (info) => async(dispatch) => {
    if(info) {
        let duration = moment.duration(info.duration, 'milliseconds')
        let interval = 1000
        let time = ''

        let handle = setInterval(() => {
            duration = moment.duration(duration - interval, 'milliseconds')
            time = `${duration.hours().toString().padStart(2, '0')}:${duration.minutes().toString().padStart(2, 0)}:${duration.seconds().toString().padStart(2, '0')}`

            if(time === "00:00:00") {
               clearInterval(handle)
               dispatch({
                    type: timerSetup_Finnished,
                    payload: {
                        timer: {
                            placeId: info.placeId,
                            status: false
                        }
                    }
                })
            } else {
                dispatch({
                    type: timerSetup_Success,
                    payload: {
                        [info.placeId]: {
                            status: info.status,
                            timerSetup: {
                                placeId: info.placeId,
                                hours: `${duration.hours().toString().padStart(2, '0')}`,
                                minutes: `${duration.minutes().toString().padStart(2, 0)}`,
                                seconds: `${duration.seconds().toString().padStart(2, '0')}`,
                            }
                        }
                    }
                })
            }

        }, interval)
    } else {
        dispatch({
            type: timerSetup_Finnished,
            payload: {
                timer: []
            }
        })
    }
}