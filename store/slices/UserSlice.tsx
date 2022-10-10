import { StateCreator } from 'zustand'
import {
	IAudioPlayerSlice,
	IBookSlice,
	IBookViewerSlice,
	ISidebarSlice,
	ISpeedReaderSlice,
	IThemeSlice,
	IUserSlice,
	IBook,
} from '../../@types'

const createUserSlice: StateCreator<
	IAudioPlayerSlice &
		IBookSlice &
		IBookViewerSlice &
		ISidebarSlice &
		ISpeedReaderSlice &
		IThemeSlice &
		IUserSlice,
	[],
	[],
	IUserSlice
> = set => ({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
	toggleIsAuthenticated: () => set(state => ({ isAuthenticated: !state.isAuthenticated })),

	user: null,
	setUser: (user: IUserSlice['user']) => set({ user }),
	clearUser: () => set({ user: null }),

	token: null,
	setToken: (token: IUserSlice['token']) => set({ token }),
	clearToken: () => set({ token: null }),

	loading: false,
	setLoading: (loading: boolean) => set({ loading }),
	toggleLoading: () => set(state => ({ loading: !state.loading })),

	error: null,
	setError: (error: IUserSlice['error']) => set({ error }),
	clearError: () => set({ error: null }),

	success: null,
	setSuccess: (success: IUserSlice['success']) => set({ success }),
	clearSuccess: () => set({ success: null }),

	books: [],
	setBooks: (books: IBook[]) => set({ books }),
	clearBooks: () => set({ books: [] }),

	resetUser: () => {
		set({
			isAuthenticated: false,
			user: null,
			token: null,
			loading: false,
			error: null,
			success: null,
			books: [],
		})
	},
})

export default createUserSlice
