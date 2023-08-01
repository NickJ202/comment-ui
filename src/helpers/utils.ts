export async function fetchAPI(args: { query: any; endpoint: string }) {
	const response = await fetch(args.endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(args.query),
	});
	try {
		return response.json();
	} catch (e: any) {
		console.error(e);
		return null;
	}
}
