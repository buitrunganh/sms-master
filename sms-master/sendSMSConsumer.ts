import * as amqp from 'amqplib/callback_api';
import { sendSmsNoGrpc } from './controller/sms';

const CONN_URL = process.env.RABBITMQ_ENDPOINT || "amqp://rabbit:t4fvfvwdfasdf@localhost:5672"
const sendSMSQueue = process.env.SEND_SMS_QUEUE || "send-sms-test";

export const startSendingComsumer = () => {
  console.log("Start sending comsumer");
  amqp.connect(CONN_URL, (error0, connection) => {
    if (error0) {
      console.log(error0);
    } else {
      connection.createChannel((error1, channel) => {
      if (error1) {
        console.log(error1);
      }

      channel.assertQueue(sendSMSQueue, { durable: true });
      channel.prefetch(1);

      channel.consume(sendSMSQueue, async (msg) => {
        const payload = JSON.parse(msg.content.toString());
        console.log("Receive message from queue");
        const sendSMSRespone = await sendSmsNoGrpc(payload)
        console.log(sendSMSRespone);
        setTimeout(() => {
          channel.ack(msg);
        }, 3000);
      }, {
        noAck: false,
      });
      process.on("exit", () => {
        channel.close();
        console.log("Closing rabbitmq channel");
      });
     })
    }
  });
};

