const { Mega } = require('megajs');
const config = require('./config/config');

async function testMegaConnection() {
    console.log('Testing MEGA connection...');
    console.log('Using credentials:');
    console.log('Email:', config.mega.email);
    
    const mega = new Mega({
        email: config.mega.email,
        password: config.mega.password
    });

    try {
        console.log('Attempting to login...');
        await mega.login();
        console.log('✅ Successfully connected to MEGA!');
        
        // Test getting files
        console.log('Fetching files...');
        const files = await mega.getFiles();
        console.log(`Found ${files.length} files/folders`);
        
        // Log storage info
        const storage = await mega.getStorage();
        console.log('Storage Info:');
        console.log(`Total: ${(storage.total / (1024 * 1024 * 1024)).toFixed(2)} GB`);
        console.log(`Used: ${(storage.used / (1024 * 1024 * 1024)).toFixed(2)} GB`);
        console.log(`Free: ${(storage.free / (1024 * 1024 * 1024)).toFixed(2)} GB`);
        
    } catch (error) {
        console.error('❌ Connection failed!');
        console.error('Error details:', error.message);
    }
}

testMegaConnection(); 