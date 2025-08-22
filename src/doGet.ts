type GetSuccessResponse = {
	result: "done";
	timestamp: number;
};

type GetErrorResponse = {
	result: "error";
	error: string;
};

type GetResponse = GetSuccessResponse | GetErrorResponse;

function _doGet() {
	const result = doGet();
	console.log(result.getContent());
}

function doGet(): GoogleAppsScript.Content.TextOutput {
	let response: GetResponse;

	try {
		const now = new Date();
		const unixTime = Math.floor(now.getTime() / 1000);
		response = { result: "done", timestamp: unixTime };
	} catch (error) {
		response = {
			result: "error",
			error: error instanceof Error ? error.message : String(error),
		};
	}

	return ContentService.createTextOutput(JSON.stringify(response));
}
