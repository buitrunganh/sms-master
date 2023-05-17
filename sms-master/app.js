"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var services = require("./proto/gen/sms_grpc_pb");
var fs = require("fs");
var sms_1 = require("./controller/sms");
var sendSMSConsumer_js_1 = require("./sendSMSConsumer.js");
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
var TLS_ENABLED;
var credentials;
// if ((process.env.TLS_ENABLED || 'true') == 'true'){
//     TLS_ENABLED = true;
//     if(process.env.CA_CRT != ""){
//         let ca_crt = Buffer.from(process.env.CA_CRT,'base64')
//         fs.writeFileSync('/tmp/ca.crt',ca_crt)
//     }
//     if(process.env.TLS_CRT != ""){
//         let tls_crt = Buffer.from(process.env.TLS_CRT,'base64')
//         fs.writeFileSync('/tmp/tls.crt',tls_crt)
//     }
//     if(process.env.TLS_KEY != ""){
//         let tls_key = Buffer.from(process.env.TLS_KEY,'base64')
//         fs.writeFileSync('/tmp/tls.key',tls_key)
//     }
// }else{
//     TLS_ENABLED = false
// }
TLS_ENABLED = false;
console.log("TLS_ENABLED " + TLS_ENABLED);
if (TLS_ENABLED) {
    credentials = grpc.ServerCredentials.createSsl(fs.readFileSync('/tmp/ca.crt'), [{
            cert_chain: fs.readFileSync('/tmp/tls.crt'),
            private_key: fs.readFileSync('/tmp/tls.key')
        }], false);
}
else {
    credentials = grpc.ServerCredentials.createInsecure();
}
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://321a99d4d49d4ea7813ca99cd5843cda@sentry.vdatlab.com/13' });
var server = new grpc.Server();
server.addService(services.SmsService, {
    sendSms: sms_1.SendSms,
    getStatus: sms_1.GetStatus,
    receivedSms: sms_1.ReceivedSms,
    dlrStatusSms: sms_1.DlrStatusSms,
    checkDlrSms: sms_1.CheckDlrSMS
});
server.bind('0.0.0.0:5000', credentials);
try {
    server.start();
    (0, sendSMSConsumer_js_1.startSendingComsumer)();
}
catch (e) {
    console.error(e);
}
