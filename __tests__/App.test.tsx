import { render } from '@testing-library/react'
import Home from '../pages'
import book from '../config/jest/__mocks__/book'

describe('App', () => {
	it('should work as expected', () => {
		render(<Home book={book} />)
	})
})
