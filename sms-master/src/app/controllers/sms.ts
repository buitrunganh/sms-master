import {
    Smsc,
    GetStatusResponse,
    SendSmsRequest, SendSmsResponse,
    ReceivedSmsRespone, ReceivedSmsRequest,
    DlrStatusSmsRequest, DlrStatusSmsRespone, CheckDlrSmsRespone, CheckDlrSmsRequest
} from "../../assets/sms-node_ts/sms_pb";
// } from "../../assets/sms-node_ts/sms_pb";
import * as grpc from 'grpc';
import request from 'request';
import xml2js from 'xml2js';
import { Client, Pool } from 'pg';
import { publishToQueue } from '../QueueService'
/* let client;
connect();
function connect() {
     client = new Client({
        host: process.env.PG_HOST || '192.168.0.103',
        port: process.env.PG_PORT || '5432',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASS || 'postgres',
        database: process.env.PG_DB || 'smsdlr'
    })
    client.on('error', error => {
        // ⋮
        connect();
    });
    return client.connect();
}
*/
interface ResponeModel {
    code: number,
    message: string,
    reply: string,
}
const pool = new Pool({
    host: process.env.PG_HOST || '192.168.0.103',
    // host: 'localhost',
    port: process.env.PG_PORT || '5432',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS || 'postgres',
    database: process.env.PG_DB || 'smsdlr'
});

let kannelSendSms = async (call: any, callback: any) : Promise<ResponeModel> => {
    const requestSMS: SendSmsRequest = call.request;
    console.log(requestSMS);
    const reply = new SendSmsResponse();
    const queryInsertDb = "INSERT INTO sender(smsc, receiverphone,content)VALUES("
        + "'" + requestSMS.getSmsc() + "',"
        + "'" + requestSMS.getTo() + "',"
        + "'" + requestSMS.getText().replace(/'/g,"''") + "')  RETURNING id";
    console.log(queryInsertDb);
    let responeModelInsert = null;
    try {
        responeModelInsert = await insertSMSToDb(queryInsertDb);
        if (!responeModelInsert.code) {
            const options = getOption(requestSMS, responeModelInsert.reply);
            return await sendSMSByKannel(options, responeModelInsert.reply, requestSMS);;
        } else {
            return responeModelInsert;
        }
    }catch (e) {
        responeModelInsert.code = grpc.status.INTERNAL;
        responeModelInsert.message = e.toString();
        return responeModelInsert;
    }
};

export let SendSms = async (call: any, callback: any) => {
    if ((process.env.AUTHENTICATION_ENABLED || 'false') == 'false') {
        const reply = new SendSmsResponse();
        console.log('UnAUthentication flow Send SmS');
        const finalResult = await kannelSendSms(call, callback);
        console.log(finalResult);
        reply.setMsgid(finalResult.reply + "");
        console.log(reply);
        if(finalResult.code == grpc.status.OK){
            return callback(null, reply);
        }else{
            return callback( {
                code: finalResult.code,
                message: finalResult.message,
            }, reply);
        }

    } else {
        let bearerToken = call.metadata.get("authorization")[0];
        console.log(bearerToken);
        if (bearerToken === undefined) {
            return callback({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Invalid Token'
            }, null);
        }
        // remove Bearer -> 7 ký tự
        let token = bearerToken.slice(7, bearerToken.length)
        console.log(bearerToken);
        console.log(token);
        const optionPermission = {
            method: 'POST',
            url: `${process.env.HYDRA_ADMIN_URL || 'http://localhost:4445'}/oauth2/introspect`,
            form: {
                token: token
            }
        }
        request(optionPermission, (error, response, body) => {
            // console.log(arguments);
            if (error) {
                // This will handle any errors that aren't network related (network related errors are handled automatically)
                return callback(error);
            } else {
                const tokenInfo = JSON.parse(body);
                console.log("active " + tokenInfo.active)
                if (tokenInfo.active !== true) {
                    //  console.log("aaaa");
                    return callback({
                        code: grpc.status.UNAUTHENTICATED,
                        message: 'Invalid Token'
                    }, null);
                } else {
                    kannelSendSms(call, callback);
                }
            }
        })
    }
};
export let GetStatus = (call: any, callback: any) => {
    const reply = new GetStatusResponse();
    const parse = new xml2js.Parser();
    let smscs: Smsc[] = [];
    /*
    request('http://192.168.0.103:13000/status.xml', (error, response, body) => {
        parse.parseString(body, (err, result) => {
            console.log("result");
          //  console.log(result);
            let status = result.gateway.smscs[0].smsc;
            for (let i = 0; i < status.length; i++) {
                let smsc = new Smsc();
                smsc.setName(status[i].name[0]);
                smsc.setAdminId(status[i]['admin-id'][0]);
                smsc.setId(status[i].id[0]);
                smsc.setStatus(status[i].status[0]);
                smsc.setFailed(status[i].failed[0]);
                smsc.setQueued(status[i].queued[0]);
                let sms = new Smsc.Sms();
                sms.setReceived(parseInt(status[i].sms[0].received[0]));
                sms.setSent(parseInt(status[i].sms[0].sent[0]));
                sms.setInbound(status[i].sms[0].inbound[0]);
                sms.setOutbound(status[i].sms[0].outbound[0]);
                smsc.setSms(sms);
                let dlr = new Smsc.Dlr();
                dlr.setReceived(parseInt(status[i].dlr[0].received[0]));
                dlr.setSent(parseInt(status[i].dlr[0].sent[0]));
                dlr.setInbound(status[i].dlr[0].inbound[0]);
                dlr.setOutbound(status[i].dlr[0].outbound[0]);
                smsc.setDlr(dlr);
                smscs.push(smsc)
            }
            reply.setSmscsList(smscs);
            reply.setStatus(result.gateway.status[0]);
            return callback(null,reply);
        })
    })*/
};
/**
 * url: apis.vdatlab.com/sms/v1/receiveSms
 * @param call
 * @param callback
 * @constructor
 */
export let ReceivedSms = (call: any, callback: any) => {
    const reply = new ReceivedSmsRespone();
    const requestSMS: ReceivedSmsRequest = call.request;
    let sender = fixPhoneNumber(requestSMS.getForm());
    console.log(sender);
    const options = {
        //   url: `${process.env.HYDRA_ADMIN_URL || 'https://apis.vdatlab.com} /dcs/v1/records'`,
        url: `${process.env.COLLECTOR_URL || 'https://apis.vdatlab.com'}/dcs/v1/records`,
        method: 'POST',
        json: true,
        body: {
            number: requestSMS.getTo(), // sim nhận
            sender: sender, // người gửi
            text: requestSMS.getText(),
        }
    };
    // fix tạm nhận tin nhắn
    console.log('Request sender: ' + requestSMS.getForm());
    console.log('Request receive: ' + requestSMS.getTo());
    console.log('Request text: ' + requestSMS.getText());
    const queryInsertDb = "INSERT INTO receiver(content, sender, receiver)VALUES("
        + "'" + requestSMS.getText() + "',"
        + "'" + sender + "',"
        + "'" + requestSMS.getTo() + "')  RETURNING id,createdat";
    console.log(queryInsertDb);
    pool.query(queryInsertDb, async (err, result) => {
        if (err) {
            return callback({
                code: grpc.status.INTERNAL,
                message: err.toString()
            }, null)
        }
        const { createdat } = result.rows[0];
        console.log('Insert receiver successful' + result.rows[0]);
        const data = {
            type: "receive",
            content: requestSMS.getText(),
            receiveTime: createdat,
            senderPhone: requestSMS.getForm(),
            reference: "",
            status: "",
            sendingTime: "",
        }
       // await publishToQueue(data);
    })

    request(options, (error, body) => {
        if (error) {
            console.log("Post record error:" + error.toString());
            return;
        }
        console.log("post record success " + sender + " -- " + requestSMS.getTo() + " -- " + requestSMS.getText());
    });
    return callback(null, reply);
}
export let DlrStatusSms = (call: any, callback: any) => {
    const reply = new DlrStatusSmsRespone();
    const requestSMS: DlrStatusSmsRequest = call.request;
    console.log(requestSMS)
    console.log('messageID');
    console.log(requestSMS.getMessageid());
    console.log('getType');
    console.log(requestSMS.getType());
    console.log('getMsg');
    console.log(requestSMS.getMsg());
    let status = '';
    let smsCapStatus = "error";
    switch (requestSMS.getType()) {
        case '1':
            status = 'delivery success';
            smsCapStatus = "success"
            break;
        case '2':
            status = 'delivery falied';
            break;
        case '4':
            status = 'message buffered';
            break;
        case '8':
            status = 'smsc submit';
            smsCapStatus = "success"
            break;
        case '16':
            status = 'smsc reject';
            break;
    }
    const queryUpdateDb = "UPDATE sender set status = '" + status + "', dlr_type = " + requestSMS.getType()
        + " where id = " + requestSMS.getMsg()
        + " RETURNING reference, content, createdat";

    console.log(queryUpdateDb);
    pool.query(queryUpdateDb, async (err, result) => {
        if (err) return callback({
            code: grpc.status.INTERNAL,
            message: err.toString()
        }, null)
        const { reference, content, createdat} = result.rows[0];
        console.log("Update returing data: ",result.rows[0]);
        if(reference != null){
            // push to queue
            const data = {
                type: "send",
                reference: reference,
                content: content,
                status: smsCapStatus,
                sendingTime: createdat,
                receiveTime: "",
                senderPhone: "",
                errorDetail: status
            }
            await publishToQueue(data);
        }
        return callback(null, reply);
    })
}
export let CheckDlrSMS = (call: any, callback: any) => {
    const reply = new CheckDlrSmsRespone();
    const chkDlrRequest: CheckDlrSmsRequest = call.request;
    const chkStatusQuery = "SELECT dlr_type FROM sender WHERE id = " + chkDlrRequest.getMsgid();
    pool.query(chkStatusQuery, (err, result) => {
        if (err) return callback({
            code: grpc.status.INTERNAL,
            message: err.toString()
        }, null)
        console.log(result.rows[0]);
        reply.setStatus(result.rows[0].dlr_type + "");
        return callback(null, reply);
    })
}

function fixPhoneNumber(number) {
    const prefix = number.slice(0, 3);
    console.log(number +"-------"+ prefix);
    if (prefix === '+84') {
        number = number.slice(3, number.length);
        return '0' + number;
    }
    return number;
}
function insertSMSToDb(queryInsertDb) : Promise<ResponeModel>{
    return new Promise((resolve, reject) => {
        const responeModel: ResponeModel = {
            code: null,
            message: null,
            reply: null
        };
        pool.query(queryInsertDb).then( data => {
            const senderID =  data.rows[0].id;
            console.log('Insert SMS ID ' + senderID + ' successful')
            responeModel.reply = senderID;
            resolve(responeModel);
        }).catch( err => {
            // client.connect();
            console.log("Insert DB Error: ");
            console.log(err);
            reject(err);
        })
    })
}

/**
 *
 * @param options
 * @param reply
 * @param senderID
 * @param requestSMS
 */
function sendSMSByKannel(options, senderID, requestSMS): Promise<ResponeModel> {
    return new Promise(resolve => {
        request(options, (error, body) => {
            const responeModel: ResponeModel = {
                code: null,
                message: null,
                reply: null
            }
            if (error){
                console.log("Connect error host:13013")
                responeModel.code = grpc.status.INTERNAL;
                responeModel.message = error.toString();
                return resolve(responeModel);
            }
            console.log('Request text: ' + requestSMS.getText());
            console.log('Request phone: ' + requestSMS.getTo());
            console.log('Message ID ' + senderID);
            responeModel.reply = senderID;
            responeModel.code = grpc.status.OK;
            responeModel.message = "Send SMS Successful"
            resolve(responeModel);
        });
    })
}

function getOption(requestSMS, senderID) {
    const options = {
        url: (process.env.KANNEL_URL || 'http://192.168.0.103:13013') + '/kannel/v1/sms',
        // url: (process.env.KANNEL_URL || 'http://localhost:13013') + '/kannel/v1/sms',
        //  url: 'http://192.168.0.103:13000/status.xml',
        method: 'get',
        qs: {
            form: process.env.KANNEL_FORM || 'never',
            username: process.env.KANNEL_USERNAME || 'tester',
            password: process.env.KANNEL_PASSWORD || 'foobar',
            to: requestSMS.getTo(),
            smsc: requestSMS.getSmsc(),
            text: requestSMS.getText(),
            charset: requestSMS.getCharset(),
            coding: requestSMS.getCoding(),
            dlrmask: process.env.KANNEL_DLRMASK || '31',
            dlrurl: (process.env.KANNEL_DLRURL || 'https://apis.vdatlab.com/sms/v1/dlr') + `?messageID=%F&&type=%d&&msg=${senderID}`
            //   dlrurl: (process.env.KANNEL_DLRURL || 'http://192.168.0.20:8080/sms/v1/dlr') + `?messageID=%F&&type=%d&&msg=${senderID}`
        },
        json: true
    };
    if (requestSMS.getTmpflag() !== "") options.url = (process.env.KANNEL_URL_TMP || 'http://192.168.0.198:13013') + '/kannel/v1/sms';
    console.log(options);
    return options;
}

export const sendSmsNoGrpc = async (payload: any) : Promise<ResponeModel> => {
    console.log("Send SMS from RabbitMQ");
    console.log(payload);
    const { smsc, to, text, charset, coding, reference } = payload;
    
    let requestSMS = new SendSmsRequest();
    requestSMS.setCharset(charset)
    requestSMS.setCoding(coding)
    requestSMS.setTo(to)
    requestSMS.setText(text)
    requestSMS.setSmsc(smsc)
    const queryInsertDb = "INSERT INTO sender(smsc, receiverphone,content,reference)VALUES("
        + "'" + requestSMS.getSmsc() + "',"
        + "'" + requestSMS.getTo() + "',"
        + "'" + requestSMS.getText().replace(/'/g,"''") + "',"
        + "'" + reference+ "')  RETURNING id";
    console.log(queryInsertDb);
    let responeModelInsert = null;
    try {
        responeModelInsert = await insertSMSToDb(queryInsertDb);
        if (!responeModelInsert.code) {
            const options = getOption(requestSMS, responeModelInsert.reply);
            const result = await sendSMSByKannel(options, responeModelInsert.reply, requestSMS);
            if(result.code == grpc.status.OK){
                const data = {
                    type: "send",
                    status: "sending",
                    reference: reference,
                    content: requestSMS.getText(),
                    sendingTime: "",
                    receiveTime: "",
                    senderPhone: ""
                }
                await publishToQueue(data);
            }
            return result;
        } else {
            return responeModelInsert;
        }
    }catch (e) {
        const data = {
            type: "send",
            status: "error",
            reference: reference,
            content: requestSMS.getText(),
            errorDetail: e.toString()
        }
        await publishToQueue(data);
    }
};
