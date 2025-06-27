import type {AlertMessage} from "../components/AlertComponent.tsx";

/**
 * This class helps users send messages to alert components using a broadcast channel named "triggerAlert".
 */
export class MessengerHelper {
    private channel: BroadcastChannel;
    constructor() {
        this.channel = new BroadcastChannel("triggerAlert");
    }

    sendMessage(messageContent: AlertMessage){
        this.channel.postMessage(messageContent);
    }
}