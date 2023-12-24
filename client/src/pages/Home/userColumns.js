const columns = [
	{ field: 'id', headerName: 'ID' },
	{ field: 'name', headerName: 'Name' },
	{ field: 'email', headerName: 'e-Mail', width: 250 },
	{
		field: 'registrationDate',
		headerName: 'Registration Date',
		width: 200,
		hideable: false,
	},
	{
		field: 'lastLoginDate',
		headerName: 'Last Login Date',
		width: 200,
	},
	{ field: 'isBanned', headerName: 'Status' },
]

export default columns
