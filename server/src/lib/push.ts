import { Expo, ExpoPushMessage } from "expo-server-sdk";

import pushConstants from "./pushConstants";

const expo = new Expo();

export const handlePushTokens = (pushData: any) => {
    const { type, taskData = null, token, language } = pushData;

    const notifications = [] as ExpoPushMessage[];
    if (!Expo.isExpoPushToken(token)) {
        console.log(`Push token ${token} is not a valid Expo push token`);
        return;
    }

    // @ts-ignore
    const messageData = pushConstants[language][type];
    const body = taskData ? messageData.body(taskData) : messageData.body;

    notifications.push({
        to: token,
        sound: "default",
        title: messageData.title,
        body,
        data: { body },
    });

    const chunks = expo.chunkPushNotifications(notifications);

    (async () => {
        for (let chunk of chunks) {
            try {
                const receipts = await expo.sendPushNotificationsAsync(chunk);
                if (receipts[0].status !== "ok")
                    throw new Error(JSON.stringify(receipts));
            } catch (error) {
                console.log(error);
            }
        }
    })();
};
