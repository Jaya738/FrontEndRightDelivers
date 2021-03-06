//Create a file called config.js with this format.
const isProd = true
const prodUrl = "https://api.rightdelivers.in/user/api/v1/";
const devUrl = "https://testapi.rightdelivers.in/user/api/v1/";
const devStream = "https://teststream.rightdelivers.in";
const prodStream = "https://stream.rightdelivers.in";

export const streamUrl = isProd ? prodStream : devStream;
export const baseUrl = isProd ? prodUrl : devUrl;
export const imgUrl = "https://rightdelivers.in/uploads/";
export const GoogleMapsAPI = "ENTER_YOUR_API_KEY_HERE";