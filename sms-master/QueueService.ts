import * as amqp from 'amqplib/callback_api';

const CONN_URL = process.env.RABBITMQ_ENDPOINT || "amqp://rabbit:t4fvfvwdfasdf@localhost:5672"
const dlrSMSQueue = process.env.DLR_SMS_QUEUE || "dlr-sms";

let ch = null;
amqp.connect(CONN_URL, (err, conn) => {
  if(err) {
    console.log(err)
  }else {
    conn.createChannel((err1, channel) => {
        ch = channel;
    });
  }
});

export const publishToQueue = async (data) => {
  console.log("Push DLR Queue", data, dlrSMSQueue );
  ch.sendToQueue(dlrSMSQueue, Buffer.from(JSON.stringify(data)), { persistent: true });
};

process.on("exit", () => {
  ch.close();
  console.log("Closing rabbitmq channel");
});

