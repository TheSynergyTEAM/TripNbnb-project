import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(RelativeTime)
dayjs.locale('ko')

export default dayjs
