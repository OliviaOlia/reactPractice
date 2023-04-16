export const reducer = (state, action) => {
	if (action.type === 'ADD_TITLE') {
		return { ...state, title: action.payload };
	}
	if (action.type === 'ADD_DESCRIPTION') {
		return { ...state, description: action.payload };
	}
	if (action.type === 'ADD_DURATION') {
		return { ...state, duration: action.payload };
	}
	if (action.type === 'ADD_AUTHOR') {
		const newAuthors = [...state.authors, action.payload];
		return { ...state, authors: newAuthors };
	}
	if (action.type === 'REMOVE_AUTHOR') {
		const newAuthors = state.authors.filter(
			(a) => a.name !== action.payload.name
		);
		return { ...state, authors: newAuthors };
	}

	throw new Error('no matching action type');
};
