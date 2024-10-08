interface DataType {
  id: number
  title: string
  link: string
  has_dropdown: boolean
  sub_menus?: {
    link: string
    title: string
    inner_has_dropdown?: boolean
    inner_sub?: {
      link: string
      title: string
    }[]
  }[]
}

// menu data
const menu_data: DataType[] = [
  {
    id: 1,
    title: 'Trang Chủ',
    link: '/',
    has_dropdown: false,
  },
  {
    id: 2,
    title: 'Cửa Hàng',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { link: '/featured-items', title: 'Phương Tiện' },
      { link: '/live-bidding', title: 'Blindbox & Gacha' },
      { link: '/collections', title: 'Truck' },
      { link: '/top-seller', title: 'House n Door' },
      { link: '/top-buyer', title: 'Mapping' },
      // { link: '/item-details', title: 'Item Details' },
    ],
  },
  {
    id: 3,
    title: 'Hướng Dẫn',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { link: '/activity', title: 'Activity' },
      { link: '/ranking', title: 'Ranking' },
      // { link: '/create-new', title: 'Create New Items' },
      { link: '/connet-wallet', title: 'Connect Wallet' },
      { link: '/author', title: 'Author Profile' },
      {
        link: '#',
        title: 'Authentification',
        inner_has_dropdown: true,
        inner_sub: [
          { link: '/register', title: 'Register' },
          { link: '/login', title: 'Login' },
          { link: '/forget-password', title: 'Forget Password' },
        ],
      },
      {
        link: '#',
        title: 'Blog',
        inner_has_dropdown: true,
        inner_sub: [
          { link: '/blog', title: 'Blog' },
          { link: '/blog-details', title: 'Blog Details' },
        ],
      },
      {
        link: '#',
        title: 'Others',
        inner_has_dropdown: true,
        inner_sub: [
          { link: '/about', title: 'About Us' },
          { link: '/contact', title: 'Contact' },
          { link: '/coming-soon', title: 'Coming Soon' },
          { link: '/newsletter', title: 'Newsletter' },
          { link: '/privacy', title: 'Privacy Policy' },
          { link: '/terms', title: 'Terms' },
          { link: '/404', title: '404' },
        ],
      },
      {
        link: '#',
        title: 'Help Center',
        inner_has_dropdown: true,
        inner_sub: [
          { link: '/help-center', title: 'Help Home' },
          { link: '/help-questions', title: 'All Questions' },
          { link: '/question-details', title: 'Question Details' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Others',
    link: '#',
    has_dropdown: true,
    sub_menus: [
      { link: '/about', title: 'About Us' },
      { link: '/contact', title: 'Contact' },
      // { link: '/dashboard', title: 'Dashboard' },
      // { link: '/live-bids', title: 'Live Bids' },
      // { link: '/my-collection', title: 'My Collection' },
      // { link: '/my-wallet', title: 'My Wallet' },
      // { link: '/notifications', title: 'Notifications' },
      // { link: '/settings', title: 'Settings' },
    ],
  },

  {
    id: 6,
    title: 'Help Center',
    link: '/help-center',
    has_dropdown: false,
  },
]
export default menu_data
