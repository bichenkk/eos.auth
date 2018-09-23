import moment from 'moment'
import appLogo from '../assets/logo-app.png'

export const LIST_PAGESIZE = 20
export const MENU_OPEN_KEYS = [
  'shop_related',
  'settings',
]

export const SHOP_COLLAPSE_ACTIVE_KEYS = [
  'address',
  'contact',
]

export const APP_NAME = 'Mingo'
export const LOGO_APP_LIGHT = appLogo
export const LOGO_APP_DARK = appLogo
export const LOGO_TEXT_LIGHT = appLogo
export const LOGO_TEXT_DARK = appLogo
export const THEME_PRIMARY_COLOR = '#6dcff6'
export const FOOTER_CONTENT = '© 2018 EOS AUTH SERVICE.'

const ACCESS_LOG = [
  {
    id: 1,
    icon_image_url: 'https://mobidoc.hk/images/logo-app.png',
    title: 'Demo App 1',
    eos_account: 'demo_app',
    description: 'Demo Purpose Medical App',
    permission: ['medical_record'],
    income: 0,
  },
  {
    id: 2,
    icon_image_url: 'https://mobidoc.hk/images/logo-app.png',
    title: 'Demo App 1',
    eos_account: 'demo_app',
    description: 'Demo Purpose Medical App',
    permission: ['medical_record'],
    income: 0,
  },
  {
    id: 3,
    icon_image_url: 'https://mobidoc.hk/images/logo-app.png',
    title: 'Demo App 1',
    eos_account: 'demo_app',
    description: 'Demo Purpose Medical App',
    permission: ['medical_record'],
    income: 0,
  }, {
    id: 4,
    icon_image_url: 'https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-png-transparent-background-800x799.png',
    title: 'Instagram',
    eos_account: 'instagram',
    description: 'A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.',
    permission: ['personal_information', 'photo_albums'],
    income: 6,
  }, {
    id: 5,
    icon_image_url: 'https://getkawa.com/images/kawa-yellow-01-01.png',
    title: 'Kawa',
    eos_account: 'kawa',
    description: 'Kawa is an APP that helps you get your daily coffee in the best coffee shops.',
    permission: ['personal_information'],
    income: 1,
  },
]

export const ACCESS_RECORDS = ACCESS_LOG.map(item => ({ ...item, created_at: moment() }))

export const APPROVED_APPLICATIONS = [
  {
    icon_image_url: 'https://mobidoc.hk/images/logo-app.png',
    title: 'Demo App 1',
    eos_account: 'demo_app',
    description: 'Demo Purpose Medical App',
    permission: ['medical_record'],
    income: 0,
  }, {
    icon_image_url: 'https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-png-transparent-background-800x799.png',
    title: 'Instagram',
    eos_account: 'instagram',
    description: 'A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.',
    permission: ['personal_information', 'photo_albums'],
    income: 6,
  }, {
    icon_image_url: 'https://getkawa.com/images/kawa-yellow-01-01.png',
    title: 'Kawa',
    eos_account: 'kawa',
    description: 'Kawa is an APP that helps you get your daily coffee in the best coffee shops.',
    permission: ['personal_information'],
    income: 1,
  },
]

export const PERMISSIONS = [
  {
    title: 'Personal Information',
    device: 'iMac Desktop',
    host: '127.0.0.1',
    data_path: './Users/bichenkk/Desktop/personal',
    color: '#ff0000',
  },
  {
    title: 'Medical Record',
    device: 'Synology NAS',
    host: '127.0.0.1',
    data_path: 'volume1/private/medial',
    color: '#7773BF',
  },
  {
    title: 'Photo Albums',
    device: 'Synology NAS',
    host: '127.0.0.1',
    data_path: 'volume1/share/album',
  },
]
