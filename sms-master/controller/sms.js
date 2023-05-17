"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSmsNoGrpc = exports.CheckDlrSMS = exports.DlrStatusSms = exports.ReceivedSms = exports.GetStatus = exports.SendSms = void 0;
var sms_pb_1 = require("./../proto/gen/sms_pb");
// } from "../../assets/sms-node_ts/sms_pb";
var grpc = require("grpc");
var request = require("request");
var xml2js_1 = require("xml2js");
var pg_1 = require("pg");
var QueueService_1 = require("../QueueService");
var pool = new pg_1.Pool({
    host: process.env.PG_HOST || '192.168.0.103',
    // host: 'localhost',
    port: process.env.PG_PORT || '5432',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS || 'postgres',
    database: process.env.PG_DB || 'smsdlr'
});
var kannelSendSms = function (call, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var requestSMS, reply, queryInsertDb, responeModelInsert, options, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestSMS = call.request;
                console.log(requestSMS);
                reply = new sms_pb_1.SendSmsResponse();
                queryInsertDb = "INSERT INTO sender(smsc, receiverphone,content)VALUES("
                    + "'" + requestSMS.getSmsc() + "',"
                    + "'" + requestSMS.getTo() + "',"
                    + "'" + requestSMS.getText().replace(/'/g, "''") + "')  RETURNING id";
                console.log(queryInsertDb);
                responeModelInsert = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, insertSMSToDb(queryInsertDb)];
            case 2:
                responeModelInsert = _a.sent();
                if (!!responeModelInsert.code) return [3 /*break*/, 4];
                options = getOption(requestSMS, responeModelInsert.reply);
                return [4 /*yield*/, sendSMSByKannel(options, responeModelInsert.reply, requestSMS)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [2 /*return*/, responeModelInsert];
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                responeModelInsert.code = grpc.status.INTERNAL;
                responeModelInsert.message = e_1.toString();
                return [2 /*return*/, responeModelInsert];
            case 7: return [2 /*return*/];
        }
    });
}); };
var SendSms = function (call, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var reply, finalResult, bearerToken, token, optionPermission;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((process.env.AUTHENTICATION_ENABLED || 'false') == 'false')) return [3 /*break*/, 2];
                reply = new sms_pb_1.SendSmsResponse();
                console.log('UnAUthentication flow Send SmS');
                return [4 /*yield*/, kannelSendSms(call, callback)];
            case 1:
                finalResult = _a.sent();
                console.log(finalResult);
                reply.setMsgid(finalResult.reply + "");
                console.log(reply);
                if (finalResult.code == grpc.status.OK) {
                    return [2 /*return*/, callback(null, reply)];
                }
                else {
                    return [2 /*return*/, callback({
                            code: finalResult.code,
                            message: finalResult.message,
                        }, reply)];
                }
                return [3 /*break*/, 3];
            case 2:
                bearerToken = call.metadata.get("authorization")[0];
                console.log(bearerToken);
                if (bearerToken === undefined) {
                    return [2 /*return*/, callback({
                            code: grpc.status.UNAUTHENTICATED,
                            message: 'Invalid Token'
                        }, null)];
                }
                token = bearerToken.slice(7, bearerToken.length);
                console.log(bearerToken);
                console.log(token);
                optionPermission = {
                    method: 'POST',
                    url: "".concat(process.env.HYDRA_ADMIN_URL || 'http://localhost:4445', "/oauth2/introspect"),
                    form: {
                        token: token
                    }
                };
                request(optionPermission, function (error, response, body) {
                    // console.log(arguments);
                    if (error) {
                        // This will handle any errors that aren't network related (network related errors are handled automatically)
                        return callback(error);
                    }
                    else {
                        var tokenInfo = JSON.parse(body);
                        console.log("active " + tokenInfo.active);
                        if (tokenInfo.active !== true) {
                            //  console.log("aaaa");
                            return callback({
                                code: grpc.status.UNAUTHENTICATED,
                                message: 'Invalid Token'
                            }, null);
                        }
                        else {
                            kannelSendSms(call, callback);
                        }
                    }
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.SendSms = SendSms;
var GetStatus = function (call, callback) {
    var reply = new sms_pb_1.GetStatusResponse();
    var parse = new xml2js_1.default.Parser();
    var smscs = [];
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
exports.GetStatus = GetStatus;
/**
 * url: apis.vdatlab.com/sms/v1/receiveSms
 * @param call
 * @param callback
 * @constructor
 */
var ReceivedSms = function (call, callback) {
    var reply = new sms_pb_1.ReceivedSmsRespone();
    var requestSMS = call.request;
    var sender = fixPhoneNumber(requestSMS.getForm());
    console.log(sender);
    var options = {
        //   url: `${process.env.HYDRA_ADMIN_URL || 'https://apis.vdatlab.com} /dcs/v1/records'`,
        url: "".concat(process.env.COLLECTOR_URL || 'https://apis.vdatlab.com', "/dcs/v1/records"),
        method: 'POST',
        json: true,
        body: {
            number: requestSMS.getTo(),
            sender: sender,
            text: requestSMS.getText(),
        }
    };
    // fix tạm nhận tin nhắn
    console.log('Request sender: ' + requestSMS.getForm());
    console.log('Request receive: ' + requestSMS.getTo());
    console.log('Request text: ' + requestSMS.getText());
    var queryInsertDb = "INSERT INTO receiver(content, sender, receiver)VALUES("
        + "'" + requestSMS.getText() + "',"
        + "'" + sender + "',"
        + "'" + requestSMS.getTo() + "')  RETURNING id,createdat";
    console.log(queryInsertDb);
    pool.query(queryInsertDb, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
        var createdat, data;
        return __generator(this, function (_a) {
            if (err) {
                return [2 /*return*/, callback({
                        code: grpc.status.INTERNAL,
                        message: err.toString()
                    }, null)];
            }
            createdat = result.rows[0].createdat;
            console.log('Insert receiver successful' + result.rows[0]);
            data = {
                type: "receive",
                content: requestSMS.getText(),
                receiveTime: createdat,
                senderPhone: requestSMS.getForm(),
                reference: "",
                status: "",
                sendingTime: "",
            };
            return [2 /*return*/];
        });
    }); });
    request(options, function (error, body) {
        if (error) {
            console.log("Post record error:" + error.toString());
            return;
        }
        console.log("post record success " + sender + " -- " + requestSMS.getTo() + " -- " + requestSMS.getText());
    });
    return callback(null, reply);
};
exports.ReceivedSms = ReceivedSms;
var DlrStatusSms = function (call, callback) {
    var reply = new sms_pb_1.DlrStatusSmsRespone();
    var requestSMS = call.request;
    console.log(requestSMS);
    console.log('messageID');
    console.log(requestSMS.getMessageid());
    console.log('getType');
    console.log(requestSMS.getType());
    console.log('getMsg');
    console.log(requestSMS.getMsg());
    var status = '';
    var smsCapStatus = "error";
    switch (requestSMS.getType()) {
        case '1':
            status = 'delivery success';
            smsCapStatus = "success";
            break;
        case '2':
            status = 'delivery falied';
            break;
        case '4':
            status = 'message buffered';
            break;
        case '8':
            status = 'smsc submit';
            smsCapStatus = "success";
            break;
        case '16':
            status = 'smsc reject';
            break;
    }
    var queryUpdateDb = "UPDATE sender set status = '" + status + "', dlr_type = " + requestSMS.getType()
        + " where id = " + requestSMS.getMsg()
        + " RETURNING reference, content, createdat";
    console.log(queryUpdateDb);
    pool.query(queryUpdateDb, function (err, result) { return __awaiter(void 0, void 0, void 0, function () {
        var reference, content, createdat, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (err)
                        return [2 /*return*/, callback({
                                code: grpc.status.INTERNAL,
                                message: err.toString()
                            }, null)];
                    reference = (_a = result.rows[0], _a.reference), content = _a.content, createdat = _a.createdat;
                    console.log("Update returing data: ", result.rows[0]);
                    if (!(reference != null)) return [3 /*break*/, 2];
                    data = {
                        type: "send",
                        reference: reference,
                        content: content,
                        status: smsCapStatus,
                        sendingTime: createdat,
                        receiveTime: "",
                        senderPhone: "",
                        errorDetail: status
                    };
                    return [4 /*yield*/, (0, QueueService_1.publishToQueue)(data)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/, callback(null, reply)];
            }
        });
    }); });
};
exports.DlrStatusSms = DlrStatusSms;
var CheckDlrSMS = function (call, callback) {
    var reply = new sms_pb_1.CheckDlrSmsRespone();
    var chkDlrRequest = call.request;
    var chkStatusQuery = "SELECT dlr_type FROM sender WHERE id = " + chkDlrRequest.getMsgid();
    pool.query(chkStatusQuery, function (err, result) {
        if (err)
            return callback({
                code: grpc.status.INTERNAL,
                message: err.toString()
            }, null);
        console.log(result.rows[0]);
        reply.setStatus(result.rows[0].dlr_type + "");
        return callback(null, reply);
    });
};
exports.CheckDlrSMS = CheckDlrSMS;
function fixPhoneNumber(number) {
    var prefix = number.slice(0, 3);
    console.log(number + "-------" + prefix);
    if (prefix === '+84') {
        number = number.slice(3, number.length);
        return '0' + number;
    }
    return number;
}
function insertSMSToDb(queryInsertDb) {
    return new Promise(function (resolve, reject) {
        var responeModel = {
            code: null,
            message: null,
            reply: null
        };
        pool.query(queryInsertDb).then(function (data) {
            var senderID = data.rows[0].id;
            console.log('Insert SMS ID ' + senderID + ' successful');
            responeModel.reply = senderID;
            resolve(responeModel);
        }).catch(function (err) {
            // client.connect();
            console.log("Insert DB Error: ");
            console.log(err);
            reject(err);
        });
    });
}
/**
 *
 * @param options
 * @param reply
 * @param senderID
 * @param requestSMS
 */
function sendSMSByKannel(options, senderID, requestSMS) {
    return new Promise(function (resolve) {
        request(options, function (error, body) {
            var responeModel = {
                code: null,
                message: null,
                reply: null
            };
            if (error) {
                console.log("Connect error host:13013");
                responeModel.code = grpc.status.INTERNAL;
                responeModel.message = error.toString();
                return resolve(responeModel);
            }
            console.log('Request text: ' + requestSMS.getText());
            console.log('Request phone: ' + requestSMS.getTo());
            console.log('Message ID ' + senderID);
            responeModel.reply = senderID;
            responeModel.code = grpc.status.OK;
            responeModel.message = "Send SMS Successful";
            resolve(responeModel);
        });
    });
}
function getOption(requestSMS, senderID) {
    var options = {
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
            dlrurl: (process.env.KANNEL_DLRURL || 'https://apis.vdatlab.com/sms/v1/dlr') + "?messageID=%F&&type=%d&&msg=".concat(senderID)
            //   dlrurl: (process.env.KANNEL_DLRURL || 'http://192.168.0.20:8080/sms/v1/dlr') + `?messageID=%F&&type=%d&&msg=${senderID}`
        },
        json: true
    };
    if (requestSMS.getTmpflag() !== "")
        options.url = (process.env.KANNEL_URL_TMP || 'http://192.168.0.198:13013') + '/kannel/v1/sms';
    console.log(options);
    return options;
}
var sendSmsNoGrpc = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var smsc, to, text, charset, coding, reference, requestSMS, queryInsertDb, responeModelInsert, options, result, data, e_2, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Send SMS from RabbitMQ");
                console.log(payload);
                smsc = payload.smsc, to = payload.to, text = payload.text, charset = payload.charset, coding = payload.coding, reference = payload.reference;
                requestSMS = new sms_pb_1.SendSmsRequest();
                requestSMS.setCharset(charset);
                requestSMS.setCoding(coding);
                requestSMS.setTo(to);
                requestSMS.setText(text);
                requestSMS.setSmsc(smsc);
                queryInsertDb = "INSERT INTO sender(smsc, receiverphone,content,reference)VALUES("
                    + "'" + requestSMS.getSmsc() + "',"
                    + "'" + requestSMS.getTo() + "',"
                    + "'" + requestSMS.getText().replace(/'/g, "''") + "',"
                    + "'" + reference + "')  RETURNING id";
                console.log(queryInsertDb);
                responeModelInsert = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 10]);
                return [4 /*yield*/, insertSMSToDb(queryInsertDb)];
            case 2:
                responeModelInsert = _a.sent();
                if (!!responeModelInsert.code) return [3 /*break*/, 6];
                options = getOption(requestSMS, responeModelInsert.reply);
                return [4 /*yield*/, sendSMSByKannel(options, responeModelInsert.reply, requestSMS)];
            case 3:
                result = _a.sent();
                if (!(result.code == grpc.status.OK)) return [3 /*break*/, 5];
                data = {
                    type: "send",
                    status: "sending",
                    reference: reference,
                    content: requestSMS.getText(),
                    sendingTime: "",
                    receiveTime: "",
                    senderPhone: ""
                };
                return [4 /*yield*/, (0, QueueService_1.publishToQueue)(data)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, result];
            case 6: return [2 /*return*/, responeModelInsert];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2 = _a.sent();
                data = {
                    type: "send",
                    status: "error",
                    reference: reference,
                    content: requestSMS.getText(),
                    errorDetail: e_2.toString()
                };
                return [4 /*yield*/, (0, QueueService_1.publishToQueue)(data)];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.sendSmsNoGrpc = sendSmsNoGrpc;
