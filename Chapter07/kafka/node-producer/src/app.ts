import kafka from "kafka-node";
import uuid from "uuid";
 
const client = new kafka.Client("http://localhost:2181", "kakfka-client", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});
 
const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
    console.log("Kafka Producer is ready.");
});
 
// For this demo we just log producer errors 
producer.on("error", function(error:any) {
    console.error(error);
});
 
const KafkaService = {
    sendRecord: ({ type, userId, sessionId, data }:any, callback = () => {}) => {
        if (!userId) {
            return callback(new Error(`A userId has to be provided.`));
        }
 
        const event = {
            id: uuid.v4(),
            timestamp: Date.now(),
            userId: userId,
            sessionId: sessionId,
            type: type,
            data: data
        };
 
        const buffer:any = new Buffer.from(JSON.stringify(event));
 
        // Create a new payload
        const record = [
            {
                topic: "offers",
                messages: buffer,
                attributes: 1 
            }
        ];
 
        //Send record to Kafka and log result/error
        producer.send(record, callback);
    }
};
 
export default KafkaService;