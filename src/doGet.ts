type GetResponse = {
	result: "done" | "error";
	timestamp?: number;
	error?: string;
};

function _doGet() {
	const result = doGet();
	console.log(result.getContent());
}

function doGet(): GoogleAppsScript.Content.TextOutput {
	const response: GetResponse = { result: "done" };

	try {
		const now = new Date();
		const unixTime = Math.floor(now.getTime() / 1000);
		response.timestamp = unixTime;
	} catch (error) {
		response.result = "error";
		response.error = error.message;
	}

	return ContentService.createTextOutput(JSON.stringify(response));
}
