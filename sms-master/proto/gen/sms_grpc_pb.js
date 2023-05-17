// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var sms_pb = require('./sms_pb.js');

function serialize_grpc_sms_v1_CheckDlrSmsRequest(arg) {
  if (!(arg instanceof sms_pb.CheckDlrSmsRequest)) {
    throw new Error('Expected argument of type grpc.sms.v1.CheckDlrSmsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_CheckDlrSmsRequest(buffer_arg) {
  return sms_pb.CheckDlrSmsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_CheckDlrSmsRespone(arg) {
  if (!(arg instanceof sms_pb.CheckDlrSmsRespone)) {
    throw new Error('Expected argument of type grpc.sms.v1.CheckDlrSmsRespone');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_CheckDlrSmsRespone(buffer_arg) {
  return sms_pb.CheckDlrSmsRespone.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_DlrStatusSmsRequest(arg) {
  if (!(arg instanceof sms_pb.DlrStatusSmsRequest)) {
    throw new Error('Expected argument of type grpc.sms.v1.DlrStatusSmsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_DlrStatusSmsRequest(buffer_arg) {
  return sms_pb.DlrStatusSmsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_DlrStatusSmsRespone(arg) {
  if (!(arg instanceof sms_pb.DlrStatusSmsRespone)) {
    throw new Error('Expected argument of type grpc.sms.v1.DlrStatusSmsRespone');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_DlrStatusSmsRespone(buffer_arg) {
  return sms_pb.DlrStatusSmsRespone.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_GetStatusRequest(arg) {
  if (!(arg instanceof sms_pb.GetStatusRequest)) {
    throw new Error('Expected argument of type grpc.sms.v1.GetStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_GetStatusRequest(buffer_arg) {
  return sms_pb.GetStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_GetStatusResponse(arg) {
  if (!(arg instanceof sms_pb.GetStatusResponse)) {
    throw new Error('Expected argument of type grpc.sms.v1.GetStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_GetStatusResponse(buffer_arg) {
  return sms_pb.GetStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_ReceivedSmsRequest(arg) {
  if (!(arg instanceof sms_pb.ReceivedSmsRequest)) {
    throw new Error('Expected argument of type grpc.sms.v1.ReceivedSmsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_ReceivedSmsRequest(buffer_arg) {
  return sms_pb.ReceivedSmsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_ReceivedSmsRespone(arg) {
  if (!(arg instanceof sms_pb.ReceivedSmsRespone)) {
    throw new Error('Expected argument of type grpc.sms.v1.ReceivedSmsRespone');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_ReceivedSmsRespone(buffer_arg) {
  return sms_pb.ReceivedSmsRespone.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_SendSmsRequest(arg) {
  if (!(arg instanceof sms_pb.SendSmsRequest)) {
    throw new Error('Expected argument of type grpc.sms.v1.SendSmsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_SendSmsRequest(buffer_arg) {
  return sms_pb.SendSmsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_sms_v1_SendSmsResponse(arg) {
  if (!(arg instanceof sms_pb.SendSmsResponse)) {
    throw new Error('Expected argument of type grpc.sms.v1.SendSmsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_sms_v1_SendSmsResponse(buffer_arg) {
  return sms_pb.SendSmsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service
var SmsService = exports.SmsService = {
  getStatus: {
    path: '/grpc.sms.v1.Sms/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: sms_pb.GetStatusRequest,
    responseType: sms_pb.GetStatusResponse,
    requestSerialize: serialize_grpc_sms_v1_GetStatusRequest,
    requestDeserialize: deserialize_grpc_sms_v1_GetStatusRequest,
    responseSerialize: serialize_grpc_sms_v1_GetStatusResponse,
    responseDeserialize: deserialize_grpc_sms_v1_GetStatusResponse,
  },
  sendSms: {
    path: '/grpc.sms.v1.Sms/SendSms',
    requestStream: false,
    responseStream: false,
    requestType: sms_pb.SendSmsRequest,
    responseType: sms_pb.SendSmsResponse,
    requestSerialize: serialize_grpc_sms_v1_SendSmsRequest,
    requestDeserialize: deserialize_grpc_sms_v1_SendSmsRequest,
    responseSerialize: serialize_grpc_sms_v1_SendSmsResponse,
    responseDeserialize: deserialize_grpc_sms_v1_SendSmsResponse,
  },
  receivedSms: {
    path: '/grpc.sms.v1.Sms/ReceivedSms',
    requestStream: false,
    responseStream: false,
    requestType: sms_pb.ReceivedSmsRequest,
    responseType: sms_pb.ReceivedSmsRespone,
    requestSerialize: serialize_grpc_sms_v1_ReceivedSmsRequest,
    requestDeserialize: deserialize_grpc_sms_v1_ReceivedSmsRequest,
    responseSerialize: serialize_grpc_sms_v1_ReceivedSmsRespone,
    responseDeserialize: deserialize_grpc_sms_v1_ReceivedSmsRespone,
  },
  dlrStatusSms: {
    path: '/grpc.sms.v1.Sms/DlrStatusSms',
    requestStream: false,
    responseStream: false,
    requestType: sms_pb.DlrStatusSmsRequest,
    responseType: sms_pb.DlrStatusSmsRespone,
    requestSerialize: serialize_grpc_sms_v1_DlrStatusSmsRequest,
    requestDeserialize: deserialize_grpc_sms_v1_DlrStatusSmsRequest,
    responseSerialize: serialize_grpc_sms_v1_DlrStatusSmsRespone,
    responseDeserialize: deserialize_grpc_sms_v1_DlrStatusSmsRespone,
  },
  checkDlrSms: {
    path: '/grpc.sms.v1.Sms/CheckDlrSms',
    requestStream: false,
    responseStream: false,
    requestType: sms_pb.CheckDlrSmsRequest,
    responseType: sms_pb.CheckDlrSmsRespone,
    requestSerialize: serialize_grpc_sms_v1_CheckDlrSmsRequest,
    requestDeserialize: deserialize_grpc_sms_v1_CheckDlrSmsRequest,
    responseSerialize: serialize_grpc_sms_v1_CheckDlrSmsRespone,
    responseDeserialize: deserialize_grpc_sms_v1_CheckDlrSmsRespone,
  },
};

exports.SmsClient = grpc.makeGenericClientConstructor(SmsService);