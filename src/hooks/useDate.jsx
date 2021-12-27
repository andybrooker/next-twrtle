import { DateTime } from 'luxon';

const getDate = () => {

    return DateTime.now().minus({ week: 1 }).endOf('week').toLocaleString(DateTime.DATE_HUGE);

}

export default function useDate() {
    return getDate()
}