// const { Client } = require('whatsapp-web.js')
// const fs = require('fs');
// const ora = require('ora');
// const chalk = require('chalk');


// client.on('ready', () => {
//     console.log('Client is ready!');
// })

// const SESSION_FILE_PATH = './session.json';
// let client;
// let sessionData;


// const withSession = () => {
//     const spinner = ora(`Cargando ${chalk.yellow('Validando session con WhatsApp...')}`);
//     sessionData = require(SESSION_FILE_PATH)
//     spinner.start();
//     client = new Client({
//         session:sessionData
//     });

//     client.on('ready', () => {
//         console.log('Client is ready!!')
//         spinner.stop();
//     })

//     client.on('auth_failure', () => {
//         spinner.stop();
//     })
// }

// const withoutSession = () => {

//     console.log('No tenemos una sesión guardada aún!')
//     console.log('Por favor espera, estamos generando tu código QR')
//     const qrCode = require('qrcode-terminal');
//     client = new Client();

//     client.on('qr', qr => {
//         console.log('QR received: ', qr);
//         qrCode.generate(qr, { small: true })
//     });

//     client.on('authenticated', session => {
//         sessionData = session;
//         console.log('SESSION DATA: ', sessionData)
//         fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(error){
//             if(error) {
//                 console.error(error)
//             }
//         })
//     })

//     client.initialize();

// }

// fs.existsSync(SESSION_FILE_PATH) ? withSession() : withoutSession();



const { Client, MessageMedia, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const http = require('http')
const client = new Client();

const greatingWords = ['hola', 'amigo', 'amiga', 'que más', 'ole', 'me interesa']

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const logo = './logo.jpeg';
const carta = './carta.jpeg'
const cartaInPDF = './caracombosmuneco.pdf'

client.on('message', async (message) => {
    if(message.body == 'hola') {
        client.sendMessage(message.from, await MessageMedia.fromFilePath(logo));
        setTimeout(() => {
            client.sendMessage(message.from, 'Hola, bienvenido(a) a Combos el Muñeco, cuentanos cual es su antojo?');
        }, 2000);
	}
});

client.on('message', async (message) => {
    if(message.body == 'quiero ver la carta') {

        client.sendMessage(message.from, await MessageMedia.fromFilePath(cartaInPDF));
    }
})


client.on('message', async (message) => {
    if(message.body == 'pedir') {
        client.sendMessage(message.from, 'Elige el sabor de tu combo!');
    }
})


client.initialize();
