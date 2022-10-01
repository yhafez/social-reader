import { render } from '@testing-library/react'
import Home from '../pages'
import chapters from '../config/jest/__mocks__/chapters.js'

describe('App', () => {
	it('should work as expected', () => {
		render(<Home chapters={chapters} />)
	})
})
