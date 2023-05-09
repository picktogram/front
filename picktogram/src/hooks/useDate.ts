import {format, differenceInCalendarDays, differenceInHours, differenceInMinutes } from 'date-fns'

export default function useDate (created : string) {
    const minuteDiff = differenceInMinutes(new Date(), new Date(created))
    const hourDiff = differenceInHours(new Date(), new Date(created))
    const daysDiff = differenceInCalendarDays(new Date(), new Date(created));

    const createdDate = format(new Date(created), 'yyyy.MM.dd')

    if(minuteDiff <= 60) {
        return `${minuteDiff}분 전`
    }

    if(hourDiff <= 24) {
        return `${hourDiff}시간 전`
    }

    if(daysDiff >= 1 && daysDiff < 5) {
        return `${daysDiff}일 전`
    }

    return createdDate
}