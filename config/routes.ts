export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DASHBOARD
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'HomeOutlined',
		component: './TrangChu',
	},

	///////////////////////////////////
	// ĐẶT LỊCH & QUẢN LÝ LỊCH
	{
		path: '/quan-ly-lich',
		name: 'Quản lý lịch',
		icon: 'CalendarOutlined',
		component: './QuanLyLich',
	},

	///////////////////////////////////
	// ABOUT
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},

	///////////////////////////////////
	// RANDOM USER
	{
		path: '/random-user',
		name: 'RandomUser',
		icon: 'ArrowsAltOutlined',
		component: './RandomUser',
	},

	///////////////////////////////////
	// NOTIFICATION
	{
		path: '/notification',
		routes: [
			{
				path: '/notification/subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: '/notification/check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: '/notification',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},

	///////////////////////////////////
	// ROOT
	{
		path: '/',
		redirect: '/dashboard',
	},

	///////////////////////////////////
	// ERROR
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},

	///////////////////////////////////
	// 404
	{
		component: './exception/404',
	},
];
