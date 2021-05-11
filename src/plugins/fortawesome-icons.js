/* eslint-disable comma-dangle */
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserCheck,
  faUserTimes,
  faRunning,
  faBuilding,
  faBook,
  faCalendarDay,
  faCarSide,
  faPen,
  faCircleNotch,
  faEye,
  faPencilAlt,
  faTrash,
  faCheckCircle,
  faQuestionCircle,
  faFile,
  faUserClock,
  faUserFriends,
  faCalendarAlt,
  faSadTear,
  faMapMarker,
  faHeart,
  faEnvelope,
  faHome,
  faUser,
  faBell,
  faStar,
  faClock,
  faTimes,
  faFileWord
} from '@fortawesome/free-solid-svg-icons'

const icons = [
  faUserCheck,
  faUserTimes,
  faRunning,
  faBuilding,
  faBook,
  faCalendarDay,
  faCarSide,
  faPen,
  faCircleNotch,
  faEye,
  faPencilAlt,
  faTrash,
  faCheckCircle,
  faQuestionCircle,
  faFile,
  faUserClock,
  faUserFriends,
  faCalendarAlt,
  faSadTear,
  faMapMarker,
  faHeart,
  faEnvelope,
  faHome,
  faUser,
  faBell,
  faStar,
  faClock,
  faTimes,
  faFileWord
]

export default {
  install () {
    config.autoReplaceSvg = true
    config.observeMutations = true
    dom.watch()

    icons.forEach((icon) => library.add(icon))
  }
}
