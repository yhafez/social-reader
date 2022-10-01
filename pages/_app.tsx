import 'regenerator-runtime'
import ThemeProvider from '../context/ThemeContext'
import BookViewerProvider from '../context/BookViewerContext'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<BookViewerProvider>
				<Component {...pageProps} />
			</BookViewerProvider>
		</ThemeProvider>
	)
}

export default App
