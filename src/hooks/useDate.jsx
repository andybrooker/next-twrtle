import { DateTime } from "luxon";

const getDate = () => {
  if (DateTime.now().weekday === 7) {
    return DateTime.now().toLocaleString(DateTime.DATE_HUGE);
  } else {
    return DateTime.now()
      .minus({ week: 1 })
      .endOf("week")
      .toLocaleString(DateTime.DATE_HUGE);
  }
};

export default function useDate() {
  return getDate();
}
