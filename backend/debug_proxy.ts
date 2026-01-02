import axios from 'axios';

// The URL configured in the admin panel (English resume)
const targetUrl = 'https://www.dropbox.com/scl/fi/9fiijg8e0kxakzrmeqoxi/Resume-EN.pdf?rlkey=k6012yxq1txtzpbkpxq3l0jwk&st=0j81m0ko&raw=1';

async function testProxy() {
    try {
        console.log("Testing Proxy with URL:", targetUrl);
        const proxyUrl = `http://localhost:4000/api/proxy?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await axios.get(proxyUrl, {
            responseType: 'arraybuffer' // Get raw data to check size/type
        });

        console.log("Status:", response.status);
        console.log("Headers:", response.headers);
        console.log("Data Length:", response.data.length);
        
        // Preview first few bytes to see if it looks like a PDF (%PDF)
        const start = response.data.slice(0, 5).toString();
        console.log("First 5 bytes:", start);

    } catch (error: any) {
        console.error("Proxy Test Failed:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data.toString());
        }
    }

    try {
        console.log("Testing Settings Route...");
        const res = await axios.get('http://localhost:4000/api/settings');
        console.log("Settings Route Status:", res.status);
        console.log("Settings:", res.data);
    } catch (e: any) {
        console.error("Settings/Server Check Failed:", e.message);
    }
}

testProxy();
