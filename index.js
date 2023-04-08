import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port: 6969})

let conns = new Map()

wss.on('connection', function connection(ws) {
    let id = generateString(5)
    while(conns.has(id)) {
        id = generateString(5)
    }
    conns.set(id, ws);
    ws.send('Info|message:Your id is ' + id)
    console.log('New connection: ' + id)

    ws.on('message', (data) => {
        let cmd = data.toString().split(':')[0].split('|')
        let params = data.toString().split(':')[1].split(',')
        let unknown = false;
        switch (cmd[0]) {
            case 'Editor':
                switch (cmd[1]) {
                    case 'clicked':
                        conns.forEach((conn) => {
                            conn.send('Editor|clicked:' + params.join(','))
                        })
                        break;
                    default:
                        unknown = true;
                        break;
                }
                if (!unknown) {
                    log(id, cmd[1])
                }
                break;
            case 'Game':

                break;
            case 'Main':
                switch (cmd[1]) {
                    case 'Init':
                        log(id, 'Menu init complete')
                        break;
                    default:
                        unknown = true;
                        break;
                }
                break;
            case 'Error':
                break
            case 'Info':
                log(id, data)
                break;
            default:
                unknown = true;
                break;
        }
        if (unknown) {
            log(id, 'Unknown command')
            ws.send('Error|message:Unknown command')
        }
    })

    wss.on('disconnect', () => {
        conns.delete(id)
    })
})

wss.on('listening', () => {
    console.log('listening on 6969')
})

function log(id, msg) {
    console.log(`[${id}] ${msg}`);
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}