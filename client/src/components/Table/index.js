import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function Table({
	rows,
	columns,
	setSelectedRows = elements => {
		console.log(elements)
	},
	customToolbar = () => <></>,
}) {
	return (
		<DataGrid
			className='w-auto'
			rows={rows}
			columns={columns}
			onRowSelectionModelChange={ids =>
				setSelectedRows(ids.map(id => rows.find(row => row.id === id)))
			}
			initialState={{
				pagination: {
					paginationModel: { page: 0, pageSize: 10 },
				},
			}}
			checkboxSelection
			disableColumnMenu
			hideFooterSelectedRowCount
			disableRowSelectionOnClick
			slots={{
				toolbar: customToolbar,
			}}
		/>
	)
}
