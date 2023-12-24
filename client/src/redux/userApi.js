import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['Users'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://tsk4-server.vercel.app/' }),
	endpoints: build => ({
		getUsers: build.query({
			query: () => '/getUsers',
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Users', id })),
							{ type: 'Users', id: 'LIST' },
					  ]
					: [{ type: 'Users', id: 'LIST' }],
		}),
		signUp: build.mutation({
			query: body => ({
				url: '/signUp',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		changeStatus: build.mutation({
			query: body => ({
				url: '/changeStatus',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		login: build.mutation({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		delete: build.mutation({
			query: body => ({
				url: '/deleteUsers',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetUsersQuery,
	useSignUpMutation,
	useChangeStatusMutation,
	useLoginMutation,
	useDeleteMutation,
} = userApi
